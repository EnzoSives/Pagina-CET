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
              <q-btn
                color="deep-purple-6"
                label="Pagar"
                icon="paid"
                class="q-px-xl rounded-borders"
                :href="'https://miclub.cetpinamar.com.ar/#/pagar?monto=0'"
                target="_blank"
              />
              <q-btn
                color="teal-6"
                label="Alta"
                icon="person_add"
                class="q-px-xl rounded-borders"
                :href="'https://docs.google.com/forms/d/e/1FAIpQLSd8c8tQjiLs01-gDbRoET4kdYYyxzAhbO-BI8vqkOrolAMENg/viewform'"
                target="_blank"
              />
              <q-btn
                color="pink-6"
                label="Baja"
                icon="person_remove"
                class="q-px-xl rounded-borders"
                :href="'https://docs.google.com/forms/d/e/1FAIpQLSfpUwZ7Wj20XL-Le_kER63u6zCxT5j3gT1gJYQLZDGk4398xA/viewform'"
                target="_blank"
              />
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
          image:
            'https://images.unsplash.com/photo-1735674055107-e9342d0145df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          title: 'Ciclismo',
          schedule: 'Consultar Horarios',
          description:
            'Circuito MTB para todos los niveles. (Bike Park). Grupos de ciclismo inicial, recreativo y entrenamiento.Alquiler de bicicletas.Parador MTB',
          image: '/imgs/ciclismo.jpg',
        },
        {
          title: 'Arquería',
          schedule: 'Consultar Horarios',
          description:
            'Clases de arquería para todas las edades. Participación en torneos locales y nacionales.',
          image:
            `${base}imgs/Arqueria4.jpeg`,
        },
        {
          title: 'Running',
          schedule: 'Lunes, miércoles y viernes - 8hs / 19hs (8 hs. o 19 hs.).',
          description:
            'Lo importante es moverse y disfrutar, no el nivel. 15 años en adelante ',
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.sport-image {
  min-height: 450px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  transform: scale(1.1);
  transition: transform 0.4s ease-in-out;
}

.sport-image:hover .image-overlay {
  transform: scale(1);
}

.sport-content {
  border-radius: 12px;
}

.q-btn {
  transition: all 0.3s ease;
  font-weight: 500;
}

.q-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .sport-image {
    min-height: 300px;
    order: 1;
  }

  .sport-content {
    padding: 1.5rem;
    order: 2;
  }
}
</style>
