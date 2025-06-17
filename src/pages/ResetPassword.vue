<template>
    <q-page class="flex flex-center">
        <div class="reset-password-container">
            <!-- Header con navegación -->
            <q-toolbar class="bg-white text-dark q-mb-lg">
                <q-avatar>
                    <img src="/icons/favicon-128x128.png" alt="CET" style="width: 30px; height: 30px;">
                </q-avatar>

                <q-space />

                <q-btn outline color="dark" label="Iniciar Sesión" @click="$router.push('/login')" />
            </q-toolbar>

            <!-- Formulario de recuperación -->
            <q-card class="q-pa-lg reset-form">
                <q-card-section class="text-center">
                    <div class="text-h6 q-mb-md">¿Olvidaste tu contraseña?</div>
                </q-card-section>

                <q-card-section>
                    <q-form @submit.prevent="sendLinkReset" ref="formRef">
                        <q-input v-model="usuario" type="email" label="Correo Electrónico"
                            placeholder="ejemplo@dominio.com" outlined lazy-rules :rules="emailRules" :disable="loading"
                            autocomplete="email" />

                        <q-btn label="Restablecer contraseña" type="submit" color="dark" size="md"
                            class="q-mt-md full-width" :loading="loading" :disable="!isFormValid" />
                    </q-form>
                </q-card-section>

                <!-- Mostrar errores -->
                <q-banner v-if="error && showError" class="bg-negative text-white q-ma-md" rounded>
                    <div class="flex items-center">
                        <q-icon name="error" class="q-mr-sm" />
                        {{ error }}
                    </div>
                    <template v-slot:action>
                        <q-btn flat dense icon="close" color="white" @click="hideError" />
                    </template>
                </q-banner>
            </q-card>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { useQuasar } from 'quasar'
import { QForm } from 'quasar'

const router = useRouter()
const $q = useQuasar()

// Referencias reactivas
const usuario = ref('')
const error = ref('')
const loading = ref(false)
const showError = ref(false)
const formRef = ref<QForm | null>(null)

// Reglas de validación
const emailRules = [
    (val: string) => !!val || 'El correo electrónico es requerido',
    (val: string) => isValidEmail(val) || 'Formato de email inválido'
]

// Computed properties
const isFormValid = computed(() => {
    return usuario.value.length > 0 && isValidEmail(usuario.value)
})

// Validación de email
const isValidEmail = (val: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailPattern.test(val)
}

// Ocultar error
const hideError = () => {
    showError.value = false
    error.value = ''
}

// Función para enviar email de restablecimiento
const sendLinkReset = async () => {
    if (!formRef.value) return

    // Validar formulario
    const isValid = await formRef.value.validate()
    if (!isValid) return

    loading.value = true
    hideError()

    try {
        const auth = getAuth()
        await sendPasswordResetEmail(auth, usuario.value)

        console.log('ResetEmail: enviado')

        // Mostrar notificación de éxito
        $q.notify({
            type: 'positive',
            message: 'Consulte su casilla de email',
            caption: 'Se ha enviado un enlace de recuperación',
            timeout: 5000,
            position: 'top'
        })

        // Redirigir al login después de un momento
        setTimeout(() => {
            router.push('/login')
        }, 2000)

    } catch (err: any) {
        console.log('ResetEmail: error', err.message)
        error.value = mapResetError(err.code)
        showError.value = true

        // Auto-ocultar error después de 5 segundos
        setTimeout(() => {
            hideError()
        }, 5000)
    } finally {
        loading.value = false
    }
}

// Mapeo de errores específicos para reset password
const mapResetError = (errorCode: string): string => {
    const errors: { [key: string]: string } = {
        'auth/user-not-found': 'No existe una cuenta con este email',
        'auth/invalid-email': 'El formato del email es inválido',
        'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
        'auth/network-request-failed': 'Error de conexión. Verifica tu conexión a internet'
    }
    return errors[errorCode] || 'Error al enviar el email de recuperación'
}
</script>

<style scoped>
.reset-password-container {
    width: 100%;
    max-width: 450px;
    margin: 0 auto;
}

.reset-form {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
}

/* Animación para el banner de error */
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