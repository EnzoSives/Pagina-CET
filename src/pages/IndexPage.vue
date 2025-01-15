<template>
  <q-page>
    <!-- Encabezado flotante sobre el contenedor hero-section -->
    <q-banner v-if="!isScrolled" elevated class="bg-indigo-12 text-white"
      style="margin: 20px; position: fixed; top: 0; left: 0; right: 0; z-index: 10; border-radius: 20px;">
      <q-toolbar>
        <q-avatar>
          <img src="src/assets/logoCET.png" alt="logo">
        </q-avatar>
        <q-toolbar-title> Vivi el club!</q-toolbar-title>

        <q-tabs v-model="tab">
          <q-tab name="images" label="Images" />
          <q-tab name="videos" label="Videos" />
          <q-tab name="articles" label="Articles" />
        </q-tabs>
      </q-toolbar>
    </q-banner>

    <!-- Sección Hero con imagen de fondo -->
    <div class="hero-section"
      :style="{ backgroundImage: 'url(https://cetpinamar.com.ar/images/demo/backgrounds/03.png)' }">
      <div class="content">
        <h2>CET</h2>
        <p>Club empleados Telpin</p>
        <div>
          <q-btn style="margin-right: 10px;" label="Iniciar sesion" color="primary"></q-btn>
          <q-btn style="margin-right: 10px;" label="Ser socio" color="primary"></q-btn>
          <q-btn label="Beneficios" color="primary"></q-btn>
        </div>
      </div>
    </div>

    <q-tabs>
      <q-tab name="main" label="Main" />
      <q-tab name="about" label="About Us" />
      <q-tab name="tours" label="Tours" />
    </q-tabs>

    <CardsDeportes></CardsDeportes>
  </q-page>
</template>

<script setup lang="ts">
import CardsDeportes from 'components/CardsDeportes.vue';
import { ref, onMounted, onUnmounted } from 'vue';

const tab = ref('images');
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100; // Cambia el valor según el punto de scroll deseado
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Hero section */
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: bottom;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0;
  padding: 0;
  z-index: 1;
}

/* Contenido dentro del hero-section */
.content {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  text-align: left;
  padding-left: 40px;
  font-family: Montserrat, Helvetica Neue, Arial, sans-serif;
  text-transform: uppercase;
  line-height: 1.15;
}
</style>
