<template>
  <!-- Mostrar las cuentas de cobro disponibles -->
  <q-item v-for="(cuenta, index) in cuentasCobro" :key="index" clickable @click="toMovimientos(cuenta.eID)"
    :class="nameClass(cuenta)" style="width: 100%;">
    <q-item-section>
      <q-item-label class="text-bold">{{ titulo(cuenta) }}</q-item-label>
      <q-item-label caption>
        <q-icon name="event" /> {{ descripcion(cuenta) }}
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-badge :color="badgeColor(cuenta)" text-color="black" :label="debe(cuenta)" />
      <div class="text-h6">$ {{ cuenta.saldo || '0' }}</div> <!-- Si no hay saldo, mostrar 0 -->
    </q-item-section>
  </q-item>

  <!-- Si no hay cuentas, mostrar un mensaje indicándolo -->
  <q-item v-if="cuentasCobro.length === 0" clickable class="bg-grey-2" style="width: 100%;">
    <q-item-section>
      <q-item-label class="text-bold">No hay cuenta de cobro disponible</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePerfilStore } from 'src/stores/perfilesStore'

const props = defineProps({
  eID: {
    type: String,
    required: true
  }
})

const router = useRouter()
const perfilStore = usePerfilStore()

// Asegúrate de que las cuentas de cobro no se dupliquen y se carguen solo si es necesario
onMounted(async () => {
  // Verifica si ya están cargadas las cuentas y si no, realiza la carga
  if (perfilStore.cuentasCobros.length === 0 || String(perfilStore.perfilIndex) !== props.eID) {

    console.log("Cargando cuentas de cobro..., eID:", props.eID)
    await perfilStore.getCuentasCobroPerfilJCETAction(props.eID) // Asegúrate de que esta función existe en el store
  }
})

// Computed para obtener todas las cuentas de cobro desde el store
const cuentasCobro = computed(() => perfilStore.cuentasCobros)

const nameClass = (cuenta: any) => {
  if (cuenta.saldo > 14000) return "bg-red-2"
  if (cuenta.saldo > 7500) return "bg-yellow-2"
  return "bg-grey-2"
}

const badgeColor = (cuenta: any) => (cuenta.saldo > 0 ? "orange" : "green")

const descripcion = (cuenta: any) => {
  return cuenta.tipoCuentaCobro === "CTA SOCIO"
    ? "Desarrollo y funcionamiento de la institución."
    : "Cuota destinada a la actividad que desarrolla."
}

const titulo = (cuenta: any) => cuenta.tipoCuentaCobro?.replace("CTA", "CUENTA -") || ""

const debe = (cuenta: any) => (cuenta.saldo > 0 ? "Pendiente" : "Pagado")

// Obtiene los movimientos al hacer clic
const toMovimientos = async (eID: any) => {
  try {
    await perfilStore.getMovimientosCuentasCobroPerfilJCET(eID)
    console.log('Movimientos obtenidos')
    router.push('/movimientos')
  } catch (error) {
    console.error('Error al obtener movimientos:', error)
  }
}
</script>


<style scoped>
.bg-red-2 {
  background-color: #ffebee;
}

.bg-yellow-2 {
  background-color: #fffde7;
}

.bg-grey-2 {
  background-color: #f5f5f5;
}
</style>
