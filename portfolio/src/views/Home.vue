<template>
  <div class="view view--home" id="Home">
    <particle-background></particle-background>
  </div>
</template>

<script>
// @ is an alias to /src
import ParticleBackground from '@/components/ParticleBackground.vue'

export default {
  name: 'home',
  components: {
    ParticleBackground
  }
}
</script>

<style lang="scss">
.view--home{
  background:white;
  @include diagonal-end($color-petrol,up);
}
  
</style>
                    