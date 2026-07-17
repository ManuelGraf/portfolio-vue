<script>
// @ is an alias to /src
import ViewContainer from '@/views/ViewContainer.vue'

import MainNav from '@/components/MainNav.vue'
import Logo from '@/components/Logo.vue'
import Orientation from 'screen-orientation'
import Offset from 'document-offset'
import ViewportSize from 'viewport-size'

export default {
    name: 'app',
    components: {
      ViewContainer,
      MainNav,
      Logo
    },
    data: function(){
      return{

      }
    },
    mounted: function() {
      // window.addEventListener('resize', this.onResize.bind(this)) geht nicht!!! wirdüberbindet?! no arrow functions for you!
      window.addEventListener('resize', this.onResize,true);
      window.addEventListener('scroll', this.onScroll,true);
      let viewport = this.getViewport();
      this.$store.commit('setViewport', viewport)
    },
    unmounted: function(){
      window.removeEventListener('resize', this.onResize, true)
      window.removeEventListener('scroll', this.onScroll, true)
    },
    methods: {
      onResize:function(ev){
        let viewport = this.getViewport()
        this.$store.commit('setViewport', viewport)
      },
      onScroll(){
        let views = document.querySelectorAll('.view');
        if (!views.length) return;
        let currentSection = views[0].id
        for (const view of views) {
          let offset = Offset(view);
          if(window.scrollY > offset.top && window.scrollY < offset.top + view.clientHeight) currentSection = view.id;
        }
        this.$store.commit('setCurrentView', currentSection)
      },
      getViewport(){
        let viewport = {};
        viewport.width = ViewportSize.getWidth();
        viewport.height = ViewportSize.getHeight();
        viewport.breakpoint = window.matchMedia('(min-width: 1024px) and (min-height: 768px)') ? 'tablet' : 'mobile'
        viewport.orientation = Orientation();
        viewport.sections=[];
        let views = document.querySelectorAll('.view');
        for (const view of views) {
          let offset = Offset(view);
          let o = {
            id:view.id,
            offset: offset
          }
          viewport.sections.push(o)
        }
        return viewport;
      },
      goBack () {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
      },
      setLocation (route) {
          this.$router.push(route)
      }
  }
}
</script>


<template>
<div id="app">
  <MainNav></MainNav>
  <Logo></Logo>
  <ViewContainer></ViewContainer>
</div>
</template>



<style lang="scss" >
@import '@/assets/styles/partials/View';
@import '@/assets/styles/partials/typo';
</style>
