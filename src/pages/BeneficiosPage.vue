<template>
  <q-page class="q-pa-md flex flex-center column" style="padding-top: 100px;">
    <!-- Tarjeta principal -->
    <q-card class="info-card">
      <q-card-section>
        <div class="text-h5 text-bold text-center">
          🛍️ Obtené Descuentos Importantes En Comercios Adheridos
        </div>
      </q-card-section>

      <!-- Imagen de la credencial -->
      <q-card-section class="text-center">
        <q-img src="~/assets/credencial.png" alt="Credencial de socio" class="credencial-img" spinner-color="primary" />
      </q-card-section>

      <q-card-section>
        <p class="text-body1">
          Mostrando tu carnet de socio podés obtener importantes descuentos.
          Ingresa a la <strong>APP del CET</strong> y consultá los comercios adheridos.
        </p>
        <p class="text-body1">
          Con esta aplicación podés consultar tu carnet de socio online y buscar por
          <strong>Rubro/Comercio/Entidad</strong> para obtener los descuentos que más te gusten.
        </p>
        <p class="text-body1">
          Por cualquier consulta, <strong>contáctanos</strong> o seguinos en nuestras redes:
        </p>
      </q-card-section>

      <q-card-section class="text-center">
        <q-btn color="primary" label="Ver Comercios Adheridos" icon="store" class="q-mb-md" @click="verComercios" />
      </q-card-section>

      <!-- Sección de Beneficios -->
      <!-- <q-card-section>
        <div class="text-h6 text-bold text-center">Beneficios Disponibles</div>
        <div class="beneficios-container">
          <BeneficiosCard v-for="beneficio in beneficiosStore.beneficios" :key="beneficio.id" :beneficio="beneficio" />
        </div>
      </q-card-section> -->

      <!-- <q-card-section>

        <div class="social-links">
          <q-btn color="blue-8" icon="fab fa-facebook" label="Facebook"
            @click="openLink('https://www.facebook.com/cetpinamar/')" />
          <q-btn color="pink-6" icon="fab fa-instagram" label="Instagram"
            @click="openLink('https://www.instagram.com/cetpinamar/')" />
        </div>
      </q-card-section> -->
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
// import { useBeneficiosStore } from "src/stores/beneficiosStore";
import { useRouter } from "vue-router";
// import { onMounted } from "vue";
// import BeneficiosCard from "src/components/BeneficiosComponent.vue";
const $q = useQuasar();
const router = useRouter();
// const beneficiosStore = useBeneficiosStore();

// Función para abrir enlaces
// const openLink = (url: string) => {
//   window.open(url, "_blank");
// };

// Simula la navegación a la página de comercios adheridos
const verComercios = () => {
  router.push('/homePerfil');
  $q.notify({
    message: "Redirigiendo a la lista de comercios...",
    color: "blue",
    position: "top",
    timeout: 2000,
  });
  // Aquí puedes hacer un `router.push('/comercios')` si tienes la ruta configurada
};

// Cargar los beneficios cuando se monta el componente
// onMounted(() => {
//   beneficiosStore.fetchBeneficios();
// });
</script>

<style scoped>
.info-card {
  font-family: "Aldrich", sans-serif;
  max-width: 1600px;
  width: 100%;
  padding: 16px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
}

.credencial-img {
  max-width: 300px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.beneficios-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}
</style>
