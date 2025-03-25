<template>
  <q-page>
    <!-- Sección Hero con imagen de fondo -->
    <div class="hero-section"
      :style="{ backgroundImage: 'url(https://cetpinamar.com.ar/images/demo/backgrounds/03.png)' }">
      <div class="content">
        <div>
          <h2 class="text-content-cet">CET</h2>
          <p class="text-content">Club empleados Telpin</p>
        </div>
        <div>
          <q-btn style="margin-right: 10px;" label="Iniciar sesión" color="orange-10" @click="goToLogin()"></q-btn>
          <q-btn style="margin-right: 10px;" label="Ser socio" color="orange-10"
            :href="'https://docs.google.com/forms/d/e/1FAIpQLSd8c8tQjiLs01-gDbRoET4kdYYyxzAhbO-BI8vqkOrolAMENg/viewform'"
            target="_blank"></q-btn>
          <q-btn label="Beneficios" color="orange-10" @click="goToBeneficios()"></q-btn>
        </div>
      </div>
    </div>

    <div class="text-h3 text-weight-bolder gradient-text text-center q-mt-lg"
      style="margin-top: 50px; margin-bottom: 30px; font-family: Aldrich, sans-serif;">
      Nuestras Actividades Principales
    </div>
    <DeportesComponent></DeportesComponent>

    <div class="galeriaContent" style="margin-top: 50px;">
      <div class="text-h3 text-weight-bolder gradient-text text-center q-mt-lg" style="margin: 100px;">
        Nuestro Espacio
      </div>

      <!-- Galería Grid para pantallas grandes -->
      <div v-if="!isMobile" class="gallery-grid">
        <img v-for="(image, index) in images" :key="`grid-${index}`" :src="image"
          :class="['gallery-item', `item-${index + 1}`]" />
      </div>

      <!-- Carousel para móviles -->
      <div v-else class="q-pa-md">
        <q-carousel v-model="slide" transition-prev="scale" transition-next="scale" swipeable animated
          control-color="white" navigation padding arrows height="300px"
          class="bg-white text-white shadow-1 rounded-borders">
          <q-carousel-slide v-for="(image, index) in images" :key="`carousel-${index}`" :name="index">
            <div class="row fit justify-center items-center" style="width: 300px;">
              <img :src="image" class="carousel-image" />
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import DeportesComponent from 'components/DeportesComponet.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const slide = ref(0); // Para controlar el carousel

// Estado para saber si estamos en modo móvil
const isMobile = ref(false);

// Función para verificar si estamos en modo móvil
const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= 768; // Considerar móvil si la pantalla es de 768px o menor
};

// Función para manejar el redimensionamiento de la ventana
const handleResize = () => {
  checkIfMobile();
};

// Verificar el tamaño de la pantalla al montar el componente
onMounted(() => {
  checkIfMobile();
  // Agregar listener para detectar cambios en el tamaño de la ventana
  window.addEventListener('resize', handleResize);
});

// Limpiar el listener cuando el componente se desmonta
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

const images = ref([
  'https://i.pinimg.com/736x/33/21/7f/33217f1b0127b5e076c015e154f83b88.jpg',
  'https://i.pinimg.com/736x/b4/60/84/b46084953d3a783d5cdee7d29e1338d0.jpg',
  'https://i.pinimg.com/736x/47/ee/6f/47ee6f000404cf5311b3885d638a0910.jpg',
  'https://i.pinimg.com/736x/71/1d/52/711d52a098414991b7d75452355ec09e.jpg',
  'https://i.pinimg.com/736x/9d/39/48/9d39487846a38248347ae86f6ee7ba2a.jpg'
]);

const goToLogin = () => {
  router.push({ path: '/login' });
};
const goToBeneficios = () => {
  router.push({ path: '/beneficios' });
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Aldrich&family=Cherry+Cream+Soda&family=Oswald:wght@200..700&family=Roboto&family=Roboto+Slab:wght@100..900&display=swap');

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
  z-index: 1;
}

.content {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  text-align: left;
  padding-left: 40px;
  font-family: Aldrich, Helvetica Neue, Arial, sans-serif;
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
  font-family: "Aldrich", serif;
  font-optical-sizing: auto;
  font-weight: 700;
  font-style: normal;
  font-size: 5.5rem;
}

.text-content {
  font-family: "Aldrich", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-size: 1.5rem;
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

/* Clases para el carousel */
.carousel-image {
  max-height: 230px;
  max-width: 100%;
  object-fit: scale-down;
  border-radius: 8px;
}

@media (max-width: 600px) {
  .content div:last-child {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .content div:last-child .q-btn {
    margin-right: 0;
    width: 80%;
  }

  .text-content-cet {
    font-size: 4rem;
  }

  .text-content {
    font-size: 1.2rem;
  }
}
</style>
