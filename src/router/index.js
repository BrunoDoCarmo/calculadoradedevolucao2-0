import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import NotaFiscalView from '../views/NotaFiscalView.vue'
import NotaFiscalDevolucao from '../components/NotaFiscalDevolucao.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/notafiscal',
    name: 'NotaFiscal',
    component: NotaFiscalView,
  },
  {
    path: '/devolucao',
    name: 'Devolucao',
    component: NotaFiscalDevolucao,
    props: route => ({ dados: route.params.dados })
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
