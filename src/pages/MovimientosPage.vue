<template>
  <div style="padding-top: 150px;">
    <!-- Banner con información del usuario -->
    <q-banner class="bg-green text-white">
      <h4 class="q-mb-none">Movimientos de {{ perfilSeleccionado?.nombre }} - {{ perfilSeleccionado?.tipoCuentaCobro }}
      </h4>
      <q-separator />
      <p class="q-mt-sm">
        <b>Listado de movimientos. Saldo: $ {{ saldo }}.-</b>
      </p>
      <div>
        <q-btn v-if="saldo > 0" label="Pagar" color="secondary" class="q-mr-sm" @click="pagar" />
        <q-btn label="Volver" color="secondary" @click="back" />
      </div>
    </q-banner>

    <!-- Tabla de movimientos -->
    <q-table flat bordered title="Movimientos de Cuenta" :rows="movimientosCuentaCobro" :columns="columns" row-key="id"
      class="q-mt-md">
      <template v-slot:body-cell-fechaMovimiento="props">
        <q-td :props="props">
          {{ props.row.fechaMovimiento.substring(0, 12) }}
        </q-td>
      </template>

      <template v-slot:body-cell-descripcion="props">
        <q-td :props="props">
          {{ props.row.descripcion.toUpperCase() }}
        </q-td>
      </template>

      <template v-slot:body-cell-monto="props">
        <q-td :props="props" :class="{ 'text-negative': props.row.credito, 'text-positive': !props.row.credito }">
          {{ props.row.credito ? `- ${props.row.monto}` : props.row.monto }}
        </q-td>
      </template>

      <template v-slot:body-cell-saldoAFecha="props">
        <q-td :props="props">
          {{ props.row.saldoAFecha }}
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePerfilStore } from 'src/stores/perfilesStore'

const router = useRouter()
const perfilStore = usePerfilStore()

// Computed para acceder a los datos del store
const perfilSeleccionado = computed(() => perfilStore.perfiles[perfilStore.perfilIndex] || null)
const movimientosCuentaCobro = computed(() => perfilStore.movimientosCuentasCobro)
const tipoCuentaCobro = computed(() => perfilStore.tipoCuentaCobro || 'Desconocido')
const saldo = computed(() => perfilStore.saldo || 0)

// Columnas de la tabla
const columns = [
  { name: 'fechaMovimiento', label: 'Fecha', field: 'fechaMovimiento', align: 'left' },
  { name: 'descripcion', label: 'Descripción', field: 'descripcion', align: 'left' },
  { name: 'monto', label: 'Monto', field: 'monto', align: 'right' },
  { name: 'saldoAFecha', label: 'Saldo', field: 'saldoAFecha', align: 'right' }
]

// Métodos
const back = () => router.replace('/inicio')

const pagar = () => {
  window.open(
    `https://miclub.cetpinamar.com.ar/external/pagarOnline.faces?cpe=&monto=${saldo.value}`,
    '_blank'
  )
}

// Cargar los movimientos al montar el componente
// onMounted(() => {
//   console.log('Movimientos.vue - montado')
//   perfilStore.getMovimientosCuentasCobroPerfilJCET(perfilStore.perfilIndex)
// })
</script>

<style scoped>
.q-table {
  background: white;
}

.text-negative {
  color: red;
}

.text-positive {
  color: green;
}
</style>
