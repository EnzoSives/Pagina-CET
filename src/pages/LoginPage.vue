<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 400px;">
      <q-card-section>
        <div class="text-h6">Iniciar Sesión</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="login">
          <q-input v-model="email" label="Correo Electrónico" type="email" outlined lazy-rules
            :rules="[val => !!val || 'Campo requerido', isValidEmail]" />

          <q-input v-model="password" label="Contraseña" type="password" outlined class="q-mt-md" lazy-rules
            :rules="[val => !!val || 'Campo requerido']" />

          <q-btn label="Ingresar" type="submit" color="primary" class="q-mt-md full-width"
            :loading="authStore.loading" />
        </q-form>
      </q-card-section>

      <q-card-section class="text-center">
        <q-btn flat label="¿No tienes cuenta? Regístrate" color="primary" @click="$router.push('/register')" />
      </q-card-section>

      <!-- Mostrar errores -->
      <q-dialog v-model="showError" persistent>
        <q-card>
          <q-card-section class="bg-negative text-white">
            <div class="text-h6">Error de autenticación</div>
          </q-card-section>

          <q-card-section>
            {{ errorMessage }}
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cerrar" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'
import { QDialog } from 'quasar'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const showError = ref(false)

// Validación de email
const isValidEmail = (val: string) => {
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
  return emailPattern.test(val) || 'Email inválido'
}

const login = async () => {
  try {
    await authStore.login(email.value, password.value)

    // Redirección después de login exitoso
    if (authStore.user) {
      const redirectPath = router.currentRoute.value.query.redirect?.toString() || '/appcet'
      await router.push(redirectPath)
    }
  } catch (error: unknown) {
    handleLoginError(error)
  }
}

const handleLoginError = (error: unknown) => {
  errorMessage.value = mapAuthError((error as { code: string }).code)
  showError.value = true
}

const mapAuthError = (errorCode: string): string => {
  const errors: { [key: string]: string } = {
    'auth/invalid-email': 'Email inválido',
    'auth/user-disabled': 'Cuenta deshabilitada',
    'auth/user-not-found': 'Usuario no registrado',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/too-many-requests': 'Demasiados intentos. Intente más tarde'
  }
  return errors[errorCode] || 'Error desconocido. Intente nuevamente.'
}
</script>

<style scoped>
.q-card {
  max-width: 400px;
  width: 100%;
}
</style>
