import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {

      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})
export default router
