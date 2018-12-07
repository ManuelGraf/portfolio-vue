import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    viewport:{
      breakpoint:String,
      height:Number,
      orientation:{direction:String,version:String},
      sections:Array,
      width:Number,
    },
    currentSection:String
  },
  actions:{
  },
  mutations: {
    setViewport(state, viewport){
      state = viewport;
    },
    setCurrentView(state, sectionId){
      state = sectionId;
    }
  },
  actions: {

  }
})
