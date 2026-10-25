<template>
  <q-card class="benefit-card">
    <q-card-section class="benefit-card__header">
      <div class="benefit-card__brand">
        <q-avatar class="benefit-card__logo" size="56px">
          <q-img v-if="url" :src="url" :alt="beneficio.nombrefantasia" />
          <span v-else>{{ initials }}</span>
        </q-avatar>

        <div>
          <p v-if="beneficio.rubro" class="benefit-card__category">{{ beneficio.rubro }}</p>
          <h3>{{ beneficio.nombrefantasia }}</h3>
        </div>
      </div>

      <q-btn-group v-if="editable && perfilStore.admin" flat>
        <q-btn dense round icon="delete" color="red" outline @click="eliminarBeneficio" />
      </q-btn-group>
    </q-card-section>

    <q-card-section class="benefit-card__body">
      <q-toggle
        v-if="editable && perfilStore.admin && beneficio.chequeado !== undefined"
        v-model="check"
        label="Aprobado"
        dense
        @update:model-value="formChecked"
      />

      <h4 v-if="beneficio.titulo">{{ beneficio.titulo }}</h4>
      <p v-if="beneficio.descripcion">{{ beneficio.descripcion }}</p>
    </q-card-section>

    <q-card-section
      v-if="beneficio.direccion || beneficio.telefono"
      class="benefit-card__footer"
    >
      <div v-if="beneficio.direccion" class="benefit-card__meta">
        <q-icon name="place" size="17px" />
        <span>{{ beneficio.direccion }}</span>
      </div>

      <div v-if="beneficio.telefono" class="benefit-card__meta">
        <q-icon name="phone" size="17px" />
        <span>{{ beneficio.telefono }}</span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { storage } from 'src/firebase'
import { ref as storageRef, getDownloadURL } from 'firebase/storage'
import type { FirebaseError } from 'firebase/app'
import { usePerfilStore } from 'src/stores/perfilesStore'
import { db } from 'src/firebase'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'

const props = withDefaults(
  defineProps<{
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
  }>(),
  {
    editable: false,
  },
)

const emit = defineEmits<{
  (e: 'form-editar', index: number): void
  (e: 'form-eliminar', index: number): void
}>()

const perfilStore = usePerfilStore()
const url = ref<string | null>(null)
const check = ref(props.beneficio.chequeado ?? false)

const initials = computed(() =>
  props.beneficio.nombrefantasia
    ?.split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('') || 'C',
)

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
.benefit-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  margin: 0;
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.benefit-card:hover {
  transform: translateY(-2px);
  border-color: rgba(37, 99, 235, 0.24);
  box-shadow: var(--shadow-md);
}

.benefit-card__header {
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--color-border);
}

.benefit-card__brand {
  display: flex;
  gap: 12px;
  align-items: center;
  min-width: 0;
}

.benefit-card__logo {
  flex: 0 0 auto;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-size: 0.9rem;
  font-weight: 850;
}

.benefit-card__logo :deep(.q-img) {
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

.benefit-card__category {
  margin: 0 0 3px;
  color: #64748b;
  font-size: 0.74rem;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.benefit-card h3 {
  margin: 0;
  color: var(--color-text);
  font-size: 1.05rem;
  font-weight: 850;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

.benefit-card__body {
  flex: 1;
  padding: 16px;
}

.benefit-card__body h4 {
  margin: 0;
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.25;
}

.benefit-card__body p {
  margin: 10px 0 0;
  color: var(--color-text-soft);
  font-size: 0.94rem;
  line-height: 1.5;
}

.benefit-card__footer {
  display: grid;
  gap: 8px;
  padding: 14px 16px;
  border-top: 1px solid var(--color-border);
  background: #f8fafc;
}

.benefit-card__meta {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  color: var(--color-text-soft);
  font-size: 0.88rem;
  line-height: 1.35;
}

.benefit-card__meta .q-icon {
  margin-top: 1px;
  color: var(--color-primary);
}

.q-btn-group .q-btn {
  transition: background-color 0.2s, transform 0.2s;
}

.q-btn-group .q-btn:hover {
  transform: scale(1.1);
  background-color: var(--color-primary-soft);
}
</style>
