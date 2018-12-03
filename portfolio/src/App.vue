<template>
<div id="container">
  <MainNav></MainNav>
  <Logo></Logo>
  <Home></Home>
  <About></About>
  <Gallery></Gallery>
  <Contact></Contact>    
</div>
</template>


<script>
// @ is an alias to /src
import MainNav from '@/components/MainNav.vue'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Gallery from '@/views/Gallery.vue'
import Contact from '@/views/Contact.vue'
import Logo from '@/components/Logo.vue'

export default {
    name: 'app',
    components: {
      MainNav,
      Home,
      About,
      Gallery,
      Contact,
      Logo
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
      afterLeave () {
        this.$root.$emit('triggerScroll')
      }
  }
}
</script>

<style lang="scss" >

</style>

