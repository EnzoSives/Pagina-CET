// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA25sJxyrbJd11shbwZhJCmJxWZZtT7cbA',
  authDomain: 'pagina-cet.firebaseapp.com',
  projectId: 'pagina-cet',
  storageBucket: 'pagina-cet.firebasestorage.app',
  messagingSenderId: '428069860679',
  appId: '1:428069860679:web:9b94ff0af820677f9cc862',
  measurementId: 'G-1T9WEEHNXF',
}

// Your web app's Firebase configuration
// var firebaseConfig = {
//   apiKey: "AIzaSyAZazMAJ5efvyBzY8HIr1r0rw6lzq-Ipfk",
//   authDomain: "mercados-c4010.firebaseapp.com",
//   projectId: "mercados-c4010",
//   storageBucket: "mercados-c4010.appspot.com",
//   messagingSenderId: "486303123377",
//   appId: "1:486303123377:web:8e9307e4d7d2753dfcdf90"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
// Inicializa Firebase

// Exporta auth
export const auth = getAuth(app)
