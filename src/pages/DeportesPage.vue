<template>
  <div class="q-pa-md bg-light-blue-1" style="min-height: 100vh; padding-top: 100px;">
    <!-- Encabezado con imagen del deporte como portada -->
    <div class="portada-container">
      <q-img :src="getDeporteImage(deporte)" class="portada-img">
        <div class="portada-overlay">
          <h1 class="text-h3 text-weight-bold text-white">{{ deporte }}</h1>
        </div>
      </q-img>
    </div>

    <!-- Contenedor de tarjetas en columnas -->
    <div class="row q-col-gutter-lg q-mt-md">
      <div class="col-12 col-md-9">
        <q-card class="full-height shadow-2">
          <q-card-section>
            <div class="text-h6 text-primary">Info del Deporte</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
  <p class="text-body1 text-grey-8" v-html="deporteDescripcion"></p>
</q-card-section>

        </q-card>
      </div>

      <div class="col-12 col-md-3">
        <q-card class="shadow-2">
          <q-card-section>
            <div class="text-h6 text-primary">Formulario de Alta</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-btn label="Ir al Formulario" color="green-5" class="full-width" icon="person_add"
              @click="irAlFormularioAlta" />
          </q-card-section>
          <q-card-section>
            <div class="text-h6 text-primary">Formulario de Baja</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-btn label="Ir al Formulario" color="red-5" class="full-width" icon="person_remove"
              @click="irAlFormularioBaja" />
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <div class="text-h6 text-primary">Gestión de Pagos</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="row q-col-gutter-sm">
              <!-- <div class="col-12 col-sm-6">
                <q-btn label="Pagar Femenino" color="pink-5" class="full-width" @click="abrirPagoModal" icon="paid" />
              </div> -->
              <div class="col-12">
                <q-btn label="Pagar" color="blue-5" class="full-width" @click="abrirPagoModal" icon="paid" />
              </div>
              <div class="col-12">
                <q-btn label="Pagar Deuda" color="red-5" class="full-width q-mt-sm" @click="pagarDeuda"
                  icon="money_off" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Modal de Pagos -->
    <PagosModal ref="pagoModalRef" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted,watch } from 'vue';
import { useRouter } from 'vue-router';
import PagosModal from 'components/PagosModal.vue';

const props = defineProps<{ deporte: string }>();

const router = useRouter();
const pagoModalRef = ref();

const abrirPagoModal = () => {
  pagoModalRef.value.abrirModal();
};
const deporteDescripcion = ref('');

const cargarDescripcion = async (deporte: string) => {
  try {
    const response = await fetch('src/assets/deportes.json'); // Ruta correcta del JSON
    const data = await response.json();
    deporteDescripcion.value = data[deporte] || 'Información no disponible.';
  } catch (error) {
    console.error('Error al cargar la descripción:', error);
  }
};

onMounted(() => {
  cargarDescripcion(props.deporte);
});

// Si `deporte` cambia después de que el componente se haya montado
watch(() => props.deporte, (newDeporte) => {
  cargarDescripcion(newDeporte);
});
const deporteImages: Record<string, string> = {
  Futbol: 'https://i.pinimg.com/736x/fa/08/06/fa0806d7db438581687ed0fa6c7ef7f4.jpg',
  Patin: 'https://i.pinimg.com/736x/37/c3/be/37c3be6b3263c6f0ef94a39bfe13e21e.jpg',
  Hockey: 'https://i.pinimg.com/736x/87/03/89/870389975b04170d5f3a2f775e49698f.jpg',
  Ciclismo: 'https://i.pinimg.com/736x/d9/61/f9/d961f9695e87098084205cf45f8d596a.jpg',
};

// const deporteDescripciones: Record<string, string> = {
//   Futbol: 'El fútbol es un deporte de equipo que se juega con un balón en un campo rectangular con dos arcos...',
//   Patin: 'El patinaje es un deporte que combina habilidad y equilibrio sobre ruedas, con competencias de velocidad y estilo.',
//   Hockey: 'El hockey es un deporte dinámico que se juega en equipos con sticks y un disco o pelota.',
// };

const getDeporteImage = (deporte: string): string => {
  return deporteImages[deporte] || '/images/deportes/default.png';
};

// const getDeporteDescripcion = (deporte: string): string => {
//   return deporteDescripciones[deporte] || 'Información no disponible.';
// };

const irAlFormularioAlta = () => {
  router.push({ name: 'formulario-alta' });
};

const irAlFormularioBaja = () => {
  router.push({ name: 'formulario-baja' });
};

const pagarDeuda = () => {
  alert('Aquí se generaría el pago de la deuda.');
};
</script>

<style scoped>
.bg-light-blue-1 {
  background-color: #E3F2FD;
}

.portada-container {
  position: relative;
  width: 100%;
  height: 200px;
  /* Altura de la portada */
}

.portada-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.portada-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70%;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  padding: 20px 0;
  border-radius: 0 0 10px 10px;
}
</style>
