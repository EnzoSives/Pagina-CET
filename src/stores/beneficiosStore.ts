import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { db } from 'src/firebase' // Asegúrate de importar correctamente Firebase
import { collection, getDocs } from 'firebase/firestore'

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

  // Cargar beneficios desde Firestore
  const fetchBeneficios = async () => {
    loading.value = true
    error.value = null
    try {
      const querySnapshot = await getDocs(collection(db, 'beneficios'))
      beneficios.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Beneficio[] // 👈 Convertimos a Beneficio[]
    } catch (err) {
      error.value = 'Error al cargar beneficios'
      console.error('Error al obtener beneficios:', err)
    } finally {
      loading.value = false
    }
  }

  // Computed para obtener la lista de beneficios
  const getBeneficios = computed(() => beneficios.value)

  return { beneficios, loading, error, fetchBeneficios, getBeneficios }
})
