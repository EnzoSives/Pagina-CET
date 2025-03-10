<template>
  <q-page class="q-pa-md" style="padding-top: 150px;">
    <!-- Tarjeta de Perfil -->
    <q-card class="q-pa-md row items-center">
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


          <q-item v-for="item in cuentasCobros" :key="item.nroCuenta">
            <CuentaCobro :id="item.nroCuenta" :eID="item.eID" :tipoCuentaCobro="item.tipoCuentaCobro"
              :saldo="item.saldo" :cpe="item.cPE" />

          </q-item>
        </q-list>
      </q-tab-panel>

      <!-- Panel de Beneficios -->
      <q-tab-panel name="beneficios">
        <div class="text-h6">Beneficios</div>
        <p class="text-grey-7">Aquí puedes ver los beneficios disponibles.</p>
      </q-tab-panel>

      <!-- Panel de Buscar Socios -->
      <q-tab-panel name="buscar">
        <div class="text-h6">Buscar Socios</div>
        <p class="text-grey-7">Busca y encuentra otros socios.</p>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { usePerfilStore } from 'src/stores/perfilesStore'
import { useRouter } from 'vue-router'
import CuentaCobro from 'src/components/CuentaCobro.vue'

const { perfilIndex, perfiles, getCuentasCobroPerfilJCETAction, cuentasCobros } = usePerfilStore()
const router = useRouter()

const perfilSeleccionado = computed(() => {
  return perfilIndex !== null && perfilIndex !== undefined ? perfiles[perfilIndex] : null
})

if (perfilIndex === null || perfilIndex === undefined) {
  router.push('/perfiles')
}

onMounted(() => {
  if (perfilSeleccionado.value) {
    getCuentasCobroPerfilJCETAction(perfilSeleccionado.value.id)
  }
})

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
</style>
