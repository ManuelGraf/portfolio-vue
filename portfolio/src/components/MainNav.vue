<template lang="de">
  <div class="main-nav">
    <ul class="nav-items">
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
  .main-nav{
    position:fixed;
    display:flex;
    flex-direction: column;
    right: 1rem;
    top: 1rem;
    z-index: 50;

    .nav-item{
      color: rgb(random($limit: 255),random($limit: 255),random($limit: 255))
    }
    &--left{
      left:0;
      right:auto;
    }
  }
</style>
