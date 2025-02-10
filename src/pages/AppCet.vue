<template>
  <q-page class="q-pa-md flex flex-center column" style="padding-top: 150px;">
    <!-- Sección de Búsqueda de Socios -->
    <q-card class="q-pa-md q-mb-lg card-container">
      <q-card-section>
        <div class="text-h5 text-center">🔎 Buscar Socio por DNI</div>
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <q-input v-model="dni" label="Ingrese DNI" filled clearable />
        <q-btn color="primary" label="Buscar" @click="buscarSocio" class="full-width" />
      </q-card-section>
      <q-card-section v-if="socio" class="q-mt-md">
        <q-item>
          <q-item-section avatar>
            <q-avatar icon="person" color="blue-5" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h6">{{ socio.nombre }}</q-item-label>
            <q-item-label caption>DNI: {{ socio.dni }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section v-else-if="dni" class="text-center text-negative">
        No se encontró el socio.
      </q-card-section>
    </q-card>

    <!-- Sección de Beneficios -->
    <q-card class="q-pa-md card-container">
      <q-card-section>
        <div class="text-h5 text-center">🎁 Beneficios</div>
      </q-card-section>
      <q-card-section class="q-gutter-md row justify-center">
        <q-card v-for="(beneficio, index) in beneficios" :key="index" class="benefit-card">
          <q-card-section class="text-center">
            <q-icon :name="beneficio.icono" size="40px" color="primary" />
            <div class="text-h6 q-mt-sm">{{ beneficio.titulo }}</div>
            <p class="q-mt-xs">{{ beneficio.descripcion }}</p>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { QIcon } from "quasar";

// Estado para el DNI y los resultados
const dni = ref("");
const socio = ref<{ nombre: string; dni: string } | null>(null);

// Simulación de base de datos de socios
const sociosDB = [
  { nombre: "Juan Pérez", dni: "12345678" },
  { nombre: "María López", dni: "87654321" },
  { nombre: "Carlos Gómez", dni: "11223344" },
];

// Función para buscar socio
const buscarSocio = () => {
  socio.value = sociosDB.find((s) => s.dni === dni.value) || null;
};

// Lista de beneficios con iconos
const beneficios = [
  { titulo: "Descuento en gimnasio", descripcion: "15% de descuento en Gimnasio FitClub.", icono: "fitness_center" },
  { titulo: "Acceso a piscina", descripcion: "Entrada libre a la piscina los fines de semana.", icono: "pool" },
  { titulo: "Eventos exclusivos", descripcion: "Invitación a eventos privados del club.", icono: "event" },
];
</script>


<style scoped>
.card-container {
  max-width: 1500px;
  width: 100%;
}

.benefit-card {
  width: 280px;
  min-height: 150px;
  padding: 16px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
