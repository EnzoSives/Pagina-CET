<template>
  <q-page class="q-pa-lg bg-grey-2">
    <div class="column q-gutter-xl">
      <div v-for="(sport, index) in sports" :key="index" class="sport-section">
        <div class="row items-center q-col-gutter-md">
          <!-- Imagen con efecto Parallax -->
          <div class="sport-image col-12 col-md-6">
            <div class="image-overlay" :style="{ backgroundImage: `url(${sport.image})` }"></div>
          </div>

          <!-- Contenido -->
          <div class="sport-content col-12 col-md-6 q-pa-xl bg-white shadow-2 rounded-borders">
            <h2 class="text-h3 q-mb-md text-weight-bolder text-primary">
              {{ sport.title }}
            </h2>

            <div class="text-subtitle1 q-mb-md text-grey-600 flex items-center">
              <q-icon name="schedule" class="q-mr-sm text-deep-purple-6" />
              <span class="text-weight-medium">{{ sport.schedule }}</span>
            </div>

            <p class="text-body1 q-mb-xl text-grey-800">{{ sport.description }}</p>

            <div class="row q-gutter-sm">
              <q-btn color="deep-purple-6" label="Pagar" icon="paid" class="q-px-xl rounded-borders"
                :href="'https://miclub.cetpinamar.com.ar/#/pagar'" target="_blank" />
              <q-btn color="teal-6" label="Alta" icon="person_add" class="q-px-xl rounded-borders"
                :href="'https://docs.google.com/forms/d/e/1FAIpQLSd8c8tQjiLs01-gDbRoET4kdYYyxzAhbO-BI8vqkOrolAMENg/viewform'"
                target="_blank" />
              <q-btn color="pink-6" label="Baja" icon="person_remove" class="q-px-xl rounded-borders"
                :href="'https://docs.google.com/forms/d/e/1FAIpQLSfpUwZ7Wj20XL-Le_kER63u6zCxT5j3gT1gJYQLZDGk4398xA/viewform'"
                target="_blank" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const base = process.env.BASE_URL || '/'

export default defineComponent({
  name: 'DeportesSecciones',
  data() {
    return {
      sports: [
        {
          title: 'Hockey',
          schedule: 'Lunes a jueves, de 17 a 19:30 hs.',
          description:
            'Participación en el torneo de la ASOCIACIÓN AMATEUR MARPLATENSE DE HOCKEY (AAMH).',
          image: '/imgs/hockey.png',
        },
        {
          title: 'Patin',
          schedule: 'Consultar Horarios',
          description: 'Patin artístico federado en todas sus categorías.',
          image: 'https://i.pinimg.com/736x/37/c3/be/37c3be6b3263c6f0ef94a39bfe13e21e.jpg',
        },
        {
          title: 'Ciclismo',
          schedule: 'Consultar Horarios',
          description:
            'Circuito MTB para todos los niveles. (Bike Park). Grupos de ciclismo inicial, recreativo y entrenamiento.Alquiler de bicicletas.Parador MTB',
          image: '/imgs/ciclismo.jpg',
        },
        {
          title: 'Arquería3D',
          schedule: 'Consultar Horarios',
          description:
            'Clases de arquería para todas las edades. Participación en torneos locales y nacionales.',
          image: `${base}imgs/Arqueria4.jpeg`,
        },
        {
          title: 'Running',
          schedule: 'Lunes, miércoles y viernes - 8hs / 19hs (8 hs. o 19 hs.).',
          description: 'Lo importante es moverse y disfrutar, no el nivel. 15 años en adelante ',
          image:
            'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
      ],
    }
  },
})
</script>

<style scoped>
.sport-section {
  padding: 40px 0;
  animation: fadeInUp 0.6s ease-in-out;
  border-radius: 16px;
  background: linear-gradient(135deg, #ffffff, #f1f1f1);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.sport-section:hover {
  transform: translateY(-5px);
}

.sport-image {
  min-height: 400px;
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  filter: brightness(0.9) contrast(1.1);
  transform: scale(1.05);
  transition: transform 0.5s ease;
}

.sport-image:hover .image-overlay {
  transform: scale(1.02);
}

.sport-content {
  border-radius: 16px;
  background: #fff;
  padding: 2rem;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05);
}

.q-btn {
  transition: all 0.3s ease;
  font-weight: 600;
  border-radius: 10px;
  text-transform: none;
}

.q-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

@media (max-width: 768px) {
  .sport-image {
    min-height: 240px;
    order: 1;
  }

  .sport-content {
    padding: 1.5rem;
    order: 2;
  }

  .q-btn {
    width: 100%;
    justify-content: center;
  }

  .row.q-gutter-sm {
    flex-direction: column;
  }

  .text-h3 {
    font-size: 1.5rem;
  }

  .text-body1 {
    font-size: 1rem;
    line-height: 1.5;
  }

  .sport-section {
    padding: 24px 0;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
