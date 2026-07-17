import { createStore } from 'vuex'

export default createStore({
  state: {
    viewport: {
      breakpoint: String,
      height: Number,
      orientation: { direction: String, version: String },
      sections: Array,
      width: Number,
    },
    currentSection: String
  },
  actions: {
  },
  mutations: {
    setViewport(state, viewport) {
      state.viewport = viewport;
    },
    setCurrentView(state, sectionId) {
      state.currentSection = sectionId;
    }
  }
})
