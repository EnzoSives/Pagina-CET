<template>
  <q-item clickable @click="toMovimientos" :key="id" :class="nameClass" style="width: 100%;">
    <q-item-section>
      <q-item-label class="text-bold">{{ titulo }}</q-item-label>
      <q-item-label caption>
        <q-icon name="event" /> {{ descripcion }}
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-badge :color="badgeColor" text-color="black" :label="debe" />
      <div class="text-h6">$ {{ saldo }}</div>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePerfilStore } from 'src/stores/perfilesStore'

// Definir las propiedades con tipos más estrictos
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

const router = useRouter()
const perfilStore = usePerfilStore()

const nameClass = computed(() => {
  if (props.saldo > 14000) return "bg-red-2"
  if (props.saldo > 7500) return "bg-yellow-2"
  return "bg-grey-2"
})

const badgeColor = computed(() => (props.saldo > 0 ? "orange" : "green"))

const descripcion = computed(() => {
  return props.tipoCuentaCobro === "CTA SOCIO"
    ? "Desarrollo y funcionamiento de la institución."
    : "Cuota destinada a la actividad que desarrolla."
})

const titulo = computed(() => props.tipoCuentaCobro.replace("CTA", "CUENTA -"))

const debe = computed(() => (props.saldo > 0 ? "Pendiente" : "Pagado"))

const toMovimientos = async () => {
  try {
    await perfilStore.getMovimientosCuentasCobroPerfilJCET(props.eID)
    console.log('Movimientos obtenidos')
    router.push('/movimientos')
  } catch (error) {
    console.error('Error al obtener movimientos:', error)
    // Considera notificar al usuario sobre el error aquí
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
