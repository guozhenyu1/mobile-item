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
// 引入 表单验证 插件
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'
// import { resolve } from 'url'

Vue.use(VeeValidate, {
  events: '' // 禁用默认事件验证
  // events: 'change'
})
Validator.localize('zh_CN', zhCN)

Vue.use(Vant)
Vue.prototype.$sleep = time => {
  return new Promise((resolve, reject) => {
    window.setTimeout(resolve, time)
  })
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
