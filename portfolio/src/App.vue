<script>
// @ is an alias to /src
import Vue from 'vue'
import ViewContainer from '@/views/ViewContainer.vue'

import MainNav from '@/components/MainNav.vue'
import Logo from '@/components/Logo.vue'
import InViewPortDirective from 'vue-in-viewport-directive'

Vue.directive('in-viewport', InViewPortDirective)
export default {
    name: 'app',
    components: {
      ViewContainer,
      MainNav,
      Logo,
      InViewPortDirective
    },
    data:function(){
      return{

      }
    },
    methods: {
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

</style>

