import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    viewport:{
      height:Number,
      width:Number
    },
    breakpoint:String
  },
  mutations: {
    updateViewportHeight(state, viewport){
      state = viewport;
    }
  },
  actions: {

  }
})
