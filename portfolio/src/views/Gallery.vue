<template>
  <div id="gallery" class="view view--gallery">
    <div class="view__content">
      <div class="col-8">
        <h3>What I do</h3>
        <p>
          I am still trying to add some components I built to this web site. Please wait.
        </p>

      </div>
      <div>
        <p>
          For now please refer to some of my online Profiles:
        </p>

      </div>
      <!-- <demo-placeholder>
        <h4 slot="placeholder">3D Data Visualization </h4>
        <globe-scene slot="demo"></globe-scene>
      </demo-placeholder>  -->
    </div>
  </div>
</template>

<style lang="scss">
  $bgcolor-gallery: $color-magenta;
  $color-gallery: $color-magenta-lightest;
  .view--gallery{
    @include curved-border($bgcolor-gallery,up);
    background: $bgcolor-gallery;
  }
</style>

<script>
import DemoPlaceholder from '@/components/DemoPlaceholder'
// import GlobeScene from '@/components/GlobeScene'
export default {
  components:{
    DemoPlaceholder,
    // GlobeScene
  }
}
</script>


