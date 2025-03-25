<template>
  <q-card class="q-pa-md beneficiosCards">
    <q-card-section class="row items-center justify-between">
      <q-title>{{ beneficio.nombrefantasia.toUpperCase() }}</q-title>
      <div class="row items-center">
        <q-toggle v-if="perfilStore.admin" v-model="check" label="Aprobado" dense @update:model-value="onToggleChange" />
        <q-btn-group v-if="editable" class="q-ml-sm">
          <q-btn flat round icon="edit" color="green" outline @click="emitEditar" />
          <q-btn flat round icon="delete" color="red" outline @click="emitEliminar" />
        </q-btn-group>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="row items-center">
        <div class="col">
          <q-subtitle>{{ beneficio.titulo.toUpperCase() }}</q-subtitle>
        </div>
        <div class="col-auto">
          <q-avatar v-if="url" size="70px">
            <q-img :src="url" :alt="beneficio.nombrefantasia" />
          </q-avatar>
        </div>
      </div>
      <div class="q-mt-sm">
        <p class="text-grey-4">{{ beneficio.descripcion.toUpperCase() }}</p>
      </div>
    </q-card-section>

    <q-separator color="grey-8"></q-separator>

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
import { usePerfilStore } from 'src/stores/perfilesStore'


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
    chequeado?: boolean
  }
  index?: number
  editable?: boolean
  isAdmin?: boolean
}>()

// Definir eventos a emitir
const emit = defineEmits<{
  (e: 'form-checked', index: number, value: boolean): void
  (e: 'form-editar', index: number): void
  (e: 'form-eliminar', index: number): void
}>()

// Store de perfiles
const perfilStore = usePerfilStore()

// Variable reactiva para la URL de la imagen
const url = ref<string | null>(null)

// Estado del toggle (checkbox)
const check = ref(props.beneficio.chequeado ?? false)

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
.beneficiosCards {
  margin: 20px;
  border-radius: 24px;
  background: linear-gradient(135deg, #1e1e22, #292932);
  color: white;
  max-width: 350px;
  transition: transform 0.2s ease-in-out;
}

.beneficiosCards:hover {
  transform: scale(1.02);
}

p {
  letter-spacing: 1px;
}
</style>
