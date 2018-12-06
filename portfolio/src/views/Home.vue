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

$bgcolor: $color-white;
$color: $color-black-lighter;
$color-spot: $color-green;
.view--home{
  @include curved-border($bgcolor,up);
  background: $bgcolor;
  color: $color-green-darkest;

  a, a:visited, a:hover{
    color: $color-spot;
  }
}

.view--home{
  background:white;
  @include viewport-print{
    #particle-background{
      display:none;
    }
  }

  #portrait{
    @include viewport-tablet{
        width:auto;
        height:$gs-bp;
    }
    width: $gs-ap;
    position:absolute;
    bottom:0;
    .logo-color-1{
      fill: $color-spot
    }
  }
}
  
</style>
                    