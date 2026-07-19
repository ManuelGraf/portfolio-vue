<template>
  <div class="view view--home" id="Home" v-in-viewport>
    <!-- <vue-particles
        v-show="height"
        id="particle-background"
        :options="particlesOptions"
      >
      </vue-particles> -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {

  },
  data() {
    return {
      // same settings the old vue-particles component was fed, in
      // tsparticles options format
      particlesOptions: {
        fullScreen: { enable: false },
        particles: {
          color: { value: '#dedede' },
          number: { value: 80 },
          opacity: { value: 0.7 },
          shape: { type: 'circle' },
          size: { value: 4 },
          links: {
            enable: true,
            color: '#dedede',
            distance: 150,
            opacity: 0.4,
            width: 1
          },
          move: { enable: true, speed: 2 }
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'grab' },
            onClick: { enable: true, mode: 'push' }
          }
        }
      }
    }
  },
  computed: {
    height() {
      // NOTE: window.clientHeight does not exist, so this is always
      // undefined and the particles stay hidden — same (buggy) behavior
      // as the old Vue 2 site. Use window.innerHeight to re-enable them.
      return window.clientHeight;
    }
  }
}
</script>

<style lang="scss">
$bgcolor: $color-white;
$color: $color-black-lighter;
$color-spot: $color-green;

.view--home {
  @include curved-border($bgcolor, up);
  background: $bgcolor;
  color: $color-green-darkest;

  a,
  a:visited,
  a:hover {
    color: $color-spot;
  }
}

.view--home {
  // NOTE: no height change on scroll here — collapsing the section while it
  // is above the viewport shifts the whole document and makes the page jump
  background: white;
  min-height: 38vh;
  height: 100vh;

  @include viewport-print {
    #particle-background {
      display: none;
    }
  }

  #particle-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  #portrait {
    @include viewport-tablet {
      width: auto;
      height: $gs-bp;
    }

    width: $gs-ap;
    position:absolute;
    bottom:0;

    .logo-color-1 {
      fill: $color-spot
    }
  }
}
</style>
