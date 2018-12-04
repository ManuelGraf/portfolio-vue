<template lang="de">
  <div class="main-nav" >
    <ul class="nav-items" 
      v-scroll-spy-link 
      v-scroll-spy-active="{class: 'nav-item--active'}"
    >
      <li class="nav-item">
        <router-link to="/">
          Home  
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about">  
          About
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/gallery">  
          Work
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/contact">  
          Contact
        </router-link>
      </li>
    </ul>
  </div>
</template>



<style lang="scss">
  .router-link{
  }
  .main-nav{
    position:fixed;
    display:flex;
    flex-direction: column;
    right: 3rem;
    bottom: 3rem;
    z-index: 50;
    transition: $duration-noticeable; 
    text-align:right;
    font-weight: 200;
    text-transform: uppercase;
    letter-spacing:.1rem;
    transition: all $duration-complex ease;



    .nav-item{
      list-style-type:none;
      font-size:$fontsize-m;  
      height: $min-tap;
      a{
        text-decoration:none;
        color:inherit;
        a:hover, a:visible{
          color:white;
          color: $color-black-lightest;
        }
      }

      &--active{
        color: $color-black-lightest;
        color: $color-green;
        font-size: $fontsize-l;
      }
    }
    &--left{
      left:0;
      right:auto;
    }
  }
</style>

<script>
export default {
   data:function(){
      return{
        section: 0
      }
    },
}
</script>

