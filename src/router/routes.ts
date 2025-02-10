import type { RouteRecordRaw } from 'vue-router'
import DeportesPage from 'pages/DeportesPage.vue'
import SocioPage from 'pages/SocioPage.vue'
import InstitucionalPage from 'pages/InstitucionalPage.vue'
import LoginPage from 'src/pages/LoginPage.vue'
import RegisterPage from 'src/pages/RegisterPage.vue'
import AppCet from 'src/pages/AppCet.vue'
import BeneficiosPage from 'src/pages/BeneficiosPage.vue'

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
      { path: '/appcet', name: 'AppCet', component: AppCet },
      { path: '/beneficios', name: 'Beneficios', component: BeneficiosPage },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
