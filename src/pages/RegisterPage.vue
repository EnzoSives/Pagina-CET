<!-- src/pages/RegisterPage.vue -->
<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 400px;">
      <q-card-section>
        <div class="text-h6">Registro</div>
      </q-card-section>
      <q-card-section>

        <q-input v-model="email" label="Correo Electrónico" type="email" outlined class="q-mt-md" />
        <q-input v-model="password" label="Contraseña" type="password" outlined class="q-mt-md" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Registrarse" color="primary" @click="register" />
      </q-card-actions>
      <q-card-section>
        <q-btn flat label="¿Ya tienes cuenta? Inicia sesión" color="primary" @click="$router.push('/login')" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "src/stores/auth";

const authStore = useAuthStore();
const email = ref("");
const password = ref("");

const register = () => {
  authStore.register(email.value, password.value);
};
</script>

<style scoped>
.q-card {
  max-width: 400px;
  width: 100%;
}
</style>
