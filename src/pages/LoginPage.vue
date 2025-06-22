<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 400px;">
      <q-card-section>
        <div class="text-h6">Iniciar Sesión</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="login" ref="formRef">
          <q-input v-model="email" label="Correo Electrónico" type="email" outlined lazy-rules :rules="emailRules"
            :disable="loading" autocomplete="email" />

          <q-input v-model="password" label="Contraseña" :type="showPassword ? 'text' : 'password'" outlined
            class="q-mt-md" lazy-rules :rules="passwordRules" :disable="loading" autocomplete="current-password">
            <template v-slot:append>
              <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="showPassword = !showPassword" />
            </template>
          </q-input>

          <q-btn label="Ingresar" type="submit" color="primary" class="q-mt-md full-width" :loading="loading"
            :disable="!isFormValid" />

          <q-btn flat label="¿Olvidaste tu contraseña?" color="primary" class="q-mt-sm full-width"
            @click="$router.push('/reset-password')" :disable="loading" />

          <q-separator></q-separator>

          <q-btn flat label="Registrarse" color="secondary" class="q-mt-sm full-width"
            @click="$router.push('/register')" :disable="loading" />
        </q-form>
      </q-card-section>

      <!-- Mostrar errores con notificación más elegante -->
      <q-banner v-if="errorMessage" class="bg-negative text-white q-ma-md" rounded>
        <div class="flex items-center">
          <q-icon name="error" class="q-mr-sm" />
          {{ errorMessage }}
        </div>
        <template v-slot:action>
          <q-btn flat dense icon="close" color="white" @click="clearError" aria-label="Cerrar error" />
        </template>
      </q-banner>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { usePerfilStore } from 'src/stores/perfilesStore'
import { useAuthStore } from 'src/stores/auth'
import { QForm } from 'quasar'

const router = useRouter()
const perfilStore = usePerfilStore()
const authStore = useAuthStore()

// Referencias reactivas
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)
const showPassword = ref(false)
const formRef = ref<QForm | null>(null)

// Reglas de validación
const emailRules = [
  (val: string) => !!val || 'El correo electrónico es requerido',
  (val: string) => isValidEmail(val) || 'Formato de email inválido'
]

const passwordRules = [
  (val: string) => !!val || 'La contraseña es requerida',
  (val: string) => val.length >= 6 || 'La contraseña debe tener al menos 6 caracteres'
]

// Computed properties
const isFormValid = computed(() => {
  return email.value.length > 0 &&
    password.value.length >= 6 &&
    isValidEmail(email.value) === true
})

// Validación de email mejorada
const isValidEmail = (val: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailPattern.test(val)
}

// Limpiar errores
const clearError = () => {
  errorMessage.value = ''
}

// Función de login mejorada
const login = async () => {
  if (!formRef.value) return

  // Validar formulario antes de proceder
  const isValid = await formRef.value.validate()
  if (!isValid) return

  loading.value = true
  clearError()

  try {
    const auth = getAuth()
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)

    console.log('Usuario autenticado:', userCredential.user)

    // Obtener el token
    const idToken = await userCredential.user.getIdToken()

    // Guardar usuario y token en la store
    authStore.setUser(userCredential.user, idToken)

    // Cargar perfiles
    await perfilStore.getPerfilesJCET()

    // Redirección
    await router.push('/perfiles')

  } catch (error: any) {
    console.error('Error en login:', error)
    handleLoginError(error)
  } finally {
    loading.value = false
  }
}

// Manejo de errores mejorado
const handleLoginError = (error: any) => {
  errorMessage.value = mapAuthError(error.code)
}

// Mapeo de errores actualizado
const mapAuthError = (errorCode: string): string => {
  const errors: { [key: string]: string } = {
    'auth/invalid-email': 'El formato del email es inválido',
    'auth/user-disabled': 'Esta cuenta ha sido deshabilitada',
    'auth/user-not-found': 'No existe una cuenta con este email',
    'auth/wrong-password': 'La contraseña es incorrecta',
    'auth/invalid-credential': 'Credenciales inválidas. Verifica tu email y contraseña',
    'auth/too-many-requests': 'Demasiados intentos fallidos. Intenta más tarde',
    'auth/network-request-failed': 'Error de conexión. Verifica tu conexión a internet',
    'auth/timeout': 'La petición ha expirado. Intenta nuevamente'
  }
  return errors[errorCode] || 'Error desconocido. Por favor intenta nuevamente'
}
</script>

<style scoped>
.q-card {
  max-width: 400px;
  width: 100%;
}

/* Transiciones suaves para el banner de error */
.q-banner {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>