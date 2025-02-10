<template>
  <div class="q-pa-md" style="background-color: rgb(241,240,249);height: 100vh;">
    <!-- Encabezado con imagen del deporte -->
    <div class="text-center q-mb-xl" style="margin-top: 80px;">
      <q-avatar size="140px">
        <img :src="getDeporteImage(deporte)" :alt="`Ícono de ${deporte}`" class="rounded-borders">
      </q-avatar>
      <h1 class="text-h3 q-mt-md text-weight-bold text-primary">{{ deporte }}</h1>
      <p class="text-subtitle1 text-grey-7">Gestiona tu participación en {{ deporte }}</p>
    </div>

    <!-- Contenedor de tarjetas en columnas -->
    <div class="row q-col-gutter-lg">
      <!-- Formulario de Alta -->
      <div class="col-12 col-md-4">
        <q-card class="full-height">
          <q-card-section>
            <div class="text-h6">Formulario de Alta</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-btn label="Ir al Formulario de Alta" color="green-5" class="full-width" icon="person_add"
              @click="irAlFormularioAlta" />
          </q-card-section>
        </q-card>
      </div>

      <!-- Sección de Pagos -->
      <div class="col-12 col-md-4">
        <q-card class="full-height">
          <q-card-section>
            <div class="text-h6">Gestión de Pagos</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="row q-col-gutter-sm">
              <div class="col-12 col-sm-6">
                <q-btn label="Pagar Femenino" color="pink-5" class="full-width" @click="abrirPagoModal" icon="paid" />
              </div>

              <div class="col-12 col-sm-6">
                <q-btn label="Pagar Masculino" color="blue-5" class="full-width" @click="abrirPagoModal" icon="paid" />
              </div>
              <div class="col-12">
                <q-btn label="Pagar Deuda Anterior" color="red-5" class="full-width q-mt-sm" @click="pagarDeuda"
                  icon="money_off" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Formulario de Baja -->
      <div class="col-12 col-md-4">
        <q-card class="full-height">
          <q-card-section>
            <div class="text-h6">Formulario de Baja</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-btn label="Ir al Formulario de Baja" color="red-5" class="full-width" icon="person_remove"
              @click="irAlFormularioBaja" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Modal de Pagos -->
    <PagosModal ref="pagoModalRef" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { useRouter } from 'vue-router';
import PagosModal from 'components/PagosModal.vue';

defineProps<{ deporte: string }>();

const router = useRouter();

const pagoModalRef = ref();

const abrirPagoModal = () => {
  pagoModalRef.value.abrirModal();
};

const deporteImages: Record<string, string> = {
  Futbol: '/images/deportes/futbol.png',
  Patin: '/images/deportes/patin.png',
  Hockey: '/images/deportes/hockey.png',
};

const getDeporteImage = (deporte: string): string => {
  return deporteImages[deporte] || '/images/deportes/default.png';
};

const irAlFormularioAlta = () => {
  router.push({ name: 'formulario-alta' });
};

const irAlFormularioBaja = () => {
  router.push({ name: 'formulario-baja' });
};

// const pagar = (categoria: string) => {
//   router.push({
//     name: 'pagos',
//     query: {
//       deporte: router.currentRoute.value.params.deporte,
//       categoria
//     }
//   });
// };

const pagarDeuda = () => {
  alert('Aquí se generaría el pago de la deuda.');
};
</script>

<style scoped>
.rounded-borders {
  border-radius: 20px;
}
</style>
