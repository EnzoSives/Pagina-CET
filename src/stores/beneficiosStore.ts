import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { db } from 'src/firebase'
import { collection, getDocs, addDoc } from 'firebase/firestore'

interface Beneficio {
  id: string
  nombrefantasia: string
  titulo: string
  descripcion: string
  rubro: string
  direccion: string
  telefono: string
  logo?: string
  chequeado: boolean
}

export const useBeneficiosStore = defineStore('beneficios', () => {
  const beneficios = ref<Beneficio[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const fetchBeneficios = async () => {
    loading.value = true
    error.value = null
    try {
      const querySnapshot = await getDocs(collection(db, 'beneficios'))
      beneficios.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Beneficio[]
    } catch (err) {
      error.value = 'Error al cargar beneficios'
      console.error('Error al obtener beneficios:', err)
    } finally {
      loading.value = false
    }
  }

  const crearBeneficio = async (nuevoBeneficio: Omit<Beneficio, 'id'>) => {
    loading.value = true
    error.value = null
    try {
      const docRef = await addDoc(collection(db, 'beneficios'), nuevoBeneficio)
      beneficios.value.push({ id: docRef.id, ...nuevoBeneficio })
    } catch (err) {
      error.value = 'Error al crear beneficio'
      console.error('Error al crear beneficio:', err)
    } finally {
      loading.value = false
    }
  }

  const getBeneficios = computed(() => beneficios.value)

  return {
    beneficios,
    loading,
    error,
    fetchBeneficios,
    crearBeneficio,
    getBeneficios,
  }
})
