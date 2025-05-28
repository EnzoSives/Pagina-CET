<template>
  <q-card class="q-pa-md beneficiosCards">
    <q-card-section class="q-gutter-sm q-pa-sm">
      <div class="row items-center justify-between">
        <!-- Nombre del beneficio -->
        <div class="text-h6 text-uppercase">{{ beneficio.nombrefantasia }}</div>

        <!-- Acciones -->
        <div class="column items-end">
          <q-btn-group>
            <!-- <q-btn
              dense
              round
              icon="edit"
              color="green"
              style="margin-right: 5px"
              outline
              @click="emitEditar"
            /> -->

            <q-btn dense round icon="delete" color="red" outline @click="eliminarBeneficio" />
          </q-btn-group>
          <!-- Botones -->
        </div>
      </div>
      <!-- Toggle -->
      <q-toggle v-if="perfilStore.admin && beneficio.chequeado !== undefined" v-model="check" label="Aprobado" dense
        @update:model-value="formChecked" class="q-mb-xs" />
    </q-card-section>

    <q-card-section>
      <div class="row items-center">
        <div class="col">
          <q-subtitle>{{ beneficio.titulo?.toUpperCase() }}</q-subtitle>
        </div>
        <div class="col-auto">
          <q-avatar v-if="url" size="70px">
            <q-img :src="url" :alt="beneficio.nombrefantasia" />
          </q-avatar>
        </div>
      </div>
      <div class="q-mt-sm">
        <p class="text-grey-4">{{ beneficio.descripcion?.toUpperCase() }}</p>
      </div>
    </q-card-section>

    <q-separator color="grey-8"></q-separator>

    <q-card-section class="text-grey text-italic" v-if="beneficio.rubro || beneficio.direccion || beneficio.telefono">
      <em>
        {{ beneficio.rubro?.toUpperCase() }} - {{ beneficio.direccion?.toUpperCase() }} -
        {{ beneficio.telefono?.toUpperCase() }}
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
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'

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
        console.error('Error al cargar imagen:', error.message)
      })
  }
}

const eliminarBeneficio = async () => {
  const beneficio = props.beneficio

  const confirmacion = confirm(
    `¿Estás seguro de que querés eliminar el beneficio "${beneficio.nombrefantasia}"?`,
  )
  if (!confirmacion) return

  try {
    await deleteDoc(doc(db, 'beneficios', beneficio.id))
    console.log('Beneficio eliminado correctamente')
    if (props.index !== undefined) {
      emit('form-eliminar', props.index)
    }
  } catch (error) {
    console.error('Error al eliminar beneficio:', error)
  }
}

const formChecked = async (val: boolean) => {
  check.value = val
  try {
    const beneficioRef = doc(db, 'beneficios', props.beneficio.id)
    await updateDoc(beneficioRef, { chequeado: val })
  } catch (error) {
    console.error('Error actualizando beneficio:', error)
  }
}

// const emitEditar = () => {
//   if (props.index !== undefined) {
//     emit('form-editar', props.index)
//   }
// }

// const emitEliminar = () => {
//   if (props.index !== undefined) {
//     emit('form-eliminar', props.index)
//   }
// }

watch(
  () => props.beneficio.logo,
  (newLogo) => {
    if (newLogo) {
      cargarImagen()
    } else {
      url.value = null
    }
  },
)

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
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  overflow: hidden;
}

.beneficiosCards:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.6);
}

.q-card-section:first-of-type {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 12px;
}

.text-h6 {
  font-weight: bold;
  font-size: 1.2rem;
  color: #4fc3f7;
}

.text-h6:hover {
  color: #81d4fa;
}

.q-subtitle {
  font-size: 1.1rem;
  font-weight: bold;
  color: #ffffff;
}

p {
  font-size: 0.95rem;
  line-height: 1.4;
  color: #cccccc;
  margin: 0;
  letter-spacing: 0.5px;
}

q-avatar img,
q-img {
  border-radius: 12px;
}

.q-btn-group .q-btn {
  transition:
    background-color 0.2s,
    transform 0.2s;
}

.q-btn-group .q-btn:hover {
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.08);
}
</style>
