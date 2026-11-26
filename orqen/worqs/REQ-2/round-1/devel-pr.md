## REQ-2 / SIS-1 — Mostrar las dos cámaras a la vez

**Pedido:** REQ-2 · **Issue:** SIS-1 · **Vía:** directa · **Análisis:** `orqen/worqs/REQ-2/round-1/analysis.md`

### Resumen

La pestaña **Cámaras** del perfil (`HomePerfil.vue`) mostraba una sola cámara por vez y se cambiaba con flechas. Ahora muestra las dos cámaras en vivo al mismo tiempo, con un reproductor HLS independiente por cámara.

### Cambios

**`src/pages/HomePerfil.vue`**
- Template: se quitaron las flechas (`chevron_left/right`) y el chip de cámara actual. Una grilla `.camaras-grid` renderiza una tarjeta por cámara con su título, su `<video>` y, si falla, el aviso "Cámara no disponible". Se agregaron `data-testid` (`camaras-grid`, `camara-card-<id>`, `camara-video-<id>`, `camara-error-<id>`).
- Script: se eliminaron `camaraIndex`, `camaraActual`, `inicializarCamara` y su `watch`.
  - `iniciarCamaras()` arranca cada cámara por separado, con `src` nativo en Safari o `Hls` en el resto.
  - `detenerCamaras()` destruye las instancias HLS, pausa los videos y les limpia el `src`.
  - `erroresCamara` guarda el error de cada cámara: se marca ante un error HLS fatal, un error del `<video>` o la falta de soporte HLS.
- Ciclo de vida: al entrar a la pestaña Cámaras se inician los streams, al salir se detienen, y también se detienen en `onUnmounted`. En `onMounted` solo se inician si la pestaña activa es Cámaras (antes se iniciaban siempre).
- CSS: `.camaras-grid` tiene 2 columnas en desktop y 1 columna por debajo de 767px. Se unificaron las reglas duplicadas y se agregó el overlay `.camara-error`.

**Tests e2e (nuevo: Playwright)**
- `@playwright/test` (devDependency), `playwright.config.ts` (levanta `npm run dev` en :9000, solo chromium), script `test:e2e` y entradas en `.gitignore`.
- `tests/e2e/camaras.spec.ts` + `tests/e2e/fixtures/live.m3u8`: la sesión y el perfil se siembran en localStorage, los streams de mistserver se simulan con `page.route` y Firebase y el backend se interceptan. No depende de la red real.

**Configuración**
- `orqen/environment.yaml`: `tests.e2e: npx playwright test`, para que TESTING corra los e2e.
- `orqen/config.yaml`: `devel_branch` pasa de `desarrollo` (rama inexistente) a `dev`.
- `.gitignore`: se ignoran `cli/.state/` y las capturas locales `public/imgs/Captura de pantalla *.png`, que habían entrado por error a la rama y se quitaron.

### Decisiones (análisis con el analista)
- Disposición: lado a lado en desktop y apiladas en mobile (<768px).
- Se quita la navegación con flechas.
- Las dos cámaras arrancan solas y muteadas; si el navegador bloquea el autoplay, queda el play manual.
- Las cámaras son independientes: si una falla, la otra sigue.
- Los streams se detienen al salir de la pestaña.

### Desvíos respecto del plan
- Se agregó Playwright, que el analista aprobó al aprobar el plan de implementación; el plan original solo preveía build y revisión manual.
- Se agregaron la config de entorno y el arreglo de `devel_branch` mencionados arriba.

### Tests ↔ criterios de aceptación

| Criterio | Test | Resultado |
|---|---|---|
| CA1: en desktop, las dos cámaras lado a lado y reproduciéndose | `camaras.spec.ts › CA1 desktop lado a lado` | ✅ |
| CA2: en mobile (<768px), apiladas | `camaras.spec.ts › CA2 mobile apiladas` | ✅ |
| CA3: sin flechas, con un título por video | `camaras.spec.ts › CA3 sin flechas y con titulos` | ✅ |
| CA4: si falla una, esa muestra "Cámara no disponible" y la otra sigue | `camaras.spec.ts › CA4 error de una camara` | ✅ |
| CA5: al cambiar de pestaña se detienen y al volver se reanudan | `camaras.spec.ts › CA5 detiene y reanuda al cambiar de pestaña` | ✅ |

Etapa TESTING: `npm run build` OK y `npx playwright test` 5/5 OK. Lint de `HomePerfil.vue` sin errores.

### Cómo verificar
1. `npm ci`, y `npx playwright install chromium` la primera vez.
2. `npm run test:e2e`.
3. Manual: `npm run dev`, iniciar sesión, elegir un perfil y abrir la pestaña **Cámaras**. Revisar en desktop y en mobile (DevTools) que se vean las dos cámaras reales, y que al cambiar de pestaña dejen de pedirse segmentos a mistserver (pestaña Network).

### Riesgos y pendientes
- Con dos streams simultáneos se duplica el consumo de datos en mobile y las conexiones a mistserver por usuario.
- Algunos navegadores pueden bloquear el autoplay de dos videos; queda el play manual.
- En CA1, "reproduciéndose" se verifica por la fuente asignada y la carga del manifest (streams simulados). Conviene una revisión manual con los streams reales.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
