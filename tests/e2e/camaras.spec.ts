import { readFileSync } from 'node:fs'
import { test, expect, type Page, type Route } from '@playwright/test'

const MANIFEST = readFileSync(new URL('./fixtures/live.m3u8', import.meta.url), 'utf8')
const MISTSERVER = 'mistserver.telpin.com.ar'
const MANIFEST_COL1 = '/cet-col1/index.m3u8'
const MANIFEST_COL2 = '/cet-col3/index.m3u8'

interface RequestRegistrada {
  url: string
  t: number
}

interface OpcionesMock {
  /** Si es true, el manifest de la Cámara 2 (cet-col3) responde 404. */
  fallaCamara2?: boolean
}

const CORS = { 'Access-Control-Allow-Origin': '*' }

/** Requests de segmentos retenidas; se liberan al terminar cada test. */
const segmentosPendientes: Array<() => void> = []

const sembrarSesion = async (page: Page) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      'authStore',
      JSON.stringify({
        user: null,
        loading: false,
        token: 'e2e-token',
        tokenExpiration: Date.now() + 3600e3,
        isAuthenticated: true,
      }),
    )
    localStorage.setItem(
      'perfil',
      JSON.stringify({
        perfiles: [
          {
            id: '1',
            numeroCliente: '1',
            persona: 'Prueba, Socio (DNI 12345678)',
            apellido: 'Prueba',
            nombre: 'Socio',
            dni: '12345678',
            mail: 'e2e@example.com',
            name: 'Socio',
            datafirebase: [],
            url: '',
          },
        ],
        perfilIndex: 0,
        cuentasCobros: [],
        movimientosCuentasCobro: [],
        socio: null,
        cuentaSeleccionada: null,
        admin: false,
        loading: false,
        isAuthenticated: true,
        user: null,
      }),
    )
  })
}

/**
 * Intercepta toda la red externa: mistserver (streams simulados), miclub (JSON vacío)
 * y cualquier otro host (Firebase, fuentes, etc.) se aborta. Devuelve el registro
 * de requests a mistserver.
 */
const instalarMocks = async (page: Page, opciones: OpcionesMock = {}) => {
  const requests: RequestRegistrada[] = []

  await page.route(
    (url) => url.hostname !== 'localhost' && url.hostname !== '127.0.0.1',
    async (route: Route) => {
      const url = new URL(route.request().url())

      if (url.hostname === MISTSERVER) {
        requests.push({ url: url.href, t: Date.now() })
        if (url.pathname.endsWith('.m3u8')) {
          if (opciones.fallaCamara2 && url.pathname === MANIFEST_COL2) {
            await route.fulfill({ status: 404, headers: CORS, body: 'not found' })
            return
          }
          await route.fulfill({
            status: 200,
            contentType: 'application/vnd.apple.mpegurl',
            headers: CORS,
            body: MANIFEST,
          })
          return
        }
        // Segmentos: se dejan pendientes para que la cámara sana nunca falle durante el test
        await new Promise<void>((resolve) => segmentosPendientes.push(resolve))
        await route.abort().catch(() => {})
        return
      }

      if (url.hostname === 'miclub.cetpinamar.com.ar') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          headers: CORS,
          body: JSON.stringify({ status: 'OK', result: [] }),
        })
        return
      }

      await route.abort()
    },
  )

  return requests
}

const abrirCamaras = async (
  page: Page,
  viewport: { width: number; height: number },
  opciones: OpcionesMock = {},
) => {
  await page.setViewportSize(viewport)
  await sembrarSesion(page)
  const requests = await instalarMocks(page, opciones)
  await page.goto('/#/homePerfil')
  await page.getByRole('tab', { name: /Cámaras/ }).click()
  await expect(page.locator('[data-testid=camaras-grid]')).toBeVisible()
  return requests
}

const fuenteDeVideo = (page: Page, id: string) =>
  page
    .locator(`[data-testid=camara-video-${id}]`)
    .evaluate((el) => {
      const video = el as HTMLVideoElement
      return video.currentSrc || video.getAttribute('src') || ''
    })

const contarManifest = (requests: RequestRegistrada[], path: string, desde = 0) =>
  requests.filter((r) => r.t >= desde && new URL(r.url).pathname === path).length

test.afterEach(async ({ page }) => {
  await page.unrouteAll({ behavior: 'ignoreErrors' })
  segmentosPendientes.splice(0).forEach((liberar) => liberar())
})

test('CA1 desktop lado a lado', async ({ page }) => {
  const requests = await abrirCamaras(page, { width: 1280, height: 800 })

  const card1 = page.locator('[data-testid=camara-card-col1]')
  const card2 = page.locator('[data-testid=camara-card-col2]')
  await expect(card1).toBeVisible()
  await expect(card2).toBeVisible()

  const box1 = await card1.boundingBox()
  const box2 = await card2.boundingBox()
  expect(box1).not.toBeNull()
  expect(box2).not.toBeNull()
  expect(Math.abs(box1!.y - box2!.y)).toBeLessThan(5)
  expect(Math.abs(box1!.x - box2!.x)).toBeGreaterThan(5)

  await expect.poll(() => fuenteDeVideo(page, 'col1')).not.toBe('')
  await expect.poll(() => fuenteDeVideo(page, 'col2')).not.toBe('')

  await expect.poll(() => contarManifest(requests, MANIFEST_COL1)).toBeGreaterThan(0)
  await expect.poll(() => contarManifest(requests, MANIFEST_COL2)).toBeGreaterThan(0)
})

test('CA2 mobile apiladas', async ({ page }) => {
  await abrirCamaras(page, { width: 390, height: 844 })

  const card1 = page.locator('[data-testid=camara-card-col1]')
  const card2 = page.locator('[data-testid=camara-card-col2]')
  await expect(card1).toBeVisible()
  await card2.scrollIntoViewIfNeeded()
  await expect(card2).toBeVisible()

  const box1 = await card1.boundingBox()
  const box2 = await card2.boundingBox()
  expect(box1).not.toBeNull()
  expect(box2).not.toBeNull()
  expect(box2!.y).toBeGreaterThanOrEqual(box1!.y + box1!.height - 2)
  expect(Math.abs(box1!.x - box2!.x)).toBeLessThan(2)
})

test('CA3 sin flechas y con titulos', async ({ page }) => {
  await abrirCamaras(page, { width: 1280, height: 800 })

  await expect(
    page.locator('.q-tab-panel .q-icon', { hasText: /chevron_(left|right)/ }),
  ).toHaveCount(0)
  await expect(page.locator('[data-testid=camara-card-col1]')).toContainText('Cámara 1')
  await expect(page.locator('[data-testid=camara-card-col2]')).toContainText('Cámara 2')
})

test('CA4 error de una camara', async ({ page }) => {
  await abrirCamaras(page, { width: 1280, height: 800 }, { fallaCamara2: true })

  const error2 = page.locator('[data-testid=camara-error-col2]')
  await expect(error2).toBeVisible({ timeout: 30_000 })
  await expect(error2).toHaveText('Cámara no disponible')

  await expect(page.locator('[data-testid=camara-error-col1]')).toHaveCount(0)
  await expect(page.locator('[data-testid=camara-card-col1]')).not.toContainText(
    'Cámara no disponible',
  )
  await expect.poll(() => fuenteDeVideo(page, 'col1')).not.toBe('')
})

test('CA5 detiene y reanuda al cambiar de pestaña', async ({ page }) => {
  const requests = await abrirCamaras(page, { width: 1280, height: 800 })

  await expect.poll(() => contarManifest(requests, MANIFEST_COL1)).toBeGreaterThan(0)
  await expect.poll(() => contarManifest(requests, MANIFEST_COL2)).toBeGreaterThan(0)

  await page.getByRole('tab', { name: /Beneficios/ }).click()
  const cambio = Date.now()

  // Los videos desaparecen o quedan sin fuente
  await expect
    .poll(() =>
      page
        .locator('[data-testid^=camara-video-]')
        .evaluateAll((els) =>
          (els as HTMLVideoElement[]).every((v) => !v.currentSrc && !v.hasAttribute('src')),
        ),
    )
    .toBe(true)

  // El playlist en vivo se refrescaría cada ~2s si el stream siguiera activo
  await page.waitForTimeout(3_000)
  // Margen para requests que ya estaban en vuelo al momento del cambio
  const nuevas = requests.filter((r) => r.t > cambio + 500)
  expect(nuevas, `requests a mistserver tras salir de Cámaras: ${JSON.stringify(nuevas)}`).toHaveLength(0)

  const regreso = Date.now()
  await page.getByRole('tab', { name: /Cámaras/ }).click()
  await expect(page.locator('[data-testid=camaras-grid]')).toBeVisible()

  await expect.poll(() => contarManifest(requests, MANIFEST_COL1, regreso)).toBeGreaterThan(0)
  await expect.poll(() => contarManifest(requests, MANIFEST_COL2, regreso)).toBeGreaterThan(0)
  await expect.poll(() => fuenteDeVideo(page, 'col1')).not.toBe('')
  await expect.poll(() => fuenteDeVideo(page, 'col2')).not.toBe('')
})
