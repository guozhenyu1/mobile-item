import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 第三方的插件
// 导入 vant 组件 及 css样式
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入  rem 适配 模块
import 'amfe-flexible'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
