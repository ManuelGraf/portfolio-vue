<template lang="de">
  <div class="main-nav" v-bind:class="{'is-collapsed': isCollapsedOnMobile}">
    <ul class="nav-items" 
      v-scroll-spy-link 
      v-scroll-spy-active="{class: 'nav-item--active'}"
    >
      <li class="nav-item">
        <router-link to="/" class="nav-item-flex">
          <span  class="nav-item__icon fa fa-home"></span>
          <transition name="collapse">
            <span v-show="!isCollapsedOnMobile" transition="collapse" class="nav-item__label">Home</span>
          </transition>  
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about" class="nav-item-flex">  
         <span  class="nav-item__icon fa fa-info"></span> 
          <transition name="collapse">
            <span v-show="!isCollapsedOnMobile" transition="collapse" class="nav-item__label">About</span>
          </transition>  
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/gallery" class="nav-item-flex">  
          <span  class="nav-item__icon fa fa-briefcase"></span> 
          <transition name="collapse">
            <span v-show="!isCollapsedOnMobile" transition="collapse" class="nav-item__label">Gallery</span>
          </transition>  
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/contact" class="nav-item-flex">  
          <span class="nav-item__icon fa fa-at"></span> 
          <transition name="collapse">
            <span v-show="!isCollapsedOnMobile" transition="collapse" class="nav-item__label">Contact</span>
          </transition>  
        </router-link>
      </li>
    </ul>
  </div>
</template>



<style lang="scss">
.collapse-enter,
.collapse-leave-to {
  max-width: 0;
  display: none;
}
.collapse-enter-to,
.collapse-leave {
  max-width: 200px;
}
.collapse-enter-active,
.collapse-leave-active {
  transition: max-width $duration-noticeable ease;
}

.main-nav {
  @include viewport-tablet {
    max-width: 400px;
    max-height: 50%;
  }

  position: fixed;
  bottom: 3rem;
  display: flex;
  flex-direction: column;
  right: 0;
  z-index: 50;
  text-align: left;
  font-weight: 200;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  transition: all $duration-complex ease;
  border-top-left-radius: $min-tap /2;
  border-bottom-left-radius: $min-tap /2;
  margin:0;
  padding: 0 1rem 0 1rem;

  .nav-items {
    padding: 0;
    margin:0;
  }
  .nav-item {
    list-style-type: none;
    font-size: $fontsize-m;
    height: $min-tap;

    &-flex {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: $color-white-darkest;
    }

    &__label {
      opacity: 1;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      color: $color-black-lightest;
    }

    &__icon {
      width: $min-tap;
      transition: all $duration-complex ease;
      display: none;
    }
    a {
      $color: $color-white;
      text-decoration: none;
      transition: all $duration-noticeable ease;
    }
  }
  .nav-item--active {
    color: $color-petrol;
    font-size: $fontsize-l;
    .nav-item-flex{
      color: $color-white;
    }
  }
}
.main-nav.is-collapsed {
  background: $color-black-light;
  border-top-left-radius: $min-tap /2;
  border-bottom-left-radius: $min-tap /2;
  padding:0;
  .nav-item {
    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .nav-item-flex {
      width: 44px;
      height: 44px;
    }
    .nav-item--is-active {
      a {
        border-radius: 50%;
        border-bottom-left-radius: 20px;
        width: 66px;
        height: 66px;
        font-size: $fontsize-l;
        filter: url(#goo);
        background: rgba($color-black, 0.7);
      }
    }
  }
}
</style>

<script>
export default {
  data: function() {
    return {
      scrollPosition: 0
    };
  },
  components: {},
  computed: {
    isCollapsedOnMobile: function() {
      return this.scrollPosition > 50;
    }
  },
  methods: {
    onScroll(ev) {
      this.scrollPosition = window.scrollY;
    }
  },
  created: function() {
    window.addEventListener("scroll", this.onScroll.bind(this), false);
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll.bind(this), false);
  }
};
</script>

