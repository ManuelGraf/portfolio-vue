<template>
  <div class="view view--home" id="Home">
    <vue-particles
        v-show="height"
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {

  },
  computed:{
    height(){
      return window.clientHeight;
    }
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
  height:100vh;
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
                    