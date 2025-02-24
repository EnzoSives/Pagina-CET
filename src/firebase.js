import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// Configuración de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAZazMAJ5efvyBzY8HIr1r0rw6lzq-Ipfk',
  authDomain: 'mercados-c4010.firebaseapp.com',
  projectId: 'mercados-c4010',
  storageBucket: 'mercados-c4010.appspot.com',
  messagingSenderId: '486303123377',
  appId: '1:486303123377:web:8e9307e4d7d2753dfcdf90',
}

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig)

// Exportar instancias de Firebase
export const db = getFirestore(firebaseApp) // Firestore
export const storage = getStorage(firebaseApp) // Storage
export const auth = getAuth(firebaseApp) // Auth

// Manejar cambios en la autenticación
onAuthStateChanged(auth, (user) => {
  console.log('Firebase Auth State Changed')
  if (user) {
    console.log('Usuario autenticado:', user)
    // store.commit('setUser', user)
    // store.dispatch('setUserAction')
  } else {
    console.log('No hay usuario autenticado')
  }
})
