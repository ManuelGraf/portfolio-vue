import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
// import BootstrapVue from 'bootstrap-vue'
// Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import store from './store'



Vue.config.productionTip = false

new Vue({
  router,
  store,  
  render: h => h(App),
  data:{
    activeView:'home'
  }
}).$mount('#app')
