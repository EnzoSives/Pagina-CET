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

          <q-btn label="Ingresar" type="submit" color="primary" class="q-mt-md full-width" :loading="loading" />
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
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { usePerfilStore } from 'src/stores/perfilesStore'; // Importa tu store

const router = useRouter()
const perfilStore = usePerfilStore(); // Usa el store de perfiles

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const showError = ref(false)
const loading = ref(false)

// Validación de email
const isValidEmail = (val: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailPattern.test(val) || 'Email inválido'
}

const login = async () => {
  loading.value = true
  try {
    const auth = getAuth()
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)

    // Usuario autenticado correctamente
    console.log('Usuario autenticado:', userCredential.user)

    // Llamar a la acción para cargar los perfiles
    await perfilStore.getPerfilesJCET();

    // Redirección después de login exitoso
    await router.push('/perfiles') // <-- Redirige a admperfiles
  } catch (error: any) {
    handleLoginError(error)
  } finally {
    loading.value = false
  }
}


const handleLoginError = (error: any) => {
  errorMessage.value = mapAuthError(error.code)
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
