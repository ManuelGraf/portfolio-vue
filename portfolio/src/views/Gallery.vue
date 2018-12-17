<template>
  <div id="gallery" class="view view--gallery">
    <h3 class="view__headline">What I do</h3>
    <div class="view__content">
      <p class="col-8">
        This section still has a lot of placeholders, I will gather whats left of my work and present it here soon!<br/>
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
      <h3 class="view__headline">Digital Stuff I made:</h3>
    </div>
    <div class="demos">
      <div class="demo col-4">
        <a href="/demos/drawer/index.html" target="_blank">
          <h4>Video Exergame: MagiKart</h4>
          <img src="https://via.placeholder.com/150" alt="">
        </a>
      </div>
      <div class="demo col-4">
        <a href="/demos/drawer/index.html" target="_blank">
          <h4>Video Game: Underlord</h4>
          <img src="https://via.placeholder.com/150" alt="">
        </a>
      </div>
      <div class="demo col-4">
        <a href="/demos/drawer/index.html" target="_blank">
          <h4>YARA - Yet Another Running App</h4>
          <img src="https://via.placeholder.com/150" alt="">
        </a>
      </div>
      <div class="demo col-4">
        <a href="/demos/drawer/index.html" target="_blank">
          <h4>Akabanga.de</h4>
          <img src="https://via.placeholder.com/150" alt="">
        </a>
      </div>
      <div class="demo col-4">
        <a href="/demos/drawer/index.html" target="_blank">
          <h4>Joachimgraf.com</h4>
          <img src="https://via.placeholder.com/150" alt="">
        </a>
      </div>
      <div class="demo col-4">
        <a href="/demos/drawer/index.html" target="_blank">
          <h4>Simple Browser Paint</h4>
          <img src="https://via.placeholder.com/150" alt="">
        </a>
      </div>
      <div class="demo col-4">
        <a href="/demos/drawer/index.html" target="_blank">
          <h4>Virtual Reality Demo</h4>
          <img src="https://via.placeholder.com/150" alt="">
        </a>
      </div>
      <div class="demo col-4">
        <a href="/demos/drawer/index.html" target="_blank">
          <h4>Coding 3D Graphics :)</h4>
          <img src="https://via.placeholder.com/150" alt="">
        </a>
      </div>
    </div>
    <div class="col-12">
      <h3 class="view__headline">Print Stuff I made</h3>
    </div>
    <div class="demos">

      <div class="demo col-4">
        <a href="/demos/drawer/index.html" target="_blank">
          <h4>Logo Design</h4>
          <img src="https://via.placeholder.com/150" alt="">
        </a>
      </div>
    </div>
    <div class="demos">
      <div class="col-12">
        <h3 class="view__headline">Artsy Stuff I make</h3>
      </div>
      <div class="demo col-4">
        <a href="/demos/drawer/index.html" target="_blank">
          <h4>Lasers + Wood = Love!</h4>
          <img src="https://via.placeholder.com/150" alt="">
        </a>
      </div>
      <div class="demo col-4">
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

  .demos{
    justify-content: flex-start;
    align-items: center;
    width:100%;
    display:flex;
    flex-direction: row;
    flex-wrap:wrap;
    .demo{
      display:inline-block;
      text-align:center;
    }
  }

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


