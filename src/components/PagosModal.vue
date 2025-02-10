<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">Gestión de Pagos</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-select v-model="categoriaSeleccionada" :options="categorias" label="Seleccionar categoría" dense outlined />
      </q-card-section>

      <q-card-section v-if="categoriaSeleccionada">
        <q-btn label="Débito Automático" color="green-5" class="full-width q-mb-sm" icon="credit_card"
          @click="pagar('debito')" />
        <q-btn label="Pago Deuda" color="red-5" class="full-width q-mb-sm" icon="money_off" @click="pagar('deuda')" />
        <q-btn label="Ver Movimientos" color="blue-5" class="full-width" icon="receipt" @click="verMovimientos" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cerrar" color="grey-7" flat @click="cerrarModal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue';

const isOpen = ref(false);
const categoriaSeleccionada = ref(null);
const categorias = ['Femenino', 'Masculino'];

const abrirModal = () => {
  isOpen.value = true;
};

const cerrarModal = () => {
  isOpen.value = false;
  categoriaSeleccionada.value = null;
};

const pagar = (tipo: string) => {
  alert(`Realizando pago: ${tipo} para ${categoriaSeleccionada.value}`);
};

const verMovimientos = () => {
  alert(`Mostrando movimientos para ${categoriaSeleccionada.value}`);
};

defineExpose({ abrirModal });
</script>
