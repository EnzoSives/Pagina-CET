<template>
  <div>
    <q-btn label="Agregar beneficio" color="primary" @click="abrirModal" />

    <q-dialog v-model="mostrarModal" persistent>
      <q-card class="q-pa-md" style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Nuevo Beneficio</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input v-model="mibeneficio.rubro" label="Rubro" />
          <q-input v-model="mibeneficio.nombrefantasia" label="Nombre de fantasía" />
          <q-input v-model="mibeneficio.titulo" label="Título" />
          <q-input v-model="mibeneficio.descripcion" label="Descripción" type="textarea" />
          <q-input v-model="mibeneficio.direccion" label="Dirección" />
          <q-input v-model="mibeneficio.telefono" label="Teléfono" />

          <q-file
            v-model="archivo"
            label="Subir logo"
            accept="image/*"
            @update:model-value="onFileAdded"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="negative" v-close-popup />
          <q-btn label="Guardar" color="primary" @click="guardarBeneficio" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useBeneficiosStore } from 'src/stores/beneficiosStore'
import { storage } from 'src/firebase'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

const mostrarModal = ref(false)
// const archivo = ref<File | null>(null)
const archivo = ref<File | null>(null)

const mibeneficio = ref({
  rubro: '',
  nombrefantasia: '',
  titulo: '',
  descripcion: '',
  direccion: '',
  telefono: '',
  logo: '',
  chequeado: false,
})

const beneficiosStore = useBeneficiosStore()

const abrirModal = () => {
  mostrarModal.value = true
  limpiarFormulario()
}

const limpiarFormulario = () => {
  mibeneficio.value = {
    rubro: '',
    nombrefantasia: '',
    titulo: '',
    descripcion: '',
    direccion: '',
    telefono: '',
    logo: '',
    chequeado: false,
  }
  archivo.value = null
}

const onFileAdded = async () => {
  // Asegurarse de que archivo.value sea File y no string
  if (!(archivo.value instanceof File)) {
    console.warn('El archivo seleccionado no es válido:', archivo.value)
    return
  }

  const nombreArchivo = Date.now() + '-' + archivo.value.name
  const refImg = storageRef(storage, 'beneficios/' + nombreArchivo)
  const metadata = { contentType: archivo.value.type }

  try {
    const snapshot = await uploadBytes(refImg, archivo.value, metadata)
    const url = await getDownloadURL(snapshot.ref)
    mibeneficio.value.logo = url
    console.log('Imagen subida correctamente:', url)
  } catch (error) {
    console.error('Error al subir imagen:', error)
  }
}

// const subirImagen = async () => {
//   if (!archivo.value) return

//   const nombreArchivo = Date.now() + '-' + archivo.value.name
//   const refImg = storageRef(storage, 'beneficios/' + nombreArchivo)
//   const metadata = { contentType: archivo.value.type }

//   try {
//     const snapshot = await uploadBytes(refImg, archivo.value, metadata)
//     const url = await getDownloadURL(snapshot.ref)
//     mibeneficio.value.logo = url
//     console.log('Imagen subida:', url)
//   } catch (error) {
//     console.error('Error al subir imagen:', error)
//   }
// }

const guardarBeneficio = async () => {
  try {
    await beneficiosStore.crearBeneficio(mibeneficio.value)
    mostrarModal.value = false
  } catch (error) {
    console.error('Error al guardar beneficio:', error)
  }
}
</script>
