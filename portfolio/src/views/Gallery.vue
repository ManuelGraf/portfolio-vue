<template>
  <div id="gallery" class="view view--gallery">
    <h3 class="view__headline">What I do</h3>
    <div class="view__content">
      <p class="col-8">
        I am still trying to integrate some components I built to this web site. Please wait. <br/>
        For now, please visit one of my web profiles, which contain some things I made like Logos, Videos, Sound Effects etc:
      </p>
      <ul class="col-4 profiles">
        <li class="profile-item fas fa-music">
          <a href target="_blank" class="">freesound.org</a>
        </li>
        <li class="profile-item fab fa-deviantart">
          <a href="https://www.deviantart.com/yummieee" target="_blank" class="">Deviantart</a>
        </li>
        <li class="profile-item fab fa-deviantart">
          <a href="https://logopond.com/yummie/profile/17039" target="_blank" class="">Logopond</a>
        </li>
      </ul>
      <!-- <demo-placeholder>
        <h4 slot="placeholder">3D Data Visualization </h4>
        <globe-scene slot="demo"></globe-scene>
      </demo-placeholder>-->
    <div class="col-12">
      <h3 class="view__headline">Digital Stufff I make</h3>
    </div>
    <div class="col-4">
      <a href="/demos/drawer/index.html" target="_blank">
        <h4>Simple Browser Paint</h4>
        <img src="https://via.placeholder.com/150" alt="">
      </a>
    </div>
    <div class="col-4">
      <a href="/demos/drawer/index.html" target="_blank">
        <h4>3D Interactive Globe</h4>
        <img src="https://via.placeholder.com/150" alt="">
      </a>
    </div>
    <div class="col-4">
      <a href="/demos/drawer/index.html" target="_blank">
        <h4>Virtual Reality</h4>
        <img src="https://via.placeholder.com/150" alt="">
      </a>
    </div>
    <div class="col-4">
      <a href="/demos/drawer/index.html" target="_blank">
        <h4>programming 3D Graphics :)</h4>
        <img src="https://via.placeholder.com/150" alt="">
      </a>
    </div>
    <div class="col-12">
      <h3 class="view__headline">Print Stufff I made</h3>
    </div>
    <div class="col-4">
      <a href="/demos/drawer/index.html" target="_blank">
        <h4>Logo Design</h4>
        <img src="https://via.placeholder.com/150" alt="">
      </a>
    </div>
    <div class="col-12">
      <h3 class="view__headline">Artsy Stuff I make</h3>
    </div>
    <div class="col-4">
      <a href="/demos/drawer/index.html" target="_blank">
        <h4>Lasers + Wood = Love!</h4>
        <img src="https://via.placeholder.com/150" alt="">
      </a>
    </div>
    <div class="col-4">
      <a href="/demos/drawer/index.html" target="_blank">
        <h4>Sketching Scenarios, Game Art.</h4>
        <img src="https://via.placeholder.com/150" alt="">
      </a>
    </div>
    </div>
  
    
  </div>
</template>

<style lang="scss">
$bgcolor-gallery: $color-petrol;
$color-gallery: $color-petrol-lightest;
.view--gallery {
  @include curved-border($bgcolor-gallery, up);
  background: $bgcolor-gallery;
  color: $color-gallery;
  a{
    color: $color-gallery;
  }

  .profiles{
    list-style-type: none;
    font-size: $fontsize-l;
  }
  .profile-item{
    display:block;
    a{
      font-family: $font-serif;
      padding-left:10px;
    }
  }
}
</style>

<script>
import DemoPlaceholder from "@/components/DemoPlaceholder";
// import GlobeScene from '@/components/GlobeScene'
export default {
  components: {
    DemoPlaceholder
    // GlobeScene
  }
};
</script>


