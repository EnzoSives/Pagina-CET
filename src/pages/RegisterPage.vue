<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 400px;">
      <q-card-section>
        <div class="text-h6">Registro</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="register">
          <q-input v-model="email" label="Correo Electrónico" type="email" outlined class="q-mt-md" lazy-rules
            :rules="[val => !!val || 'El correo es requerido']" />
          <q-input v-model="password" label="Contraseña" type="password" outlined class="q-mt-md" lazy-rules
            :rules="[val => !!val || 'La contraseña es requerida']" />
          <q-card-actions align="right" class="q-mt-md">
            <q-btn label="Registrarse" color="primary" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-btn flat label="¿Ya tienes cuenta? Inicia sesión" color="primary" @click="$router.push('/login')"
          class="full-width" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { useQuasar } from 'quasar'; // 1. Importar useQuasar
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const $q = useQuasar(); // 2. Obtener la instancia de Quasar

const email = ref("");
const password = ref("");

// 3. Convertir la función a async para usar await
const register = async () => {
  try {
    // Usamos await para esperar que el registro termine
    await authStore.register(email.value, password.value);

    // Notificación de éxito
    $q.notify({
      color: 'positive',
      position: 'top',
      message: '¡Usuario registrado con éxito!',
      icon: 'check_circle'
    });

    // Redirigir al login después de un registro exitoso
    router.push('/login');

  } catch (error) {
    // Notificación de error
    $q.notify({
      color: 'negative',
      position: 'top',
      // Intenta mostrar el mensaje del error, o uno genérico
      message: 'Usuario o contraseña incorrectos. Inténtalo de nuevo.',
      icon: 'report_problem'
    });
    console.error(error);
  }
};
</script>

<style scoped>
.q-card {
  max-width: 400px;
  width: 100%;
}
</style>