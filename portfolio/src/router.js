import Vue from 'vue'
import Router from 'vue-router'
// https://www.npmjs.com/package/vue2-scrollspy
import Scrollspy, { Easing }  from 'vue2-scrollspy'

import HomeScreen from './views/Home.vue'
import AboutScreen from './views/About.vue'   
import WorkScreen from './views/Gallery.vue'   
import ContactScreen from './views/Contact.vue'   
import CV from './components/Cv.vue'   

Vue.use(Router)
Vue.use(Scrollspy, {
  easing: Easing.Cubic.In
})

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeScreen
  },
  {
    path: '/about',
    name: 'about',
    hash:'#about',
    component: AboutScreen
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: WorkScreen
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactScreen
  },
  {
    path: '/curriculum-vitae',
    name: 'cv',
    component: CV
  }
]

const scrollBehavior = function (to, from, savedPosition) {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    
    // scroll to anchor by returning the selector
    if (to.matched) {
      position.selector = '#'+to.matched[0].name;
      let el = document.querySelector(position.selector);

      // console.log(to.matched[0]);
      if (el) {
        // position.y = el.getClientBoundingRect().top;
          // return position
      }

      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      return false
    }

    return new Promise(resolve => {
      // check if any matched route config has meta that requires scrolling to top
      if (to.matched.some(m => m.meta.scrollToTop)) {
        // coords will be used if no selector is provided,
        // or if the selector didn't match any element.
        position.x = 0
        position.y = 0
      }

      // wait for the out transition to complete (if necessary)
      this.app.$root.$once('triggerScroll', () => {
        // if the resolved position is falsy or an empty object,
        // will retain current scroll position.
        resolve(position)
      })
    })
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
  scrollBehavior

})
