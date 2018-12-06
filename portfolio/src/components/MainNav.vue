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
         <span  class="nav-item__icon fa fa-home"></span> 
          <transition name="collapse">
            <span v-show="!isCollapsedOnMobile" transition="collapse" class="nav-item__label">About</span>
          </transition>  
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/gallery" class="nav-item-flex">  
          <span  class="nav-item__icon fa fa-home"></span> 
          <transition name="collapse">
            <span v-show="!isCollapsedOnMobile" transition="collapse" class="nav-item__label">Gallery</span>
          </transition>  
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/contact" class="nav-item-flex">  
          <span class="nav-item__icon fa fa-home"></span> 
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
  transition: max-width 1s ease;
}

.main-nav {
  @include viewport-tablet {
    max-width: 400px;
    max-height: 50%;
  }

  position: fixed;
  bottom: 3rem;
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
  right: 0;
  z-index: 50;
  text-align: left;
  font-weight: 200;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  transition: all $duration-complex ease;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  .nav-items {
    @extend %is-gooey;
  }
  .nav-item {
    list-style-type: none;
    font-size: $fontsize-m;
    height: $min-tap;

    .nav-item-flex {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    &__label {
      opacity: 1;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
    }

    &__icon {
      width: $min-tap;
      transition: all $duration-complex ease;
    }
    a {
      padding: 5px 10px;
      text-decoration: none;
      color: inherit;
      transition: all $duration-noticeable ease;
    }

    &--active {
      color: $color-black-lightest;
      color: $color-green;
      font-size: $fontsize-l;
    }
  }
  &--left {
    left: 0;
    right: auto;
  }

  &.is-collapsed {
    color: $color-white;

    .nav-item {
      a {
        border-radius: 50%;
        border-bottom-left-radius: 20px;
        width: 44px;
        height: 44px;
        filter: url(#goo);
        background: rgba($color-black, 0.7);
      }
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

