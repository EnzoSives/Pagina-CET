<template>
  <div class="q-pa-md" style="min-height: 100vh; padding-top: 100px">
    <!-- Portada -->
    <div class="portada-container">
      <q-img :src="getDeporteImage(deporte)" class="portada-img">
        <div class="portada-overlay">
          <h1 class="text-h3 text-weight-bold text-white">{{ deporte }}</h1>
        </div>
      </q-img>
    </div>

    <!-- Contenido principal -->
    <div class="row q-col-gutter-xl q-mt-lg">
      <!-- Información -->
      <div class="col-12 col-md-8">
        <q-card class="shadow-2 q-pa-sm">
          <q-card-section>
            <div class="text-h6 text-primary">Información</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <p class="text-body1 text-grey-8" v-html="deporteDescripcion" />
          </q-card-section>
        </q-card>
      </div>

      <!-- Acciones -->
      <div class="col-12 col-md-4">
        <q-card class="shadow-2 q-pa-sm">
          <q-card-section class="text-h6 text-primary"> Acciones </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-none">
            <!-- ALTA / BAJA -->
            <q-expansion-item icon="person" label="Inscripciones" default-opened>
              <div class="q-pa-sm">
                <q-btn
                  label="Formulario de Alta"
                  icon="person_add"
                  class="full-width q-mb-sm"
                  color="positive"
                  rounded
                  no-caps
                  unelevated
                  @click="irAlFormularioAlta"
                />
                <q-btn
                  label="Formulario de Baja"
                  icon="person_remove"
                  class="full-width"
                  color="negative"
                  rounded
                  no-caps
                  unelevated
                  @click="irAlFormularioBaja"
                />
              </div>
            </q-expansion-item>

            <!-- PAGOS -->
            <q-expansion-item icon="paid" label="Pagos">
              <div class="q-pa-sm">
                <q-btn
                  label="Pagar"
                  icon="paid"
                  class="full-width q-mb-sm"
                  color="primary"
                  rounded
                  no-caps
                  unelevated
                  @click="goTo('https://miclub.cetpinamar.com.ar/#/pagar')"
                />
                <q-btn
                  label="Ver movimientos"
                  icon="receipt"
                  class="full-width"
                  color="teal-5"
                  rounded
                  no-caps
                  unelevated
                  @click="movimientos"
                />
              </div>
            </q-expansion-item>

            <!-- EXTRAS CICLISMO -->
            <q-expansion-item
              v-if="props.deporte === 'Ciclismo'"
              icon="directions_bike"
              label="Extras de Ciclismo"
            >
              <div class="q-pa-sm">
                <q-btn
                  label="Pase Bike Park Diario CET"
                  icon="directions_bike"
                  class="full-width q-mb-sm"
                  color="orange-5"
                  rounded
                  no-caps
                  unelevated
                  @click="
                    goTo(
                      'https://www.mercadopago.com.ar/checkout/v1/payment/redirect/?source=link&preference-id=251794130-0dc1b341-680a-4bd4-becd-c9e70c805917',
                    )
                  "
                />
                <q-btn
                  label="Alquiler Bicicleta Hora CET"
                  icon="pedal_bike"
                  class="full-width"
                  color="purple-4"
                  rounded
                  no-caps
                  unelevated
                  @click="
                    goTo(
                      'https://www.mercadopago.com.ar/checkout/v1/payment/redirect/?source=link&preference-id=251794130-a173d1aa-9683-4be0-9d94-82e73a294da5',
                    )
                  "
                />
              </div>
            </q-expansion-item>
          </q-card-section>
        </q-card>

        <!-- Calendario -->
        <div class="q-mt-md">
          <CalendarioDeporte :deporte="deporte" />
        </div>
      </div>
    </div>

    <!-- Modal de pagos -->
    <PagosModal ref="pagoModalRef" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import PagosModal from 'components/PagosModal.vue'
import CalendarioDeporte from 'components/CalendarioDeporte.vue'

const props = defineProps<{ deporte: string }>()
const router = useRouter()
const pagoModalRef = ref()
const deporteDescripcion = ref('')
const base = process.env.BASE_URL || '/'

const cargarDescripcion = async (deporte: string) => {
  try {
    const response = await fetch('/deportes.json')
    const data = await response.json()
    deporteDescripcion.value = data[deporte] || 'Información no disponible.'
  } catch (error) {
    console.error('Error al cargar la descripción:', error)
  }
}

onMounted(() => {
  cargarDescripcion(props.deporte)
})

watch(
  () => props.deporte,
  (nuevo) => {
    cargarDescripcion(nuevo)
  },
)

const deporteImages: Record<string, string> = {
  // Futbol: 'https://i.pinimg.com/736x/fa/08/06/fa0806d7db438581687ed0fa6c7ef7f4.jpg',
  Patin:
    '/imgs/Patin.jpeg',
  Hockey: '/imgs/hockey.png',
  Ciclismo:
    // 'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    '/imgs/ciclismo.jpg',
  Running:
    'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Arqueria:
    `${base}imgs/Arqueria4.JPG`,
}

const getDeporteImage = (deporte: string): string => {
  return deporteImages[deporte] || '/images/deportes/default.png'
}

const irAlFormularioAlta = () => {
  router.push({ name: 'formulario-alta' })
}

const irAlFormularioBaja = () => {
  router.push({ name: 'formulario-baja' })
}

const movimientos = () => {
  router.push({ name: 'HomePerfil' })
}

const goTo = (url: string) => {
  window.open(url, '_blank')
}
</script>

<style scoped>
.portada-container {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 12px;
}

.portada-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.portada-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  padding: 20px;
}
</style>
