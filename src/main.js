import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import store from './store'

Vue.config.productionTip = false

axios.defaults.baseURL='http://127.0.0.1:3000/'

axios.interceptors.request.use(config=>{
  config.headers.Authorization=window.sessionStorage.getItem('token')
  return config
})

Vue.prototype.$http=axios


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
