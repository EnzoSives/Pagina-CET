<template>
  <q-page class="home-profile-page">
    <div class="home-profile-shell">
    <!-- Tarjeta de Perfil - Versión Desktop -->
    <q-card v-if="!isMobile" class="perfil-card">
      <q-avatar size="100px" class="avatar-perfil">
        <img v-if="avatarUrl" :src="avatarUrl" @error="avatarError = true" />
        <span v-else>{{ profileInitials }}</span>
      </q-avatar>
      <div class="profile-summary">
        <p class="profile-eyebrow">Mi perfil CET</p>
        <h1>
          {{ perfilSeleccionado?.nombre }} {{ perfilSeleccionado?.apellido }}
        </h1>
        <div class="profile-meta">
          <span><q-icon name="badge" size="18px" /> N° Cliente: {{ perfilSeleccionado?.numeroCliente }}</span>
          <span><q-icon name="event" size="18px" /> DNI: {{ perfilSeleccionado?.dni }}</span>
        </div>
      </div>
      <div class="profile-actions">
        <q-badge color="positive" text-color="white" class="badge-activo">
          <q-icon name="check_circle" size="xs" class="q-mr-xs" /> Socio Activo
        </q-badge>
        <q-btn icon-right="badge" label="Credencial" @click="showCredencial = true" unelevated
          class="app-btn app-btn--primary btn-credencial" size="md" />
      </div>
    </q-card>

    <!-- Tarjeta de Perfil - Versión Mobile -->
    <q-card v-else class="perfil-card-mobile">
      <div class="mobile-profile-content">
        <div class="text-center">
          <q-avatar size="100px" class="avatar-perfil">
            <img v-if="avatarUrl" :src="avatarUrl" @error="avatarError = true" />
            <span v-else>{{ profileInitials }}</span>
          </q-avatar>
        </div>
        <div class="text-center">
          <p class="profile-eyebrow">Mi perfil CET</p>
          <h1>
            {{ perfilSeleccionado?.nombre }} {{ perfilSeleccionado?.apellido }}
          </h1>
          <div class="profile-meta profile-meta--mobile">
            <span><q-icon name="badge" /> N° Cliente: {{ perfilSeleccionado?.numeroCliente }}</span>
            <span><q-icon name="event" /> DNI: {{ perfilSeleccionado?.dni }}</span>
          </div>
        </div>
        <div class="mobile-profile-actions">
          <q-badge color="positive" text-color="white" class="badge-activo">
            <q-icon name="check_circle" size="xs" class="q-mr-xs" /> Socio Activo
          </q-badge>
          <q-btn icon-right="badge" label="Credencial" @click="showCredencial = true"
            class="app-btn app-btn--primary full-width-mobile btn-credencial" unelevated />
        </div>
      </div>
    </q-card>

    <!-- Modal de Credencial - Ajustes para Mobile -->
    <q-dialog v-model="showCredencial">
      <q-card class="credential-dialog" :style="isMobile ? 'width: 90%' : ''">
        <q-card-section class="row items-center">
          <div class="text-h6">Credencial Digital</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div ref="credencialRef" class="contenedor-credencial" v-if="!isMobile">
            <img src="~/assets/credencial.png" class="credencial-bg" />
            <div class="texto-ano">2025</div>
            <div class="texto-apellido">{{ perfilSeleccionado?.apellido }}</div>
            <div class="texto-nombre">{{ perfilSeleccionado?.nombre }}</div>
            <div class="socio-nro">{{ perfilSeleccionado?.numeroCliente }}</div>
            <div class="texto-dni">D.N.I.: {{ perfilSeleccionado?.dni }}</div>
          </div>
          <div v-else class="contenedor-credencial-mobile">
            <img src="~/assets/credencial.png" class="credencial-bg" />
            <div class="texto-ano">2025</div>
            <div class="texto-apellido">{{ perfilSeleccionado?.apellido }}</div>
            <div class="texto-nombre">{{ perfilSeleccionado?.nombre }}</div>
            <div class="socio-nro">{{ perfilSeleccionado?.numeroCliente }}</div>
            <div class="texto-dni">D.N.I.: {{ perfilSeleccionado?.dni }}</div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-px-md q-pb-md">
          <q-btn flat label="Cerrar" class="app-btn app-btn--secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Pestañas de Navegación -->
    <q-tabs v-model="tab" class="tabs-navegacion" align="justify" inline-label mobile-arrows outside-arrows
      active-color="primary" indicator-color="primary">
      <q-tab name="cobro" label="Cuentas" icon="account_balance_wallet" class="tab-item" />
      <q-tab name="beneficios" label="Beneficios" icon="card_giftcard" class="tab-item" />
      <q-tab name="camaras" label="Cámaras" icon="videocam" class="tab-item" />
      <q-tab name="buscar" label="Buscar" icon="search" class="tab-item" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <!-- Panel de Cuentas de Cobro -->
      <q-tab-panel name="cobro" :class="isMobile ? 'q-pa-sm' : 'q-pa-md'" class="tab-panel-animated">
        <div class="section-header">
          <span class="section-header__icon"><q-icon name="account_balance_wallet" size="22px" /></span>
          <div>
            <h2>Cuentas de cobro</h2>
            <p>Visualizá y gestioná tus pagos pendientes.</p>
          </div>
        </div>

        <q-list class="lista-cuentas">
          <CuentaCobro :eID="perfilSeleccionado?.id || ''" />
        </q-list>
      </q-tab-panel>

      <!-- Panel de Beneficios -->
      <q-tab-panel name="beneficios" :class="isMobile ? 'q-pa-sm' : 'q-pa-md'" class="tab-panel-animated">
        <div class="section-header">
          <span class="section-header__icon"><q-icon name="card_giftcard" size="22px" /></span>
          <div>
            <h2>Beneficios</h2>
            <p>Consultá los beneficios disponibles para socios.</p>
          </div>
        </div>

        <!-- 👇 Botón y modal para crear beneficio -->
        <AgregarBeneficio />

        <!-- 👇 Lista de cards -->
        <div class="cards-container q-mt-md">
          <BeneficiosCard v-for="beneficio in beneficiosStore.beneficios" :key="beneficio.id" :beneficio="beneficio"
            editable />
        </div>
      </q-tab-panel>

      <!-- Panel de Cámaras -->
      <q-tab-panel name="camaras" :class="isMobile ? 'q-pa-sm' : 'q-pa-md'" class="tab-panel-animated">
        <div class="section-header">
          <span class="section-header__icon"><q-icon name="videocam" size="22px" /></span>
          <div>
            <h2>Cámaras</h2>
            <p>Visualizá en vivo las cámaras del complejo.</p>
          </div>
        </div>

        <div class="q-mt-md">
          <div class="row items-center justify-center q-mb-md q-gutter-sm">
            <q-btn icon="chevron_left" round flat color="primary" :disable="camaraIndex === 0"
              @click="camaraIndex--" />
            <q-chip color="primary" text-color="white" icon="videocam">
              {{ camaraActual?.titulo }}
            </q-chip>
            <q-btn icon="chevron_right" round flat color="primary" :disable="camaraIndex === camaras.length - 1"
              @click="camaraIndex++" />
          </div>
          <q-card class="q-pa-md camara-card" style="max-width: 800px; margin: 0 auto;">
            <div class="text-subtitle1 text-weight-medium q-mb-sm">
              <q-icon name="fiber_manual_record" color="red" size="xs" class="blink" />
              {{ camaraActual?.titulo }}
            </div>
            <div class="video-wrapper">
              <video class="camara-video" playsinline controls muted crossorigin="anonymous"
                :ref="(el) => setVideoRef(el, camaraActual?.id ?? '')"></video>
            </div>
          </q-card>
        </div>
      </q-tab-panel>

      <!-- Panel de Buscar Socios -->
      <q-tab-panel name="buscar" :class="isMobile ? 'q-pa-sm' : 'q-pa-md'" class="tab-panel-animated">
        <div class="section-header">
          <span class="section-header__icon"><q-icon name="search" size="22px" /></span>
          <div>
            <h2>Buscar socios</h2>
            <p>Buscá y encontrá otros socios por DNI.</p>
          </div>
        </div>

        <!-- Campo de búsqueda -->
        <q-input v-model="busqueda" label="Ingrese el DNI del socio" outlined class="q-mb-md input-busqueda"
          @keyup.enter="buscarSocios">
          <template v-slot:prepend>
            <q-icon name="person_search" color="primary" />
          </template>
          <template v-slot:append>
            <q-btn icon="search" class="app-btn app-btn--secondary search-button" flat rounded @click="buscarSocios"></q-btn>
          </template>
        </q-input>

        <!-- Lista de resultados -->
        <q-list separator bordered v-if="sociosEncontrados.length > 0"
          :style="isMobile ? 'width: 100%' : 'width: 400px'" class="lista-socios">
          <q-item v-for="socio in sociosEncontrados" :key="socio.socio ?? ''" clickable class="resultado-socio">
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white" icon="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium">{{ socio.nombre }}</q-item-label>
              <q-item-label caption>{{ socio.documento }} | Socio: {{ socio.socio }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-badge color="positive" text-color="white" :label="socio.estado || 'N/D'" />
            </q-item-section>
          </q-item>
        </q-list>

        <!-- Mensaje si no hay resultados -->
        <q-banner v-else class="bg-grey-2 text-grey-8 q-mt-md banner-no-resultados" rounded>
          <template v-slot:avatar>
            <q-icon name="info" color="grey-6" />
          </template>
          No se encontraron socios con ese criterio de búsqueda.
        </q-banner>
      </q-tab-panel>
    </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, watchEffect, nextTick, onUnmounted } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import { usePerfilStore } from 'src/stores/perfilesStore'
import { useRouter } from 'vue-router'
import { useBeneficiosStore } from 'src/stores/beneficiosStore'
import CuentaCobro from 'src/components/CuentaCobro.vue'
import BeneficiosCard from 'src/components/BeneficiosComponent.vue'
import type { Socio } from 'src/stores/perfilesStore'
import AgregarBeneficio from 'src/components/AgregarBeneficio.vue'
import Hls from 'hls.js'

const credencialRef = ref(null)
const perfilStore = usePerfilStore()
const { getCuentasCobroPerfilJCETAction, setSocio } = perfilStore
const router = useRouter()
const beneficiosStore = useBeneficiosStore()

type Camara = {
  id: string
  titulo: string
  url: string
}

const camaras: Camara[] = [
  { id: 'col1', titulo: 'Cámara 1', url: 'https://mistserver.telpin.com.ar:8888/cet-col1/index.m3u8' },
  { id: 'col2', titulo: 'Cámara 2', url: 'https://mistserver.telpin.com.ar:8888/cet-col3/index.m3u8' },
]

const camaraIndex = ref(0)
const camaraActual = computed(() => camaras[camaraIndex.value])

const videoRefs = ref<Record<string, HTMLVideoElement | null>>({})
const hlsInstances: Record<string, Hls | null> = {}

const setVideoRef = (el: Element | ComponentPublicInstance | null, id: string) => {
  if (el instanceof HTMLVideoElement) {
    videoRefs.value[id] = el
  }
}

const playSafely = (video: HTMLVideoElement) => {
  video.play().catch((err) => {
    console.warn('No se pudo reproducir la cámara sin interacción del usuario.', err)
  })
}

const inicializarCamara = async () => {
  await nextTick()

  // Destruir instancias HLS previas
  Object.entries(hlsInstances).forEach(([id, hls]) => {
    hls?.destroy()
    hlsInstances[id] = null
  })

  const camara = camaraActual.value
  if (!camara) return
  const video = videoRefs.value[camara.id]
  if (!video) return

  if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = camara.url
    video.addEventListener('loadedmetadata', () => playSafely(video), { once: true })
  } else if (Hls.isSupported()) {
    const hls = new Hls()
    hls.loadSource(camara.url)
    hls.attachMedia(video)
    hls.on(Hls.Events.MANIFEST_PARSED, () => playSafely(video))
    hls.on(Hls.Events.ERROR, (_, data) => {
      console.warn('Error HLS en cámara', camara.id, data)
    })
    hlsInstances[camara.id] = hls
  }
}

const busqueda = ref('')
const sociosEncontrados = ref<Socio[]>([])
const avatarError = ref(false)

// Función para buscar socios por DNI
const buscarSocios = async () => {
  if (!busqueda.value.trim()) return
  console.log('Buscando socio con DNI:', busqueda.value)
  await setSocio(busqueda.value)
  await nextTick()
  console.log('Resultado de la búsqueda de socio:', perfilStore.socio)

  if (perfilStore.socio && perfilStore.socio.socio) {
    sociosEncontrados.value = [perfilStore.socio]
  } else {
    sociosEncontrados.value = []
  }
}

// Perfil seleccionado
const perfilSeleccionado = computed(() => perfilStore.perfiles[perfilStore.perfilIndex] || null)
const avatarUrl = computed(() => avatarError.value ? '' : (perfilSeleccionado.value?.url || ''))
const profileInitials = computed(() => {
  const nombre = perfilSeleccionado.value?.nombre || ''
  const apellido = perfilSeleccionado.value?.apellido || ''
  return `${nombre.charAt(0)}${apellido.charAt(0)}`.trim().toUpperCase() || 'CET'
})

watch(perfilSeleccionado, () => {
  avatarError.value = false
})

// Ejecutar la actualización de `cuentasCobros` cada vez que cambie el perfil seleccionado
watchEffect(() => {
  if (perfilSeleccionado.value) {
    console.log('Cargando cuentas de cobro para el perfil:', perfilSeleccionado.value)
    getCuentasCobroPerfilJCETAction(perfilSeleccionado.value.id)
  }
})

// Redirigir si no hay perfil seleccionado
if (perfilStore.perfilIndex === null || perfilStore.perfilIndex === undefined) {
  router.push('/perfiles')
}

// Estado para saber si estamos en modo móvil
const isMobile = ref(false)

// Función para verificar si estamos en modo móvil
const checkIfMobile = () => {
  isMobile.value = window.innerWidth < 768 // Considerar móvil si la pantalla es menor a 768px
}

// Función para manejar el redimensionamiento de la ventana
const handleResize = () => {
  checkIfMobile()
}

// Verificar el tamaño de la pantalla al montar el componente
onMounted(() => {
  checkIfMobile()
  // Agregar listener para detectar cambios en el tamaño de la ventana
  window.addEventListener('resize', handleResize)

  // Cargar cuentas de cobro y beneficios
  if (perfilSeleccionado.value) {
    getCuentasCobroPerfilJCETAction(perfilSeleccionado.value.id)
  }
  beneficiosStore.fetchBeneficios()
  inicializarCamara()
})

// Limpiar el event listener al desmontar el componente
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  Object.values(hlsInstances).forEach((hls) => hls?.destroy())
})

const tab = ref('cobro')

watch(tab, (activeTab) => {
  if (activeTab === 'camaras') {
    inicializarCamara()
  }
})

watch(camaraIndex, () => {
  inicializarCamara()
})

const showCredencial = ref(false)
</script>

<style scoped>
.home-profile-page {
  min-height: 100vh;
  padding: 0 0 64px;
  background: var(--surface-bg);
  color: var(--color-text);
}

.home-profile-shell {
  width: min(1180px, 100%);
  margin: 0 auto;
  padding: 34px 24px 0;
}

.profile-toolbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
}

.selector-perfil {
  width: min(100%, 280px);
}

.btn-logout {
  min-height: 40px;
  padding: 0 18px;
  border: 1px solid rgba(185, 28, 28, 0.18);
  border-radius: var(--radius-sm);
  background: #fff;
  color: #b91c1c;
  box-shadow: var(--shadow-sm);
  font-weight: 700;
  text-transform: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-logout:hover,
.perfil-card:hover,
.camara-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.perfil-card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 22px;
  min-height: 164px;
  padding: 24px;
}

.perfil-card,
.perfil-card-mobile,
.credential-dialog {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.perfil-card-mobile {
  padding: 20px 18px 22px;
}

.mobile-profile-content {
  display: grid;
  justify-items: center;
  gap: 12px;
}

.avatar-perfil {
  border: 4px solid #fff;
  background: var(--color-primary);
  color: #fff;
  font-weight: 850;
  letter-spacing: 0.02em;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.16), var(--shadow-md);
}

.profile-summary {
  min-width: 0;
}

.profile-eyebrow {
  margin: 0 0 7px;
  color: var(--color-text-soft);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.profile-summary h1,
.perfil-card-mobile h1 {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(1.6rem, 4vw, 2.35rem);
  font-weight: 850;
  line-height: 1.05;
}

.profile-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
  color: var(--color-text-soft);
  font-weight: 700;
}

.profile-meta span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 11px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: #f8fafc;
}

.profile-meta .q-icon {
  color: var(--color-primary);
}

.profile-meta--mobile {
  justify-content: center;
}

.profile-actions,
.mobile-profile-actions {
  display: grid;
  justify-items: end;
  gap: 12px;
}

.mobile-profile-actions {
  justify-items: center;
  width: 100%;
  margin-top: 2px;
}

.badge-activo {
  min-height: 32px;
  padding: 7px 12px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 800;
  box-shadow: 0 8px 18px rgba(22, 163, 74, 0.18);
}

.btn-credencial {
  width: min(100%, 300px);
  min-width: 150px;
}

.tabs-navegacion {
  margin-top: 20px;
  padding: 6px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.92);
  box-shadow: var(--shadow-sm);
}

.tab-item {
  border-radius: var(--radius-sm);
  font-weight: 800;
  min-height: 46px;
  text-transform: none;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.tab-item:hover {
  background: var(--color-primary-soft);
}

.tab-panel-animated {
  margin-top: 14px;
  padding: 24px !important;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  animation: fadeInUp 0.35s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-header {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
}

.section-header__icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  background: var(--color-primary-soft);
  color: var(--color-primary);
}

.section-header h2 {
  margin: 0;
  color: var(--color-text);
  font-size: clamp(1.35rem, 3vw, 1.9rem);
  font-weight: 850;
  line-height: 1.1;
}

.section-header p {
  margin: 6px 0 0;
  color: var(--color-text-soft);
  font-size: 0.92rem;
}

/* Listas */
.lista-cuentas,
.lista-socios {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--color-surface);
  box-shadow: none;
}

.resultado-socio {
  transition: all 0.3s ease;
}

.resultado-socio:hover {
  background: var(--color-primary-soft);
}

/* Input de búsqueda */
.input-busqueda {
  max-width: 600px;
}

.search-button {
  min-width: 40px;
  min-height: 40px;
  padding: 0;
}

.banner-no-resultados {
  border: 1px solid var(--color-border);
  box-shadow: none;
}

/* Cámaras */
.camara-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

.blink {
  animation: blink-animation 2s infinite;
}

@keyframes blink-animation {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
  }
}

.texto-apellido,
.texto-nombre,
.texto-dni,
.nro-socio {
  font-size: 1rem;
  font-weight: bold;
  margin-top: 5px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.contenedor-credencial {
  position: relative;
  width: 400px;
  height: 250px;
  margin: 0 auto;
  background: linear-gradient(135deg, #1976d2, #0d47a1);
  border-radius: 16px;
  overflow: hidden;
  color: white;
  box-shadow: 0 12px 32px rgba(25, 118, 210, 0.4);
  transition: all 0.3s ease;
}

.contenedor-credencial:hover {
  transform: scale(1.02);
  box-shadow: 0 16px 40px rgba(25, 118, 210, 0.5);
}

.contenedor-credencial-mobile {
  position: relative;
  width: 100%;
  max-width: 320px;
  height: 200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #1976d2, #0d47a1);
  border-radius: 16px;
  overflow: hidden;
  color: white;
  box-shadow: 0 8px 24px rgba(25, 118, 210, 0.4);
}

.credencial-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cards-container {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  margin-top: 24px;
}

.camaras-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}

.video-wrapper {
  position: relative;
  padding-top: 56.25%;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
}

.camara-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
}

.camara-video:hover {
  transform: scale(1.02);
}

.texto-ano {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 1.2rem;
  font-weight: bold;
}

.texto-apellido {
  position: absolute;
  top: 120px;
  left: 50px;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
}

.texto-nombre {
  position: absolute;
  top: 140px;
  left: 50px;
  font-size: 1rem;
  text-transform: uppercase;
}

.socio-nro {
  position: absolute;
  top: 194px;
  left: 115px;
  font-size: 0.8rem;
}

.texto-dni {
  position: absolute;
  top: 180px;
  left: 260px;
  font-size: 0.8rem;
}

/* Ajustes para la versión móvil */
@media (max-width: 767px) {
  .home-profile-page {
    padding-bottom: 32px;
  }

  .home-profile-shell {
    padding: 16px 12px 0;
  }

  .profile-toolbar {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 10px;
    margin-bottom: 14px;
  }

  .selector-perfil {
    width: 100%;
  }

  .btn-logout {
    min-width: 0;
    padding: 0 12px;
  }

  .tabs-navegacion {
    margin-top: 16px;
  }

  .tab-panel-animated {
    margin-top: 12px;
    padding: 18px !important;
    border-radius: 18px;
  }

  .section-header {
    align-items: start;
    gap: 12px;
  }

  .section-header__icon {
    width: 40px;
    height: 40px;
  }

  .perfil-card-mobile .avatar-perfil {
    width: 78px !important;
    height: 78px !important;
  }

  .perfil-card-mobile h1 {
    font-size: clamp(1.45rem, 6.6vw, 1.9rem);
  }

  .cards-container {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .camaras-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .texto-apellido {
    top: 80px;
    left: 30px;
    font-size: 0.9rem;
  }

  .texto-nombre {
    top: 100px;
    left: 30px;
    font-size: 0.9rem;
  }

  .socio-nro {
    top: 153px;
    left: 90px;
    font-size: 0.7rem;
  }

  .texto-dni {
    top: 130px;
    left: 190px;
    font-size: 0.7rem;
  }

  .full-width-mobile {
    width: 100%;
  }

  .mobile-profile-actions .btn-credencial.full-width-mobile {
    width: min(100%, 280px);
  }

  .block-center {
    display: block;
    margin: 0 auto;
    margin-bottom: 10px;
  }
}

/* Ajuste minimalista/profesional */
.perfil-card,
.perfil-card-mobile,
.tabs-navegacion,
.tab-panel-animated,
.camara-card,
.lista-cuentas,
.lista-socios {
  box-shadow: none;
}

.perfil-card:hover,
.camara-card:hover {
  transform: none;
  box-shadow: none;
}

.profile-toolbar {
  margin-bottom: 14px;
}

.perfil-card {
  min-height: 148px;
  padding: 22px;
}

.avatar-perfil {
  box-shadow: 0 0 0 1px var(--color-border);
}

.profile-eyebrow {
  color: #64748b;
  font-size: 0.72rem;
}

.profile-summary h1,
.perfil-card-mobile h1 {
  letter-spacing: -0.035em;
}

.profile-meta span {
  background: transparent;
}

.badge-activo {
  box-shadow: none;
}

.btn-credencial {
  box-shadow: none;
}

.tabs-navegacion {
  background: var(--color-surface);
}

.tab-item {
  color: #334155;
  font-weight: 700;
}

.section-header__icon {
  background: #f8fafc;
}

@media (max-width: 767px) {
  .perfil-card-mobile {
    padding: 16px;
  }

  .mobile-profile-content {
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    justify-items: start;
    column-gap: 14px;
    row-gap: 12px;
  }

  .perfil-card-mobile .text-center {
    text-align: left;
  }

  .perfil-card-mobile .avatar-perfil {
    width: 64px !important;
    height: 64px !important;
    font-size: 1.1rem;
  }

  .perfil-card-mobile h1 {
    font-size: clamp(1.2rem, 5.4vw, 1.55rem);
  }

  .profile-meta {
    gap: 6px;
    margin-top: 10px;
  }

  .profile-meta span {
    padding: 5px 8px;
    font-size: 0.78rem;
  }

  .profile-meta--mobile {
    justify-content: flex-start;
  }

  .mobile-profile-actions {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    justify-self: stretch;
    gap: 10px;
    margin-top: 0;
  }

  .mobile-profile-actions .btn-credencial.full-width-mobile {
    width: auto;
    min-width: 142px;
  }

  .tabs-navegacion {
    padding: 4px;
  }

  .tab-item {
    min-height: 42px;
    font-size: 0.8rem;
  }
}

/* Uso completo del ancho disponible */
.home-profile-shell {
  width: 100%;
  max-width: none;
  margin: 0;
  padding-right: clamp(12px, 2vw, 24px);
  padding-left: clamp(12px, 2vw, 24px);
}

.profile-toolbar,
.perfil-card,
.perfil-card-mobile,
.tabs-navegacion,
.tab-panel-animated,
.lista-cuentas,
.lista-socios {
  width: 100%;
}

.selector-perfil {
  flex: 1 1 auto;
  width: 100%;
  max-width: none;
}

.input-busqueda {
  width: 100%;
  max-width: none;
}

.cards-container,
.camaras-grid {
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

@media (max-width: 620px) {
  .cards-container,
  .camaras-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 767px) {
  .home-profile-shell {
    padding-right: 10px;
    padding-left: 10px;
  }

  .mobile-profile-actions .btn-credencial.full-width-mobile {
    width: 100%;
  }
}
</style>
