import type { RouteRecordRaw } from 'vue-router'
import DeportesPage from 'pages/DeportesPage.vue'
import SocioPage from 'pages/SocioPage.vue'
import InstitucionalPage from 'pages/InstitucionalPage.vue'
import LoginPage from 'src/pages/LoginPage.vue'
import RegisterPage from 'src/pages/RegisterPage.vue'
import AppCet from 'src/pages/AppCet.vue'
import BeneficiosPage from 'src/pages/BeneficiosPage.vue'
import AdmPerfiles from 'src/pages/AdmPerfiles.vue'
import HomePerfil from 'src/pages/HomePerfil.vue'
import MovimientosPage from 'src/pages/MovimientosPage.vue'
import AgenteN8N from 'src/pages/AgenteN8N.vue'
import CalendariosPage from 'src/pages/CalendariosPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/deporte/:deporte', name: 'DeportePage', component: DeportesPage, props: true },
      { path: '/socio', name: 'Socio', component: SocioPage },
      { path: '/institucional', name: 'Institucional', component: InstitucionalPage },
      { path: '/login', name: 'Login', component: LoginPage },
      { path: '/register', name: 'Register', component: RegisterPage },
      {
        path: '/beneficios',
        name: 'Beneficios',
        component: BeneficiosPage,
      },
      {
        path: '/calendarios',
        name: 'Calendarios',
        component: CalendariosPage,
      },
      // 🔒 Rutas protegidas
      { path: '/appcet', name: 'AppCet', component: AppCet, meta: { requiresAuth: true } },

      {
        path: '/perfiles',
        name: 'AdmPerfiles',
        component: AdmPerfiles,
        meta: { requiresAuth: true },
      },
      {
        path: '/homePerfil',
        name: 'HomePerfil',
        component: HomePerfil,
        meta: { requiresAuth: true },
      },
      {
        path: '/movimientos',
        name: 'Movimientos',
        component: MovimientosPage,
        meta: { requiresAuth: true },
      },
      {
        path: '/agenteia',
        name: 'AgenteIA',
        component: AgenteN8N,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
