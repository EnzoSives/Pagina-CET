<template>
  <!-- Mostrar las cuentas de cobro disponibles -->
  <q-item v-for="(cuenta, index) in cuentasCobro" :key="index" clickable @click="toMovimientos(cuenta.eID, cuenta)"
    class="account-row" :class="nameClass(cuenta)">
    <q-item-section>
      <q-item-label class="account-row__title">{{ titulo(cuenta) }}</q-item-label>
      <q-item-label caption class="account-row__description">
        <q-icon name="event" /> {{ descripcion(cuenta) }}
      </q-item-label>
    </q-item-section>
    <q-item-section side class="account-row__side">
      <q-badge :color="badgeColor(cuenta)" text-color="white" :label="debe(cuenta)" class="account-row__badge" />
      <div class="account-row__amount">$ {{ saldoVisible(cuenta) }}</div>
    </q-item-section>
  </q-item>

  <!-- Si no hay cuentas, mostrar un mensaje indicándolo -->
  <q-item v-if="cuentasCobro.length === 0" class="account-row account-row--empty">
    <q-item-section>
      <q-item-label class="account-row__title">No hay cuenta de cobro disponible</q-item-label>
      <q-item-label caption class="account-row__description">Cuando tengas cuentas asociadas, van a aparecer acá.</q-item-label>
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
  if (cuenta.saldo > 14000) return 'account-row--danger'
  if (cuenta.saldo > 7500) return 'account-row--warning'
  return 'account-row--ok'
}

const badgeColor = (cuenta: any) => (cuenta.saldo > 0 ? 'orange' : 'green')

const descripcion = (cuenta: any) => {
  return cuenta.tipoCuentaCobro === 'CTA SOCIO'
    ? 'Desarrollo y funcionamiento de la institución.'
    : 'Cuota destinada a la actividad que desarrolla.'
}

const titulo = (cuenta: any) => cuenta.tipoCuentaCobro?.replace('CTA', 'CUENTA -') || ''

const debe = (cuenta: any) => (cuenta.saldo > 0 ? 'Pendiente' : 'Pagado')

const saldoVisible = (cuenta: any) => {
  const saldo = Number(cuenta.saldo) || 0
  return saldo > 0 ? saldo : 0
}

// Obtiene los movimientos al hacer clic
const toMovimientos = async (eID: any, cuenta:any) => {
  try {
    perfilStore.setCuentaSeleccionada(cuenta)
    await perfilStore.getMovimientosCuentasCobroPerfilJCET(eID)
    console.log('Movimientos obtenidos')
    router.push('/movimientos')
  } catch (error) {
    console.error('Error al obtener movimientos:', error)
  }
}
</script>


<style scoped>
.account-row {
  width: 100%;
  min-height: 78px;
  margin: 0;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.account-row:last-child {
  border-bottom: 0;
}

.account-row:hover {
  background: var(--color-primary-soft);
}

.account-row__title {
  color: var(--color-text);
  font-weight: 800;
}

.account-row__description {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 7px;
  color: var(--color-text-soft);
  line-height: 1.35;
}

.account-row__side {
  align-items: flex-end;
  gap: 7px;
}

.account-row__badge {
  border-radius: 999px;
  font-weight: 800;
}

.account-row__amount {
  color: var(--color-text);
  font-size: 1.18rem;
  font-weight: 800;
  line-height: 1;
}

.account-row--danger {
  box-shadow: inset 3px 0 0 #ef4444;
}

.account-row--warning {
  box-shadow: inset 3px 0 0 #f59e0b;
}

.account-row--ok {
  box-shadow: inset 3px 0 0 #22c55e;
}

.account-row--empty {
  box-shadow: none;
}

@media (max-width: 600px) {
  .account-row {
    align-items: flex-start;
    min-height: 0;
    padding: 16px 14px;
  }

  .account-row__side {
    align-items: flex-start;
    margin-top: 10px;
  }
}
</style>
