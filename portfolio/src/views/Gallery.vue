<template>
  <div id="gallery" class="view view--gallery">
    <div class="view__content">
      <demo-placeholder>
        <h4 slot="placeholder">3D Data Visualization </h4>
        <globe-scene slot="demo"></globe-scene>
      </demo-placeholder> 
    </div>
  </div>
</template>

<style lang="scss">
  $bgcolor-gallery: $color-green;
  $color-gallery: $color-bluegrey;
  .view--gallery{
    @include curved-border($color-green,up);
    background: $bgcolor-gallery;
  }
</style>

<script>
import DemoPlaceholder from '@/components/DemoPlaceholder'
import GlobeScene from '@/components/GlobeScene'
export default {
  components:{
    DemoPlaceholder,
    GlobeScene
  }
}
</script>


