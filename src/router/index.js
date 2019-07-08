import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/home',
      component: () => import('@/views/home')
    }
  ]
})
export default router
