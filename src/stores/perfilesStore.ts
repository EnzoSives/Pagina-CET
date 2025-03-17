import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { db } from '../firebase' // Asegúrate de que tu Firebase esté bien inicializado
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useAuthStore } from 'src/stores/auth'

interface Perfil {
  id: string
  numeroCliente: string
  persona: string
  apellido: string
  nombre: string
  dni: string
  mail: string
  name: string
  datafirebase: any[]
  url: string
}

export const usePerfilStore = defineStore(
  'perfil',
  () => {
    const perfiles = ref<Perfil[]>([])
    const perfilIndex = ref<number>(0)
    const user = ref<User | null>(null)
    const admin = ref<boolean>(false)
    const loading = ref<boolean>(false)
    const isAuthenticated = ref<boolean>(false)
    const cuentasCobros = ref<any[]>([])
    const movimientosCuentasCobro = ref<any[]>([]) // Guardar movimientos de cuentas de cobro
    const authStore = useAuthStore()

    const url: string = 'https://miclub.cetpinamar.com.ar'

    // Computed para acceder a los perfiles
    const getPerfiles = computed(() => perfiles.value)
    const getPerfil = computed(() => perfiles.value[perfilIndex.value] || null)

    // Cargar usuario autenticado con suscripción a cambios de estado
    const loadUser = async () => {
      const auth = getAuth()
      const firebaseUser = await new Promise<User | null>((resolve) =>
        onAuthStateChanged(auth, resolve),
      )

      if (firebaseUser) {
        user.value = firebaseUser
        isAuthenticated.value = true
      } else {
        user.value = null
        isAuthenticated.value = false
      }
    }

    // Acción para obtener perfiles desde la API y Firebase
    const getPerfilesJCET = async () => {
      try {
        loading.value = true
        await loadUser() // Esperamos a que el usuario se cargue
        if (!isAuthenticated.value) {
          console.error('Usuario no autenticado')
          return
        }

        if (!user.value) {
          console.error('Usuario no autenticado')
          return
        }
        const idToken = await user.value.getIdToken()
        const response = await axios.get(`${url}/api/ov/clientesParaUsuario`, {
          headers: { 'X-Authorization': `Bearer ${idToken}` },
        })

        if (response.data.status !== 'OK') {
          console.error('Error en la respuesta de la API:', response.data)
          return
        }

        const result = response.data.result
        if (!Array.isArray(result)) {
          console.error('Formato de datos inesperado:', result)
          return
        }

        const processedPerfiles = await Promise.all(
          result.map(async (value: any) => {
            if (!value.persona || !value.persona.nombre) {
              console.warn('Perfil sin datos completos:', value)
              return null
            }

            try {
              const strPersona = value.persona.nombre.split(',')
              const strPersona2 = strPersona[1]?.split('(') || []
              if (strPersona2.length < 2) {
                console.warn('Formato inesperado en nombre:', value.persona.nombre)
                return null
              }

              const v_dni = strPersona2[1].substr(8, strPersona2[1].length - 9)

              // Buscar perfil en Firebase
              const querySnapshot = await getDocs(
                query(collection(db, 'perfiles'), where('dni', '==', v_dni)),
              )
              const p: any[] = []
              querySnapshot.forEach((doc) => {
                p.push({ ...doc.data(), id: doc.id })
              })

              return {
                id: value.eID,
                numeroCliente: value.numeroCliente,
                persona: value.persona.nombre,
                apellido: strPersona[0]?.trim() || '',
                nombre: strPersona2[0]?.trim().replace('(', '') || '',
                dni: v_dni,
                mail: user.value?.email || '',
                name: strPersona2[0]?.trim().replace('(', '') || '',
                datafirebase: p,
                url: 'https://firebasestorage.googleapis.com/v0/b/mercados-c4010.appspot.com/o/avatar-azul-indigo.png?alt=media&token=ddf9cb58-4512-46c4-9ced-f8fa8349fb4b',
              }
            } catch (innerError) {
              console.error('Error procesando perfil:', innerError)
              return null
            }
          }),
        )

        // Filtrar los perfiles no válidos y asignar al estado
        perfiles.value = processedPerfiles.filter((perfil) => perfil !== null)
      } catch (error) {
        console.error('Error obteniendo perfiles:', error)
      } finally {
        loading.value = false
      }
    }
    // Acción para obtener las cuentas de cobro
    const getCuentasCobro = async () => {
      try {
        const perfil = perfiles.value[perfilIndex.value] // Accedemos al perfil seleccionado por el índice
        if (!perfil) return

        const querySnapshot = await getDocs(
          query(collection(db, 'cuentasCobros'), where('dni', '==', perfil.dni)),
        )

        const cuentas: any[] = []
        querySnapshot.forEach((doc) => {
          cuentas.push(doc.data()) // Agrega las cuentas de cobro a la lista
        })

        cuentasCobros.value = cuentas // Asigna las cuentas al estado
      } catch (error) {
        console.error('Error obteniendo cuentas de cobro:', error)
      }
    }

    // Acción para obtener cuentas de cobro del perfil
    const getCuentasCobroPerfilJCETAction = async (nroCliente: string) => {
      try {
        await loadUser() // Asegurarte de que el usuario esté cargado
        // Asegúrate de que `user.value` es un objeto `User` y está autenticado
        if (!user.value || !user.value.getIdToken) {
          console.error('Usuario no autenticado o getIdToken no disponible')
          console.error('Usuario:', user.value)
          console.error('getIdToken:', user.value?.getIdToken)
          return
        }

        const idToken = await user.value.getIdToken()
        if (!idToken) {
          console.error('No se pudo obtener el token de autenticación.')
          return
        }

        const response = await axios.get(`${url}/api/ov/cuentasParaCliente`, {
          headers: {
            'X-Authorization': `Bearer ${idToken}`,
          },
          params: {
            cliente: 'eid-' + nroCliente, // Modificar según el formato que necesites
          },
        })

        if (response.status === 200 && response.data.status === 'OK') {
          cuentasCobros.value = response.data.result
          console.log('Cuentas de cobro obtenidas:', response.data.result)
        } else {
          console.error('Error al obtener las cuentas de cobro:', response.data)
        }
      } catch (error) {
        console.error('Error en la llamada a la API de cuentas de cobro:', error)
      }
    }

    const getMovimientosCuentasCobroPerfilJCET = async (x_nroCuenta: string) => {
      try {
        const auth = getAuth()
        user.value = auth.currentUser

        if (!user.value) {
          console.error('Usuario no autenticado')
          return
        }
        // 🔥 Limpiar movimientos antes de la nueva carga
        movimientosCuentasCobro.value = []

        const idToken = await user.value.getIdToken()
        const nroCuenta = `eid-${x_nroCuenta}` // Modificar el formato de la cuenta

        const response = await axios.get(
          'https://miclub.cetpinamar.com.ar/api/ov/movimientosParaCuentaCobro',
          {
            headers: { 'X-Authorization': `Bearer ${idToken}` },
            params: { cuenta: nroCuenta },
          },
        )

        if (response.status === 200 && response.data.status === 'OK') {
          movimientosCuentasCobro.value = response.data.result
          console.log('Movimientos obtenidos:', response.data.result)
        } else {
          console.error('Error en la respuesta de la API:', response.data)
        }
      } catch (error) {
        console.error('Error obteniendo movimientos de cuentas de cobro:', error)
      }
    }

    // Acción para seleccionar perfil
    const setPerfil = (index: number) => {
      if (index >= 0 && index < perfiles.value.length) {
        perfilIndex.value = index
      }
    }

    // Acción para cerrar sesión
    const logout = async () => {
      const auth = getAuth()
      await auth.signOut()
      perfiles.value = []
      user.value = null
      admin.value = false
      isAuthenticated.value = false
    }
    return {
      perfiles,
      perfilIndex,
      user,
      admin,
      loading,
      isAuthenticated,
      getPerfiles,
      getPerfil,
      getPerfilesJCET,
      setPerfil,
      logout,
      getCuentasCobroPerfilJCETAction,
      getCuentasCobro,
      cuentasCobros,
      getMovimientosCuentasCobroPerfilJCET,
      movimientosCuentasCobro,
    }
  },
  {
    persist: true, // Persistir el estado en localStorage
  },
)
