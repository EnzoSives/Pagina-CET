<template>
  <div class="q-pa-md flex flex-center" style="padding-top: 100px;">
    <q-card class="full-width max-width-1100 shadow-2">
      <q-card-section class="bg-orange-10 text-white">
        <h4 class="q-mb-none">
         {{ perfilSeleccionado?.nombre }} - {{ cuentaSeleccionada?.tipoCuentaCobro }}
        </h4>
        <q-separator dark />
        <p class="q-mt-sm text-h6">
          <b>Saldo: $ {{ cuentaSeleccionada?.saldo }}</b>
        </p>
        <p class="q-mt-sm text-h6">
          <b>Saldo vencido: $ {{ cuentaSeleccionada?.saldoVencido }}</b>
        </p>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="q-mb-md" style="margin-top: 20px;">
          <q-btn
            v-if="cuentasCobros[0]?.saldo > 0"
            label="Pagar"
            color="primary"
            unelevated
            rounded
            class="q-mr-sm"
            @click="pagar"
          />
          <q-btn
            label="Volver"
            color="secondary"
            unelevated
            rounded
            @click="back"
          />
        </div>

        <!-- Tabla de movimientos -->
        <q-table
          flat
          bordered
          dense
          square
          title="Movimientos de Cuenta"
          :rows="movimientosCuentaCobro"
          :columns="columns"
          row-key="id"
          class="q-mt-md"
        >
          <template v-slot:body-cell-fechaMovimiento="props">
            <q-td :props="props">
              {{ props.row.fechaMovimiento.substring(0, 10) }}
            </q-td>
          </template>

          <template v-slot:body-cell-descripcion="props">
            <q-td :props="props">
              {{ props.row.descripcion.toUpperCase() }}
            </q-td>
          </template>

          <template v-slot:body-cell-monto="props">
            <q-td :props="props">
              <q-chip
                dense
                square
                :color="props.row.credito ? 'red' : 'green'"
                text-color="white"
                class="text-bold"
              >
                {{ props.row.credito ? `- $${props.row.monto}` : `$${props.row.monto}` }}
              </q-chip>
            </q-td>
          </template>

          <template v-slot:body-cell-saldoAFecha="props">
            <q-td :props="props">
              <b>$ {{ props.row.saldoAFecha }}</b>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePerfilStore } from 'src/stores/perfilesStore'

const router = useRouter()
const perfilStore = usePerfilStore()

const perfilSeleccionado = computed(() => perfilStore.perfiles[perfilStore.perfilIndex] || null)
const cuentasCobros = computed(() => perfilStore.cuentasCobros)
const movimientosCuentaCobro = computed(() => perfilStore.movimientosCuentasCobro)
const cuentaSeleccionada = computed(() => perfilStore.cuentaSeleccionada)

type Column = {
  name: string;
  label: string;
  field: string;
  align: 'left' | 'right' | 'center';
};

const columns: Column[] = [
  { name: 'fechaMovimiento', label: 'Fecha', field: 'fechaMovimiento', align: 'left' },
  { name: 'descripcion', label: 'Descripción', field: 'descripcion', align: 'left' },
  { name: 'monto', label: 'Monto', field: 'monto', align: 'right' },
  { name: 'saldoAFecha', label: 'Saldo', field: 'saldoAFecha', align: 'right' }
];

const back = () => router.replace('/homePerfil')

const pagar = () => {
  window.open(
    `https://miclub.cetpinamar.com.ar/external/pagarOnline.faces?cpe=${cuentasCobros.value[0]?.cPE}&monto=${cuentasCobros.value[0]?.saldo}`,
    '_blank'
  )
}
</script>

<style scoped>
.max-width-800 {
  max-width: 800px;
}

.text-bold {
  font-weight: bold;
}
</style>
