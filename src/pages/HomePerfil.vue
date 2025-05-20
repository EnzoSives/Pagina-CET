<template>
  <q-page class="q-pa-md" style="padding-top: 100px">
    <!-- Selector de Perfiles y Botón de Logout -->
    <div class="row justify-end q-mb-md items-center">
      <q-select
        v-model="perfilIndexLocal"
        :options="perfilesOptions"
        label="Seleccionar Perfil"
        outlined
        dense
        emit-value
        map-options
        :style="isMobile ? 'width: 70%' : 'width: 250px'"
        class="q-mb-xs q-mb-sm-none"
      />
      <q-btn
        icon="logout"
        style="height: 35px; margin-left: 20px"
        @click="authStore.logout"
      ></q-btn>
    </div>

    <!-- Tarjeta de Perfil - Versión Desktop -->
    <q-card v-if="!isMobile" class="q-pa-md row items-center" style="height: 150px">
      <q-avatar size="80px" class="q-mr-md">
        <img :src="perfilSeleccionado?.url || 'https://cdn.quasar.dev/img/avatar.png'" />
      </q-avatar>
      <div class="col">
        <div class="text-h6">
          {{ perfilSeleccionado?.nombre }} {{ perfilSeleccionado?.apellido }}
        </div>
        <div class="text-subtitle2 text-grey-7">
          <q-icon name="badge" /> N° Cliente: {{ perfilSeleccionado?.numeroCliente }}
          <q-icon name="event" class="q-ml-md" /> DNI: {{ perfilSeleccionado?.dni }}
        </div>
      </div>
      <div class="row items-center">
        <q-badge color="grey-3" text-color="black" class="q-pa-xs q-mr-md"> Socio Activo </q-badge>
        <q-btn color="primary" icon="badge" label="Credencial" @click="showCredencial = true" />
      </div>
    </q-card>

    <!-- Tarjeta de Perfil - Versión Mobile -->
    <q-card v-else class="q-pa-md">
      <div class="column items-center q-col-gutter-md">
        <div class="col-12 text-center">
          <q-avatar size="80px">
            <img :src="perfilSeleccionado?.url || 'https://cdn.quasar.dev/img/avatar.png'" />
          </q-avatar>
        </div>
        <div class="col-12 text-center">
          <div class="text-h6">
            {{ perfilSeleccionado?.nombre }} {{ perfilSeleccionado?.apellido }}
          </div>
          <div class="text-subtitle2 text-grey-7">
            <div><q-icon name="badge" /> N° Cliente: {{ perfilSeleccionado?.numeroCliente }}</div>
            <div><q-icon name="event" /> DNI: {{ perfilSeleccionado?.dni }}</div>
          </div>
        </div>
        <div class="col-12 text-center">
          <q-badge color="grey-3" text-color="black" class="q-pa-xs q-mb-sm block-center">
            Socio Activo
          </q-badge>
          <q-btn
            color="primary"
            icon="badge"
            label="Credencial"
            @click="showCredencial = true"
            class="full-width-mobile"
          />
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
    <q-tabs v-model="tab" class="q-mt-md" dense align="justify" :inline-label="!isMobile">
      <q-tab
        name="cobro"
        :label="isMobile ? '' : 'Cuentas de Cobro'"
        icon="account_balance_wallet"
      />
      <q-tab name="beneficios" :label="isMobile ? '' : 'Beneficios'" icon="card_giftcard" />
      <q-tab name="buscar" :label="isMobile ? '' : 'Buscar Socios'" icon="search" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <!-- Panel de Cuentas de Cobro -->
      <q-tab-panel name="cobro" :class="isMobile ? 'q-pa-sm' : 'q-pa-md'">
        <p class="text-h6 text-grey-7" :class="isMobile ? 'text-subtitle1' : ''">
          Visualiza y gestiona tus pagos pendientes
        </p>

        <q-list separator bordered class="rounded-borders">
          <CuentaCobro :eID="perfilSeleccionado?.id || ''" />
        </q-list>
      </q-tab-panel>

      <!-- Panel de Beneficios -->
      <q-tab-panel name="beneficios" :class="isMobile ? 'q-pa-sm' : 'q-pa-md'">
        <p class="text-h6 text-grey-7" :class="isMobile ? 'text-subtitle1' : ''">
          Aquí puedes ver los beneficios disponibles.
        </p>

        <!-- 👇 Botón y modal para crear beneficio -->
        <AgregarBeneficio />

        <!-- 👇 Lista de cards -->
        <div class="cards-container q-mt-md">
          <BeneficiosCard
            v-for="beneficio in beneficiosStore.beneficios"
            :key="beneficio.id"
            :beneficio="beneficio"
          />
        </div>
      </q-tab-panel>

      <!-- Panel de Buscar Socios -->
      <q-tab-panel name="buscar" :class="isMobile ? 'q-pa-sm' : 'q-pa-md'">
        <p class="text-h6 text-grey-7" :class="isMobile ? 'text-subtitle1' : ''">
          Busca y encuentra otros socios.
        </p>

        <!-- Campo de búsqueda -->
        <q-input
          v-model="busqueda"
          label="Ingrese el DNI del socio"
          outlined
          dense
          class="q-mb-md"
          @keyup.enter="buscarSocios"
        >
          <template v-slot:append>
            <q-btn icon="search" flat @click="buscarSocios"></q-btn>
          </template>
        </q-input>

        <!-- Lista de resultados -->
        <q-list
          separator
          bordered
          v-if="sociosEncontrados.length > 0"
          :style="isMobile ? 'width: 100%' : 'width: 300px'"
        >
          <q-item v-for="socio in sociosEncontrados" :key="socio.socio ?? ''" clickable>
            <q-item-section>
              <q-item-label>{{ socio.nombre }}</q-item-label>
              <q-item-label caption>{{ socio.documento }} | Socio: {{ socio.socio }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-badge text-color="black" :label="socio.estado || 'N/D'" />
            </q-item-section>
          </q-item>
        </q-list>

        <!-- Mensaje si no hay resultados -->
        <q-banner v-else class="bg-grey-3 text-black q-mt-md">
          No se encontraron socios con ese criterio de búsqueda.
        </q-banner>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, watchEffect, nextTick, onUnmounted } from 'vue'
import { usePerfilStore } from 'src/stores/perfilesStore'
import { useRouter } from 'vue-router'
import { useBeneficiosStore } from 'src/stores/beneficiosStore'
import { useAuthStore } from 'src/stores/auth'
import CuentaCobro from 'src/components/CuentaCobro.vue'
import BeneficiosCard from 'src/components/BeneficiosComponent.vue'
import type { Socio } from 'src/stores/perfilesStore'
import AgregarBeneficio from 'src/components/AgregarBeneficio.vue'

const credencialRef = ref(null)
const perfilStore = usePerfilStore()
const { getCuentasCobroPerfilJCETAction, setSocio } = perfilStore
const router = useRouter()
const beneficiosStore = useBeneficiosStore()
const authStore = useAuthStore()

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
})

// Limpiar el event listener al desmontar el componente
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const tab = ref('cobro')
const showCredencial = ref(false)
</script>

<style scoped>
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
  background: linear-gradient(45deg, #003366, #0066cc);
  border-radius: 10px;
  overflow: hidden;
  color: white;
}

.contenedor-credencial-mobile {
  position: relative;
  width: 100%;
  max-width: 320px;
  height: 200px;
  margin: 0 auto;
  background: linear-gradient(45deg, #003366, #0066cc);
  border-radius: 10px;
  overflow: hidden;
  color: white;
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
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
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
