<template>
  <q-page class="q-pa-lg bg-white">
    <div class="column q-gutter-xl">
      <div v-for="(sport, index) in sports" :key="index" class="sport-section">
        <div class="row items-start">
          <!-- Imagen -->
          <div class="sport-image col-12 col-md-6 relative-position">
            <div class="image-overlay" :style="{ backgroundImage: `url(${sport.image})` }"></div>
          </div>

          <!-- Contenido -->
          <div class="sport-content col-12 col-md-6 q-pa-xl">
            <h2 class="text-h3 q-mb-md text-weight-bolder gradient-text">
              {{ sport.title }}
            </h2>

            <div class="text-subtitle1 q-mb-md text-grey-600">
              <q-icon name="schedule" class="q-mr-sm text-deep-purple-6" />
              <span class="text-weight-medium">{{ sport.schedule }}</span>
            </div>

            <p class="text-body1 q-mb-xl text-grey-800">{{ sport.description }}</p>

            <div class="row q-gutter-sm">
              <q-btn color="deep-purple-6" label="Pagar" icon="paid" class="q-px-xl rounded-pill"
                :href="'https://miclub.cetpinamar.com.ar/#/pagar?monto=0'" target="_blank" />
              <q-btn color="teal-6" label="Alta" icon="person_add" class="q-px-xl rounded-pill"
                :href="'https://docs.google.com/forms/d/e/1FAIpQLSd8c8tQjiLs01-gDbRoET4kdYYyxzAhbO-BI8vqkOrolAMENg/viewform'"
                target="_blank" />
              <q-btn color="pink-6" label="Baja" icon="person_remove" class="q-px-xl rounded-pill"
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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DeportesSecciones',
  data() {
    return {
      sports: [
        {
          title: "Futbol Escuela",
          schedule: "Martes y Jueves de 15:45 a 17 hs.",
          description: "Escuela de Fútbol CET (hasta 12 años) Coordinador: Martin Basma",
          image: "https://i.pinimg.com/736x/fa/08/06/fa0806d7db438581687ed0fa6c7ef7f4.jpg"
        },
        {
          title: "Hockey",
          schedule: "Lunes a jueves, de 17 a 19:30 hs.",
          description: "Participación en el torneo de la ASOCIACIÓN AMATEUR MARPLATENSE DE HOCKEY (AAMH). Escuela de Hockey, 9na división (hasta 10 años), 8va. 7ma, 6ta, 5ta, intermedia, primera y Maminas!!!",
          image: "https://i.pinimg.com/736x/87/03/89/870389975b04170d5f3a2f775e49698f.jpg"
        },
        {
          title: "Patin",
          schedule: "Consultar Horarios",
          description: "Patin artistico federado en todas sus categorias.",
          image: "https://i.pinimg.com/736x/37/c3/be/37c3be6b3263c6f0ef94a39bfe13e21e.jpg"
        }
      ]
    };
  }
});
</script>

<style scoped>
.sport-section {
  border-radius: 0;
  overflow: visible;
  box-shadow: none;
  background: transparent;
  padding: 32px 0;
  /* Espaciado entre secciones */
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  /* Sutil línea divisoria */
}

.sport-section:last-child {
  border-bottom: none;
  /* Evitar línea en la última sección */
}

.sport-image {
  min-height: 480px;
  position: relative;
  overflow: hidden;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
}

.sport-content {
  background: transparent;
  /* Se elimina el fondo para que se vea integrado */
}

.q-btn {
  transition: all 0.3s ease !important;
  font-weight: 500;
}

.q-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.text-grey-800 {
  color: #2d2d2d;
}

@media (max-width: 768px) {
  .sport-image {
    min-height: 300px;
    order: 1;
  }

  .sport-content {
    padding: 2rem !important;
    order: 2;
  }

  .text-h3 {
    font-size: 1.75rem !important;
  }
}
</style>
