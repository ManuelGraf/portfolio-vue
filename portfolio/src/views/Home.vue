<template>
  <div class="view view--home" id="Home">
    <particle-background></particle-background>
    <Portrait></Portrait>
  </div>
</template>

<script>
// @ is an alias to /src
import ParticleBackground from '@/components/ParticleBackground.vue'
import Portrait from '@/components/Portrait.vue'

export default {
  name: 'home',
  components: {
    ParticleBackground,
    Portrait
  }
}
</script>

<style lang="scss">
$color-home: $color-petrol;
.view--home{
  background:white;
  #portrait{
    width: $gs-ap;
    position:absolute;
    bottom:0;
    .logo-color-1{
      fill:$color-home
    }

  }
}



  
</style>
                    