// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import './assets/css/style.css'
import httpPlugin from '@/assets/js/http'

Vue.use(ElementUI)
// 加载httpPlugin插件（封装自axios）
// 我们在插件中为vue原型对象扩展了一个成员$http
// 人后我们就可以在任何组件通过使用this.$http发起请求
Vue.use(httpPlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
