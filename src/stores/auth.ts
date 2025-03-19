import { defineStore } from 'pinia'
import { auth } from 'src/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'

interface AuthState {
  user: User | null
  loading: boolean
  token: string | null
  tokenExpiration: number | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    token: null,
    tokenExpiration: null,
    isAuthenticated: false,
  }),

  actions: {
    async register(email: string, password: string) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await this.handleUserAuth(userCredential.user)
      } catch (error: unknown) {
        console.error('Error en el registro')
        throw error
      }
    },

    async login(email: string, password: string) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        await this.handleUserAuth(userCredential.user)
      } catch (error: unknown) {
        console.error('Error al iniciar sesión')
        throw error
      }
    },

    async handleUserAuth(user: User) {
      this.user = user
      const tokenResult = await user.getIdTokenResult()
      this.token = tokenResult.token
      this.tokenExpiration = new Date(tokenResult.expirationTime).getTime()

      // Programar renovación automática del token
      this.scheduleTokenRefresh(tokenResult.expirationTime)
    },

    scheduleTokenRefresh(expirationTime: string) {
      const expirationDate = new Date(expirationTime).getTime()
      const now = Date.now()
      const delay = expirationDate - now - 5 * 60 * 1000 // 5 minutos antes de expirar

      if (delay > 0) {
        setTimeout(async () => {
          if (this.user) {
            await this.refreshToken()
          }
        }, delay)
      }
    },

    async refreshToken() {
      if (this.user) {
        const tokenResult = await this.user.getIdTokenResult(true) // Fuerza refresco
        this.token = tokenResult.token
        this.tokenExpiration = new Date(tokenResult.expirationTime).getTime()
        this.scheduleTokenRefresh(tokenResult.expirationTime)
      }
    },

    async logout() {
      try {
        await signOut(auth)
        this.$reset()
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('perfil')
        localStorage.removeItem('authStore')
        this.router.push('/')
      } catch (error: unknown) {
        console.error('Error al cerrar sesión')
        throw error
      }
    },

    async checkUser() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          await this.handleUserAuth(user)
        } else {
          this.user = null
          this.token = null
          this.tokenExpiration = null
        }
        this.loading = false
      })
    },
    async setUser(userData: any, authToken: string) {
      this.user = userData
      this.token = authToken
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', authToken)
    },

    async getCurrentToken() {
      if (this.user && this.token) {
        const now = Date.now()
        if (this.tokenExpiration && now < this.tokenExpiration) {
          return this.token
        }
        await this.refreshToken()
        return this.token
      }
      return null
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  persist: {
    key: 'authStore', // Clave en localStorage
    storage: localStorage, // Usa localStorage (puedes cambiarlo a sessionStorage)
  },
})
