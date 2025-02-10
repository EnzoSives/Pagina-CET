import { defineStore } from 'pinia'
import { auth } from 'src/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth'

interface AuthState {
  user: User | null
  loading: boolean
  token: string | null
  tokenExpiration: number | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    token: null,
    tokenExpiration: null,
  }),

  actions: {
    async register(email: string, password: string) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await this.handleUserAuth(userCredential.user)
      } catch (error: any) {
        console.error('Error en el registro:', error.message)
        throw error
      }
    },

    async login(email: string, password: string) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        await this.handleUserAuth(userCredential.user)
      } catch (error: any) {
        console.error('Error al iniciar sesión:', error.message)
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
      } catch (error: any) {
        console.error('Error al cerrar sesión:', error.message)
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
})
