<template>
  <q-card class="q-pa-md beneficiosCards">
    <!-- Header del card -->
    <q-card-section class="row items-center justify-between">
      <div>
        <h3>{{ beneficio.nombrefantasia.toUpperCase() }}</h3>
      </div>
      <div class="row items-center">
        <!-- Checkbox: visible solo si es admin -->
        <q-toggle v-if="isAdmin" v-model="check" label="Aprobado" dense @update:model-value="onToggleChange" />
        <!-- Botón editar -->
        <q-btn v-if="editable" flat round icon="edit" color="green" class="q-ml-sm" @click="emitEditar" />
        <!-- Botón eliminar -->
        <q-btn v-if="editable" flat round icon="delete" color="red" class="q-ml-sm" @click="emitEliminar" />
      </div>
    </q-card-section>

    <!-- Contenido del card -->
    <q-card-section>
      <div class="row items-center">
        <div class="col">
          <h4>{{ beneficio.titulo.toUpperCase() }}</h4>
        </div>
        <div class="col-auto">
          <q-img v-if="url" :src="url" :alt="beneficio.nombrefantasia" style="width:70px; height:70px"
            spinner-size="30" />
        </div>
      </div>
      <div class="q-mt-sm">
        <p>{{ beneficio.descripcion.toUpperCase() }}</p>
      </div>
    </q-card-section>

    <q-separator color="white"></q-separator>

    <!-- Footer -->
    <q-card-section class="text-grey text-italic">
      <em>
        {{ beneficio.rubro.toUpperCase() }} -
        {{ beneficio.direccion.toUpperCase() }} -
        {{ beneficio.telefono.toUpperCase() }}
      </em>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { storage } from 'src/firebase'
import { defineProps, defineEmits } from 'vue'
import { ref as storageRef, getDownloadURL } from 'firebase/storage'
import type { FirebaseError } from 'firebase/app'


// Definir las props que se reciben, incluyendo el objeto "beneficio" y el flag isAdmin
const props = defineProps<{
  beneficio: {
    id: string
    nombrefantasia: string
    titulo: string
    descripcion: string
    rubro: string
    direccion: string
    telefono: string
    logo?: string
  }
  index?: number
  editable?: boolean
  chequeado?: boolean
  isAdmin?: boolean
}>()

// Definir eventos a emitir
const emit = defineEmits<{
  (e: 'form-checked', index: number, value: boolean): void
  (e: 'form-editar', index: number): void
  (e: 'form-eliminar', index: number): void
}>()

// Variable reactiva para la URL de la imagen
const url = ref<string | null>(null)

// Estado del toggle (checkbox)
const check = ref(props.chequeado ?? false)

// Usamos la prop isAdmin directamente
// Función para cargar la imagen desde Firebase Storage
const cargarImagen = () => {
  if (props.beneficio.logo) {
    const imageRef = storageRef(storage, `beneficios/${props.beneficio.logo}`)
    getDownloadURL(imageRef)
      .then((downloadUrl: string) => {
        url.value = downloadUrl
      })
      .catch((error: FirebaseError) => {
        switch (error.code) {
          case 'storage/object-not-found':
            console.log("File doesn't exist")
            break
          case 'storage/unauthorized':
            console.log("User doesn't have permission to access the object")
            break
          case 'storage/canceled':
            console.log("User canceled the upload")
            break
          case 'storage/unknown':
            console.log("Unknown error occurred")
            break
          default:
            console.log("Error:", error.message)
        }
      })
  }
}
const onToggleChange = (val: boolean) => {
  if (props.index !== undefined) {
    emit('form-checked', props.index, val)
  }
}

const emitEditar = () => {
  if (props.index !== undefined) {
    emit('form-editar', props.index)
  }
}

const emitEliminar = () => {
  if (props.index !== undefined) {
    emit('form-eliminar', props.index)
  }
}

// Observar cambios en la propiedad "logo" del beneficio para recargar la imagen
watch(
  () => props.beneficio.logo,
  (newLogo) => {
    if (newLogo) {
      cargarImagen()
    } else {
      url.value = null
    }
  }
)

// Cargar la imagen al montar el componente
onMounted(() => {
  cargarImagen()
})
</script>

<style scoped>
h3,
h4,
p {
  margin: 0;
}

.beneficiosCards {
  margin: 20px;
  border-radius: 20px;
  background-color: rgb(26, 26, 29);
  color: white;
  max-width: 400px;
}
</style>
