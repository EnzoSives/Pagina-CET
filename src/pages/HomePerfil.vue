<template>
  <q-page class="q-pa-md page-background" style="padding-top: 100px">
    <!-- Selector de Perfiles y Botón de Logout -->
    <div class="row justify-end q-mb-md items-center">
      <q-select v-model="perfilIndexLocal" :options="perfilesOptions" label="Seleccionar Perfil" outlined dense
        emit-value map-options :style="isMobile ? 'width: 70%' : 'width: 250px'"
        class="q-mb-xs q-mb-sm-none selector-perfil" />
      <q-btn icon="logout" color="negative" style="height: 35px; margin-left: 20px" @click="authStore.logout"
        class="btn-logout" unelevated>Salir</q-btn>
    </div>

    <!-- Tarjeta de Perfil - Versión Desktop -->
    <q-card v-if="!isMobile" class="q-pa-lg row items-center perfil-card" style="height: 180px">
      <q-avatar size="100px" class="q-mr-lg avatar-perfil">
        <img :src="perfilImg" />
      </q-avatar>
      <div class="col">
        <div class="text-h5 text-weight-bold text-primary">
          {{ perfilSeleccionado?.nombre }} {{ perfilSeleccionado?.apellido }}
        </div>
        <div class="text-subtitle1 text-grey-7 q-mt-sm info-perfil">
          <q-icon name="badge" size="sm" color="primary" /> N° Cliente: {{ perfilSeleccionado?.numeroCliente }}
          <q-icon name="event" class="q-ml-md" size="sm" color="primary" /> DNI: {{ perfilSeleccionado?.dni }}
        </div>
      </div>
      <div class="row items-center">
        <q-badge color="positive" text-color="white" class="q-pa-sm q-mr-md badge-activo">
          <q-icon name="check_circle" size="xs" class="q-mr-xs" /> Socio Activo
        </q-badge>
        <q-btn color="primary" icon="badge" label="Credencial" @click="showCredencial = true" unelevated
          class="btn-credencial" size="md" />
      </div>
    </q-card>

    <!-- Tarjeta de Perfil - Versión Mobile -->
    <q-card v-else class="q-pa-md perfil-card-mobile">
      <div class="column items-center q-col-gutter-md">
        <div class="col-12 text-center">
          <q-avatar size="100px" class="avatar-perfil">
            <img :src="perfilImg" />
          </q-avatar>
        </div>
        <div class="col-12 text-center">
          <div class="text-h6 text-weight-bold text-primary">
            {{ perfilSeleccionado?.nombre }} {{ perfilSeleccionado?.apellido }}
          </div>
          <div class="text-subtitle2 text-grey-7 q-mt-sm">
            <div class="q-mb-xs"><q-icon name="badge" color="primary" /> N° Cliente: {{
              perfilSeleccionado?.numeroCliente }}</div>
            <div><q-icon name="event" color="primary" /> DNI: {{ perfilSeleccionado?.dni }}</div>
          </div>
        </div>
        <div class="col-12 text-center">
          <q-badge color="positive" text-color="white" class="q-pa-sm q-mb-sm block-center badge-activo">
            <q-icon name="check_circle" size="xs" class="q-mr-xs" /> Socio Activo
          </q-badge>
          <q-btn color="primary" icon="badge" label="Credencial" @click="showCredencial = true"
            class="full-width-mobile btn-credencial" unelevated />
        </div>
      </div>
    </q-card>

    <!-- Modal de Credencial - Ajustes para Mobile -->
    <q-dialog v-model="showCredencial">
      <q-card class="bg-white" :style="isMobile ? 'width: 90%' : ''">
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
          <q-btn flat label="Cerrar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Pestañas de Navegación -->
    <q-tabs v-model="tab" class="q-mt-lg tabs-navegacion" align="justify" :inline-label="!isMobile"
      active-color="primary" indicator-color="primary">
      <q-tab name="cobro" :label="isMobile ? '' : 'Cuentas de Cobro'" icon="account_balance_wallet" class="tab-item" />
      <q-tab name="beneficios" :label="isMobile ? '' : 'Beneficios'" icon="card_giftcard" class="tab-item" />
      <q-tab name="camaras" :label="isMobile ? '' : 'Cámaras'" icon="videocam" class="tab-item" />
      <q-tab name="buscar" :label="isMobile ? '' : 'Buscar Socios'" icon="search" class="tab-item" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <!-- Panel de Cuentas de Cobro -->
      <q-tab-panel name="cobro" :class="isMobile ? 'q-pa-sm' : 'q-pa-md'" class="tab-panel-animated">
        <div class="section-header">
          <q-icon name="account_balance_wallet" size="md" color="primary" class="q-mr-sm" />
          <p class="text-h6 text-grey-8 q-ma-none" :class="isMobile ? 'text-subtitle1' : ''">
            Visualiza y gestiona tus pagos pendientes
          </p>
        </div>

        <q-list separator bordered class="rounded-borders lista-cuentas">
          <CuentaCobro :eID="perfilSeleccionado?.id || ''" />
        </q-list>
      </q-tab-panel>

      <!-- Panel de Beneficios -->
      <q-tab-panel name="beneficios" :class="isMobile ? 'q-pa-sm' : 'q-pa-md'" class="tab-panel-animated">
        <div class="section-header">
          <q-icon name="card_giftcard" size="md" color="primary" class="q-mr-sm" />
          <p class="text-h6 text-grey-8 q-ma-none" :class="isMobile ? 'text-subtitle1' : ''">
            Aquí puedes ver los beneficios disponibles.
          </p>
        </div>

        <!-- 👇 Botón y modal para crear beneficio -->
        <AgregarBeneficio />

        <!-- 👇 Lista de cards -->
        <div class="cards-container q-mt-md">
          <BeneficiosCard v-for="beneficio in beneficiosStore.beneficios" :key="beneficio.id" :beneficio="beneficio" />
        </div>
      </q-tab-panel>

      <!-- Panel de Cámaras -->
      <q-tab-panel name="camaras" :class="isMobile ? 'q-pa-sm' : 'q-pa-md'" class="tab-panel-animated">
        <div class="section-header">
          <q-icon name="videocam" size="md" color="primary" class="q-mr-sm" />
          <p class="text-h6 text-grey-8 q-ma-none" :class="isMobile ? 'text-subtitle1' : ''">
            Visualiza en vivo las cámaras del complejo.
          </p>
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
          <q-icon name="search" size="md" color="primary" class="q-mr-sm" />
          <p class="text-h6 text-grey-8 q-ma-none" :class="isMobile ? 'text-subtitle1' : ''">
            Busca y encuentra otros socios.
          </p>
        </div>

        <!-- Campo de búsqueda -->
        <q-input v-model="busqueda" label="Ingrese el DNI del socio" outlined class="q-mb-md input-busqueda"
          @keyup.enter="buscarSocios">
          <template v-slot:prepend>
            <q-icon name="person_search" color="primary" />
          </template>
          <template v-slot:append>
            <q-btn icon="search" color="primary" flat rounded @click="buscarSocios"></q-btn>
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
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, watchEffect, nextTick, onUnmounted } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import { usePerfilStore } from 'src/stores/perfilesStore'
import { useRouter } from 'vue-router'
import { useBeneficiosStore } from 'src/stores/beneficiosStore'
import { useAuthStore } from 'src/stores/auth'
import CuentaCobro from 'src/components/CuentaCobro.vue'
import BeneficiosCard from 'src/components/BeneficiosComponent.vue'
import type { Socio } from 'src/stores/perfilesStore'
import AgregarBeneficio from 'src/components/AgregarBeneficio.vue'
import Hls from 'hls.js'
import perfilImg from 'src/assets/perfil.png'

const credencialRef = ref(null)
const perfilStore = usePerfilStore()
const { getCuentasCobroPerfilJCETAction, setSocio } = perfilStore
const router = useRouter()
const beneficiosStore = useBeneficiosStore()
const authStore = useAuthStore()

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

// Local ref para manejar el selector correctamente
const perfilIndexLocal = ref(perfilStore.perfilIndex)

// Opciones para el selector
const perfilesOptions = computed(() =>
  perfilStore.perfiles.map((perfil, index) => ({
    label: `${perfil.nombre} ${perfil.apellido}`,
    value: index,
  })),
)

// Perfil seleccionado
const perfilSeleccionado = computed(() => perfilStore.perfiles[perfilStore.perfilIndex] || null)

// Actualizar el store cuando cambie el selector
watch(perfilIndexLocal, (newIndex) => {
  if (newIndex !== null && newIndex !== undefined) {
    perfilStore.perfilIndex = newIndex
  }
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
/* Background */
.page-background {
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  min-height: 100vh;
}

/* Selector y Botón Logout */
.selector-perfil {
  transition: all 0.3s ease;
}

.btn-logout {
  transition: all 0.3s ease;
  text-transform: none;
  font-weight: 500;
}

.btn-logout:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Tarjeta de Perfil */
.perfil-card,
.perfil-card-mobile {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.perfil-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.16);
}

.avatar-perfil {
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
  transition: all 0.3s ease;
}

.avatar-perfil img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-perfil:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(25, 118, 210, 0.4);
}

.info-perfil {
  font-size: 0.95rem;
}

.badge-activo {
  border-radius: 20px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
  font-size: 0.85rem;
}

.btn-credencial {
  border-radius: 8px;
  font-weight: 600;
  text-transform: none;
  padding: 8px 20px;
  transition: all 0.3s ease;
}

.btn-credencial:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(25, 118, 210, 0.3);
}

/* Pestañas */
.tabs-navegacion {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 8px;
}

.tab-item {
  transition: all 0.3s ease;
  border-radius: 8px;
  font-weight: 500;
}

.tab-item:hover {
  background: rgba(25, 118, 210, 0.05);
}

/* Paneles de Pestañas */
.tab-panel-animated {
  animation: fadeInUp 0.5s ease;
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
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(25, 118, 210, 0.2);
}

/* Listas */
.lista-cuentas,
.lista-socios {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background: white;
}

.resultado-socio {
  transition: all 0.3s ease;
}

.resultado-socio:hover {
  background: rgba(25, 118, 210, 0.05);
  transform: translateX(4px);
}

/* Input de búsqueda */
.input-busqueda {
  max-width: 600px;
}

.banner-no-resultados {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Cámaras */
.camara-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
}

.camara-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
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

  .block-center {
    display: block;
    margin: 0 auto;
    margin-bottom: 10px;
  }
}
</style>
