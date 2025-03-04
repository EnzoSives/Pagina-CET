<template>
  <div class="cuentacobro">
    <a href="#" :key="id" :class="nameClass" aria-current="true">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{ titulo }}</h5>
        <small>{{ debe }}</small>
      </div>
      <div class="d-flex w-100 justify-content-between">
        <p class="d-flex w-60 mb-1">{{ descripcion }}</p>
        <p class="d-flex w-40 text-center">$ {{ saldo }}</p>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePerfilStore } from 'src/stores/perfilesStore' // Asegúrate de que la ruta sea correcta

// Definir las propiedades con tipos
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  eID: {
    type: String,
    required: true
  },
  tipoCuentaCobro: {
    type: String,
    required: true
  },
  saldo: {
    type: Number,
    required: true
  },
  cpe: {
    type: String,
    required: true
  }
})

// Acceder al store de Pinia
const perfilStore = usePerfilStore()

// Computed para la clase del item dependiendo del saldo
const nameClass = computed(() => {
  if (props.saldo > 14000) {
    return "list-group-item list-group-item-action list-group-item-danger justify-content-between align-items-center"
  } else if (props.saldo > 7500) {
    return "list-group-item list-group-item-action list-group-item-warning justify-content-between align-items-center"
  } else {
    return "list-group-item list-group-item-action list-group-item-secondary justify-content-between align-items-center"
  }
})

// Computed para la descripción dependiendo del tipo de cuenta
const descripcion = computed(() => {
  return props.tipoCuentaCobro === "CTA SOCIO"
    ? "Desarrollo y funcionamiento de la institución."
    : "Cuota destinada a la actividad que desarrolla."
})

// Computed para el título
const titulo = computed(() => {
  return props.tipoCuentaCobro.replace("CTA", "CUENTA -")
})

// Computed para mostrar si se debe o no
const debe = computed(() => {
  return props.saldo > 0 ? "Debe" : "No Debe"
})

// // Método para navegar a los movimientos y actualizar el store
// const toMovimientos = async () => {
//   try {
//     await perfilStore.getCuentasCobroPerfilJCETAction(perfilStore.getPerfil.id)
//     // Redirigir a la página de movimientos u otra acción
//   } catch (error) {
//     console.error('Error al obtener cuentas de cobro:', error)
//   }
// }
</script>
