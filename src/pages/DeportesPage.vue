<template>
  <div class="q-pa-md" style="min-height: 100vh; padding-top: 100px;">
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
            <div class="text-h6 text-primary">Informacion</div>
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
    <div class="col-12">
      <q-btn label="Pagar" color="blue-5" class="full-width" @click="goTo('https://miclub.cetpinamar.com.ar/#/pagar')" icon="paid" />
    </div>
    <div class="col-12">
      <q-btn label="Ver movimientos" color="green" class="full-width q-mt-sm" @click="movimientos" icon="receipt" />
    </div>

    <!-- Botones adicionales solo para Ciclismo -->
    <template v-if="props.deporte === 'Ciclismo'">
      <div class="col-12">
        <q-btn label="Pase Bike Park Diario CET" color="orange-5" class="full-width q-mt-sm" @click="goTo('https://www.mercadopago.com.ar/checkout/v1/payment/redirect/?source=link&preference-id=251794130-0dc1b341-680a-4bd4-becd-c9e70c805917&router-request-id=3b390056-de85-4fd7-9ff3-339fbc15fb3f')" icon="directions_bike" />
      </div>
      <div class="col-12">
        <q-btn label="Alquiler Bicicleta Hora CET" color="purple-5" class="full-width q-mt-sm" @click="goTo('https://www.mercadopago.com.ar/checkout/v1/payment/redirect/?source=link&preference-id=251794130-a173d1aa-9683-4be0-9d94-82e73a294da5&router-request-id=89c76a51-347b-4d82-88b0-f894e83f9d14')" icon="pedal_bike" />
      </div>
    </template>
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

// const abrirPagoModal = () => {
//   pagoModalRef.value.abrirModal();
// };
const deporteDescripcion = ref('');

const cargarDescripcion = async (deporte: string) => {
  try {
    const response = await fetch('/deportes.json'); // Ruta correcta del JSON
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
  // Futbol: 'https://i.pinimg.com/736x/fa/08/06/fa0806d7db438581687ed0fa6c7ef7f4.jpg',
  Patin: 'https://images.unsplash.com/photo-1735674055107-e9342d0145df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Hockey: 'https://plus.unsplash.com/premium_photo-1719318342820-42be983c5a37?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Ciclismo: 'https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Running: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Arqueria: 'https://plus.unsplash.com/premium_photo-1718315735016-13eca85e2036?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
const movimientos = () => {
  router.push({ name: 'HomePerfil' });
};

const goTo = (url: string) => {
  window.open(url, '_blank');
};

// const pagarDeuda = () => {
//   alert('Aquí se generaría el pago de la deuda.');
// };
</script>

<style scoped>
.bg-light-blue-1 {
  background-color:rgb(255, 255, 255);
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
