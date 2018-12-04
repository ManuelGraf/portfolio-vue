<template>
  <div id='about' class="view view--about" v-scroll-spy>
    <h1>Hello World!</h1>
    <section>

    </section>
    <h2>Welcome to my page</h2>
    <h3>Curriculum Vitae</h3>
    <cv> </cv>
  </div>
</template>


<script>
import cv from '@/components/Cv.vue';
  export default {
    components:{
      cv
    }
  }
</script>

<style lang="scss">
  $bgcolor-about: $color-petrol;
  $color-about: $color-bluegrey;
  .view--about{
    @include curved-border($bgcolor-about,up);
    background: $bgcolor-about;
  }
</style>
