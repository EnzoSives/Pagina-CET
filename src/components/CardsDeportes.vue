<template>
  <q-page padding>
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page padding>
          <div class="row justify-center q-gutter-lg">
            <q-card v-for="(card, index) in cards" :key="index" class="my-card" style="width: 300px; height: 500px">
              <div class="flip-card-inner">
                <!-- Front side -->
                <div class="flip-card-front">
                  <div class="card-bg" :style="{ backgroundImage: `url(${card.image})` }"></div>
                  <div class="q-pa-md card-content">
                    <h3>{{ card.title }}</h3>
                    <p>{{ card.schedule }}</p>
                  </div>
                </div>
                <!-- Back side -->
                <div class="flip-card-back">
                  <h3>{{ card.title }}</h3>
                  <p>{{ card.description }}</p>
                  <div>
                    <q-btn color="primary" label="Pagar" style="margin-left: 5px;" />
                    <q-btn color="primary" label="Alta" style="margin-left: 5px;" />
                    <q-btn color="primary" label="Baja" style="margin-left: 5px;"/>
                  </div>
                </div>
              </div>
            </q-card>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script lang="ts">
export default {
  name: "CardDeportes",
  data() {
    return {
      cards: [
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
};
</script>

<style scoped>
.my-card {
  background-color: black;
  perspective: 1000px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.my-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  overflow: hidden;
}

.flip-card-front {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-size: cover;
  background-position: center;
}

.card-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  z-index: 1;
  opacity: 0.8;
}

.card-content {
  position: relative;
  z-index: 2;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  text-align: center;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
  padding: 20px;
}

.flip-card-back {
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: rotateY(180deg);
  padding: 20px;
  box-sizing: border-box;
}
</style>
