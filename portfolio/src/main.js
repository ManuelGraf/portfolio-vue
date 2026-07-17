import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'

import inViewport from './directives/in-viewport'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(Particles, {
  init: async engine => {
    await loadSlim(engine)
  }
})
app.directive('in-viewport', inViewport)

app.mount('#app')
