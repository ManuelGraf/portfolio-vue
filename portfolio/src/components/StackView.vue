// ON ICE
<template lang="html">
  <div>
    <div class="stacked-view">
      <!-- transclude -->
    </div>
  </div>  
</template>

<script>

</script>

<style lang="scss">
  .stack{
    display:block;
    height:100vh;
    width: 100vw;
    transition: transform, top, .5s linear;
    top:0;
    left:0;

    &__view{
      display:block;
      width:100%;
      height:100%;
    }

    &--ltr{
      transition: transform, left, right, .5s linear;
    }

    &--rtl{
      transition: transform, right, right, .5s linear;
    }
  }
</style>
