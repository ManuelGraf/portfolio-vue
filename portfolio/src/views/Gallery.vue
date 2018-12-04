<template>
  <div id="gallery" class="view view--gallery"></div>
</template>

<style lang="scss">
  $bgcolor-gallery: $color-green;
  $color-gallery: $color-bluegrey;
  .view--gallery{
    @include diagonal-end($color-bluegrey,up);
    background: $bgcolor-gallery;
  }
</style>

