<template>
  <q-page class="q-pa-md" style="padding-top: 100px;">
    <!-- Selector de Perfiles -->
    <div class="row justify-end">
      <q-select v-model="perfilIndexLocal" :options="perfilesOptions" label="Seleccionar Perfil" outlined dense
        emit-value map-options class="q-mb-md" style="width: 250px;" />
      <q-btn icon="logout" color="orange-10" style="height: 38px; margin-left: 20px" @click="authStore.logout">
        <template v-slot:default>
          <q-tooltip anchor="bottom middle" self="top middle">
            Cerrar Sesión
          </q-tooltip>
        </template>
      </q-btn>
    </div>

    <!-- Tarjeta de Perfil -->
    <q-card v-if="!isMobile" class="q-pa-md row items-center" style="height: 150px;">
      <q-avatar size="80px" class="q-mr-md">
        <img :src="perfilSeleccionado?.url || 'https://cdn.quasar.dev/img/avatar.png'" />
      </q-avatar>
      <div class="col">
        <div class="text-h6">{{ perfilSeleccionado?.nombre }} {{ perfilSeleccionado?.apellido }}</div>
        <div class="text-subtitle2 text-grey-7">
          <q-icon name="badge" /> N° Cliente: {{ perfilSeleccionado?.numeroCliente }}
          <q-icon name="event" class="q-ml-md" /> DNI: {{ perfilSeleccionado?.dni }}
        </div>
      </div>
      <q-badge color="grey-3" text-color="black" class="q-pa-xs"> Socio Activo </q-badge>
    </q-card>
    <q-card v-else class="q-pa-md" style="min-height: 150px;">
      <div class="row items-center q-col-gutter-md">
        <div class="col-12 col-sm-auto text-center">
          <q-avatar size="80px">
            <img :src="perfilSeleccionado?.url || 'https://cdn.quasar.dev/img/avatar.png'" />
          </q-avatar>
        </div>
        <div class="col-12 col-sm text-center text-sm-left">
          <div class="text-h6">{{ perfilSeleccionado?.nombre }} {{ perfilSeleccionado?.apellido }}</div>
          <div class="text-subtitle2 text-grey-7">
            <q-icon name="badge" /> N° Cliente: {{ perfilSeleccionado?.numeroCliente }}
            <q-icon name="event" class="q-ml-md" /> DNI: {{ perfilSeleccionado?.dni }}
          </div>
        </div>
        <div class="col-12 col-sm-auto text-center q-mt-sm q-mt-sm-none">
          <q-badge color="grey-3" text-color="black" class="q-pa-xs"> Socio Activo </q-badge>
        </div>
      </div>
    </q-card>

    <!-- Pestañas de Navegación -->
    <q-tabs v-model="tab" class="q-mt-md" dense>
      <q-tab name="cobro" label="Cuentas de Cobro" />
      <q-tab name="beneficios" label="Beneficios" />
      <q-tab name="buscar" label="Buscar Socios" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <!-- Panel de Cuentas de Cobro -->
      <q-tab-panel name="cobro">
        <div class="text-h6">Cuentas de Cobro</div>
        <p class="text-grey-7">Visualiza y gestiona tus pagos pendientes</p>

        <q-list separator bordered class="rounded-borders">

          <CuentaCobro :eID="perfilSeleccionado?.id || ''" />


        </q-list>
      </q-tab-panel>

      <!-- Panel de Beneficios -->
      <q-tab-panel name="beneficios">
        <div class="text-h6">Beneficios</div>
        <p class="text-grey-7">Aquí puedes ver los beneficios disponibles.</p>
        <div class="cards-container">
          <BeneficiosCard v-for="beneficio in beneficiosStore.beneficios" :key="beneficio.id" :beneficio="beneficio" />
        </div>
      </q-tab-panel>

      <!-- Panel de Buscar Socios -->
      <!-- Panel de Buscar Socios -->
      <q-tab-panel name="buscar">
        <div class="text-h6">Buscar Socios</div>
        <p class="text-grey-7">Busca y encuentra otros socios.</p>

        <!-- Campo de búsqueda -->
        <q-input v-model="busqueda" label="Buscar por DNI o Nombre" outlined dense class="q-mx-auto" style="max-width: 100%; width: 100%; max-width: 600px; margin-bottom: 20px;">
          <template v-slot:append>
            <q-btn icon="search" flat @click="buscarSocios"></q-btn>
          </template>
        </q-input>

        <!-- Lista de resultados -->
        <q-list separator bordered v-if="sociosEncontrados.length > 0" class="q-mx-auto"
          style="max-width: 100%; width: 100%; max-width: 600px;">
          <q-item v-for="socio in sociosEncontrados" :key="socio.socio ?? ''" clickable>
            <q-item-section>
              <q-item-label>{{ socio.nombre }}</q-item-label>
              <q-item-label caption>{{ socio.documento }} | Socio: {{ socio.socio }}</q-item-label>
              <!-- <q-item-label caption>Dni {{ socio.fechaNacimiento }}</q-item-label> -->
            </q-item-section>
            <q-item-section side>
              <q-badge text-color="black" :label="socio.estado || 'Estado no disponible'" />
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
import { computed, ref, watch, onMounted, watchEffect } from 'vue'
import { usePerfilStore } from 'src/stores/perfilesStore'
import { useRouter } from 'vue-router'
import { useBeneficiosStore } from "src/stores/beneficiosStore";
import { useAuthStore } from 'src/stores/auth';
import CuentaCobro from 'src/components/CuentaCobro.vue'
import BeneficiosCard from "src/components/BeneficiosComponent.vue"; // Importa el componente
import type { Socio } from 'src/stores/perfilesStore';


const perfilStore = usePerfilStore()
const { getCuentasCobroPerfilJCETAction, setSocio, socio } = perfilStore
const router = useRouter()
const beneficiosStore = useBeneficiosStore();
const authStore = useAuthStore();

const busqueda = ref('');
const sociosEncontrados = ref<Socio[]>([]);

// Función para buscar socios por DNI o nombre
const buscarSocios = async () => {
  if (!busqueda.value.trim()) return;

  await setSocio(busqueda.value); // Llama a la API
  const resultado = socio; // Obtiene el resultado de la búsqueda
  console.log("Resultado de la búsqueda de socio:", resultado);

  if (resultado && resultado.socio) {
    sociosEncontrados.value = [resultado]; // Si se encuentra, lo agrega a la lista
  } else {
    sociosEncontrados.value = []; // Si no hay resultados, vacía la lista
  }
};

// Local ref para manejar el selector correctamente
const perfilIndexLocal = ref(perfilStore.perfilIndex)

// Opciones para el selector
const perfilesOptions = computed(() =>
  perfilStore.perfiles.map((perfil, index) => ({ label: `${perfil.nombre} ${perfil.apellido}`, value: index }))
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
    console.log("Cargando cuentas de cobro para el perfil:", perfilSeleccionado.value)
    getCuentasCobroPerfilJCETAction(perfilSeleccionado.value.id)
  }
})
// Redirigir si no hay perfil seleccionado
if (perfilStore.perfilIndex === null || perfilStore.perfilIndex === undefined) {
  router.push('/perfiles')
}
// Estado para saber si estamos en modo móvil
const isMobile = ref(false);

// Función para verificar si estamos en modo móvil
const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= 768; // Considerar móvil si la pantalla es de 768px o menor
};

// Función para manejar el redimensionamiento de la ventana
const handleResize = () => {
  checkIfMobile();
};

// Verificar el tamaño de la pantalla al montar el componente
onMounted(() => {
  checkIfMobile();
  // Agregar listener para detectar cambios en el tamaño de la ventana
  window.addEventListener('resize', handleResize);
});


// Cargar cuentas de cobro al iniciar
onMounted(() => {
  if (perfilSeleccionado.value) {
    getCuentasCobroPerfilJCETAction(perfilSeleccionado.value.id)
  }
})
onMounted(() => {
  beneficiosStore.fetchBeneficios();
});

const tab = ref('cobro')
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
  /* Permite que las cards bajen a la siguiente línea si no caben */
  gap: 20px;
  /* Espaciado entre cards */
  justify-content: center;
  /* Alinear al centro */
}
</style>
