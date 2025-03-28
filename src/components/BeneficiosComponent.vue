<template>
  <q-card class="q-pa-md beneficiosCards">
    <q-card-section class="row items-center justify-between">
      <q-title>{{ beneficio.nombrefantasia.toUpperCase() }}</q-title>
      <div class="row items-center">
        <q-toggle v-if="perfilStore.admin" v-model="check" label="Aprobado" dense @update:model-value="formChecked" />
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
import { db } from 'src/firebase'
import { doc, updateDoc } from 'firebase/firestore'

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
}>()

const emit = defineEmits<{
  (e: 'form-editar', index: number): void
  (e: 'form-eliminar', index: number): void
}>()

const perfilStore = usePerfilStore()
const url = ref<string | null>(null)
const check = ref(props.beneficio.chequeado ?? false)

const cargarImagen = () => {
  if (props.beneficio.logo) {
    const imageRef = storageRef(storage, `beneficios/${props.beneficio.logo}`)
    getDownloadURL(imageRef)
      .then((downloadUrl: string) => {
        url.value = downloadUrl
      })
      .catch((error: FirebaseError) => {
        console.error("Error al cargar imagen:", error.message)
      })
  }
}

const formChecked = async (val: boolean) => {
  check.value = val
  try {
    const beneficioRef = doc(db, "beneficios", props.beneficio.id)
    await updateDoc(beneficioRef, { chequeado: val })
  } catch (error) {
    console.error("Error actualizando beneficio:", error)
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

watch(() => props.beneficio.logo, (newLogo) => {
  if (newLogo) {
    cargarImagen()
  } else {
    url.value = null
  }
})

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
