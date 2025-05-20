<template>
  <q-page class="bg-grey-2">
    <!-- Sección Hero con imagen de fondo -->
    <div class="hero-section"
      :style="{ backgroundImage: 'url(/imgs/imagen-cet.png)' }">
      <div class="content">
        <div>
          <h2 class="text-content-cet">PINAMAR-CET</h2>
          <p class="text-content">Club empleados Telpin</p>
        </div>
        <div class="button-wrapper">
            <q-btn class="mobile-button" label="Iniciar sesión" color="primary"  @click="goToLogin()"
            icon-right="login"></q-btn>
          <q-btn class="mobile-button" label="Ser socio" color="primary" 
            :href="'https://docs.google.com/forms/d/e/1FAIpQLSd8c8tQjiLs01-gDbRoET4kdYYyxzAhbO-BI8vqkOrolAMENg/viewform'"
            target="_blank" icon-right="person_add"></q-btn>
          <q-btn class="mobile-button" label="Beneficios" color="primary"  @click="goToBeneficios()"
            icon-right="star"></q-btn>
          <q-btn class="mobile-button" label="Calendarios" color="primary"  @click="goToCalendario"
            icon-right="event" />

        </div>
      </div>
    </div>

    <div class="text-h4 text-weight-bolder gradient-text text-center q-mt-lg"
      style="margin-top: 50px; margin-bottom: 30px;">
      Nuestras Actividades Principales
    </div>
    <DeportesComponent></DeportesComponent>

    <div class="galeriaContent">
      <div class="text-h4 text-weight-bolder gradient-text text-center q-mt-lg"
        style="margin-bottom: 70px; margin-top: 50px">
        Nuestro Espacio
      </div>

      <!-- Galería Grid para pantallas grandes -->
      <div v-if="!isMobile" class="gallery-grid">
        <img v-for="(image, index) in images" :key="`grid-${index}`" :src="image"
          :class="['gallery-item', `item-${index + 1}`]" />
      </div>

      <!-- Swiper Carousel mejorado para móviles -->
      <div v-else class="mobile-gallery-container">
        <swiper :modules="[Pagination, Navigation]" :slides-per-view="1" :space-between="20"
          :pagination="{ clickable: true }" :navigation="true" class="mobile-swiper">
          <swiper-slide v-for="(image, index) in images" :key="index" class="mobile-swiper-slide">
            <img :src="image" class="carousel-image" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import DeportesComponent from 'components/DeportesComponent.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const router = useRouter()

// Estado para saber si estamos en modo móvil
const isMobile = ref(false)

const base = process.env.BASE_URL || '/'

// Función para verificar si estamos en modo móvil
const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= 768 // Considerar móvil si la pantalla es de 768px o menor
}

// Función para manejar el redimensionamiento de la ventana
const handleResize = () => {
  checkIfMobile()
}

// Verificar el tamaño de la pantalla al montar el componente
onMounted(() => {
  checkIfMobile()
  // Agregar listener para detectar cambios en el tamaño de la ventana
  window.addEventListener('resize', handleResize)
})

// Limpiar el listener cuando el componente se desmonta
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

const images = ref([
  `${base}imgs/cancha-aerea-1.png`,
  `${base}imgs/cancha-aerea-2.png`,
  `${base}imgs/DJI_0019.JPG`,
  `${base}imgs/Arqueria2.jpeg`,
  `${base}imgs/DJI_0019.JPG`,
])

const goToLogin = () => {
  router.push({ path: '/homePerfil' })
}
const goToBeneficios = () => {
  router.push({ path: '/beneficios' })
}
const goToCalendario = () => {
  router.push({ path: '/calendarios' })
}
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
  align-items: start;
  justify-content: start;
  color: white;
  margin: 0;
  padding: 0;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.15); /* Subtle dark overlay */
  z-index: 0; /* Behind the content */
}

.content {
  position: relative; /* Changed from absolute for z-index stacking */
  z-index: 1; /* Above the overlay */
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  text-align: left;
  padding-left: 40px;
  font-family:
    Aldrich,
    Helvetica Neue,
    Arial,
    sans-serif;
  text-transform: uppercase;
  line-height: 1.15;
}

/* Galería de imágenes más ancha */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* 4 columnas para mayor ancho */
  grid-template-rows: repeat(3, 250px);
  gap: 12px;
  padding: 20px;
  max-width: 1400px;
  /* Galería más ancha */
  margin: auto;
  margin-top: 0;
}

.gallery-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.text-content-cet {
  font-family: 'Aldrich', serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
  font-size: 5.5rem;
}

.text-content {
  font-family: 'Aldrich', serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-size: 1.5rem;
}

.gradient-text {
  color: #1976D2; /* $primary */
  /* text-align: center; is already applied via class 'text-center' */
  /* font-weight: bolder; is already applied via class 'text-weight-bolder' */
  /* font-family: 'Aldrich' should be inherited from global H4 styles */
}

/* Ajuste de imágenes más grandes */
.item-1 {
  grid-column: span 2;
}

.item-3 {
  grid-row: span 2;
}

.item-5 {
  grid-column: span 2;
}

/* Mejoras en visualización móvil */
.button-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.mobile-button {
  margin-right: 10px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.mobile-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Mejoras para el carrusel en móvil */
.mobile-gallery-container {
  padding: 0 15px 40px;
}

.mobile-swiper {
  width: 100%;
}

.mobile-swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-image {
  max-height: 230px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  display: block;
  margin: 0 auto;
  padding-bottom: 40px;
}

@media (max-width: 600px) {
  .hero-section {
    background-position: center;
  }

  .content {
    padding-left: 20px;
    padding-right: 20px;
    width: 90%;
  }

  .content div:last-child {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
  }

  .content div:last-child .q-btn,
  .mobile-button {
    margin-right: 0;
    width: 100%;
    border-radius: 8px;
    height: 48px;
    /* Altura táctil óptima */
    font-weight: 500;
    letter-spacing: 0.5px;
    justify-content: space-between;
    padding: 0 15px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
  }

  .text-content-cet {
    font-size: 4rem;
  }

  .text-content {
    font-size: 1.2rem;
  }

  /* Mejoras del carrusel en móvil */
  .carousel-image {
    height: 260px;
    width: 100%;
    object-fit: cover;
  }

  /* Estilo para los botones de navegación del carrusel */
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    color: #FF9800; /* $accent */
    background: rgba(255, 255, 255, 0.8);
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :deep(.swiper-button-next:after),
  :deep(.swiper-button-prev:after) {
    font-size: 18px;
  }

  :deep(.swiper-pagination-bullet-active) {
    background: #FF9800; /* $accent */
  }
}

@media (max-width: 400px) {
  .text-content-cet {
    font-size: 3.5rem;
  }

  .carousel-image {
    height: 220px;
  }
}
</style>
