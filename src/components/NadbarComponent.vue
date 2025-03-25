<template>
  <!-- Encabezado flotante sobre el contenedor hero-section -->
  <q-banner v-if="!isScrolled && !isMobile" elevated class="text-black"
    style="margin: 20px; position: fixed; top: 0; left: 0; right: 0; z-index: 10; border-radius: 20px; background-color: rgb(26, 26, 29);">
    <q-toolbar>
      <q-avatar>
        <img src="src/assets/logoCET.png" alt="logo">
      </q-avatar>
      <q-toolbar-title class="custom-font text-white"> VIVI EL CLUB!</q-toolbar-title>
      <q-btn label="Inicio" color="white" flat class="hover-orange" @click="goToHome()"></q-btn>
      <q-btn label="Socio" color="white" flat class="hover-orange" @click="goToSocio()"></q-btn>
      <q-btn-dropdown label="Deportes" color="white" flat class="hover-orange">
        <q-list>
          <q-item clickable v-ripple @click="goToDeporte('Futbol')">
            <q-item-section>Futbol</q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="goToDeporte('Patin')">
            <q-item-section>Patin</q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="goToDeporte('Hockey')">
            <q-item-section>Hockey</q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="goToDeporte('Ciclismo')">
            <q-item-section>Ciclismo</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn label="Institucional" color="white" flat class="hover-orange" @click="goToIsti()"></q-btn>
      <q-btn label="Tienda" color="white" flat class="hover-orange" @click="goToTienda()"></q-btn>
      <q-btn label="?Faq" color="white" flat class="hover-orange" @click="showFaq = true"></q-btn>
      <q-btn label="App CET" color="white" flat class="hover-orange" @click="goToApp()"></q-btn>
    </q-toolbar>
  </q-banner>

  <!-- Modal para mostrar el PDF -->
  <q-dialog v-model="showFaq" persistent >
    <q-card class="q-dialog-plugin">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Preguntas Frecuentes(FAQ)</div>
        <q-space />
        <q-btn icon="close" flat round v-close-popup style="bottom: 5px" />
      </q-card-section>
      <q-card-section class="q-pa-none">
        <iframe src="src/assets/faq.pdf" width="100%" height="500px"></iframe>
      </q-card-section>
      <!-- <q-card-actions align="right">
        <q-btn flat label="Cerrar" color="primary" v-close-popup />
      </q-card-actions> -->
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showFaq = ref(false);

const goToDeporte = (deporte: string) => {
  router.push({ name: 'DeportePage', params: { deporte } });
};
const goToHome = () => {
  router.push({ path: '/' });
};
const goToSocio = () => {
  router.push({ path: '/socio' });
};
const goToIsti = () => {
  router.push({ path: '/institucional' });
};
const goToApp = () => {
  // router.push({ path: '/appcet' });
  router.push({ path: '/homePerfil' });
};
const goToTienda = () => {
  window.location.href = 'https://cetpinamar.mercadoshops.com.ar/';
};

const isScrolled = ref(false);
const isMobile = ref(false);

const handleResize = () => {
  isMobile.value = window.innerWidth <= 600;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Aldrich&family=Cherry+Cream+Soda&family=Oswald:wght@200..700&family=Roboto&family=Roboto+Slab:wght@100..900&display=swap');

.q-dialog-plugin {
  width: 80%;
  max-width: 1500px;
}

.hover-orange {
  font-family: Aldrich, serif;
}

.hover-orange:hover {
  color: orange;
}

.custom-font {
  font-family: "Aldrich", serif;
  font-weight: 450;
  /* Cambiado a 700 para letras más gruesas */
  font-size: 1.2rem;
}
</style>
