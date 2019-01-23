<template>
<div class="demo-collapse" :class="{'is-open': !isCollapsed}">
    <slot name="headline"></slot>
  <div  
    @click="toggle"
    class="demo__thumb"
     >
    <slot name="thumb"></slot>
  </div>
  <transition name="fade">
    <div class="demo__content"  v-if="!isCollapsed">
      <div class="close fa fa-times-circle" @click="toggle"></div>
      <slot name="demo">
      </slot> 
    </div>
  </transition>
</div>
</template>

<script>
  export default {
    data: function(){
      return {
        isCollapsed: true
      }
    },
    methods:{
      toggle: function () {
        this.isCollapsed = !this.isCollapsed;
      }
    }    
  }
</script>

<style lang="scss">
.demo-collapse{
  @include viewport-tablet{
    width:33%;
    padding:20px;
  }

  display:inline-block;
  text-align:center;
  transition: all $duration-complex ease;
  overflow:hidden;
  position:relative;
  box-sizing: border-box;
  padding:0;
  margin-bottom: 1.5rem;
  min-height:200px;
  transition: all $duration-complex ease;
  width:100%;


  &.is-open{
    width:100%;
    padding:0;
    margin:0;
    overflow:visible;

    .demo__thumb{
      transform: perspective(200rem) rotate3D(0,1,0,-100deg) ;
      transform-origin: 0% 50%;
      position:absolute;
    }
    .demo__content{
      background-color: rgba(0,0,0,0);
      max-height:100vh;
    }
  }

  .close{
    position:absolute;
    top:0;
    right:0;
    font-size: $fontsize-xxl;
    z-index:9;
  }
  .demo__thumb{
    transition: all $duration-complex ease;
    transform: perspective(200rem) rotate3D(0,1,0,0);
    transform-origin: 0% 0%;
    background:$color-petrol-dark;
    display:inline-block;
    width:100%;
    left:0;
    top:1.5em;
    position:absolute;
    z-index:10;
  }

  .demo__content{
    transition: all $duration-complex ease;
    background-color: rgba(0,0,0,1);
    position:relative;
    min-height: 200px;
    max-height: 200px;
    overflow:hidden;

    &.fade-enter,
    &.fade-leave-to {
      background-color: rgba(0,0,0,1);
      opacity:0
    }
    &.fade-enter-to,
    &.fade-leave {
     background-color: rgba(0,0,0,0);
     opacity:1;
    }
    &.fade-enter-active,
    &.fade-leave-active {
      transition: all $duration-complex ease;
    }

  }

  .demo__description{
    @include viewport-tablet{
      width: $gs-bp;
      position:absolute;
      right:0;
      top:0;
      background: rgba(0,0,0,0.8);
      z-index:5
    }

  }

  img{
    max-width: 100%;
  }
  .demo__content{
    @include viewport-tablet{
      flex-direction: row;
    }
    display:flex; 
    flex-direction: column;
    .demo__description{
      padding: 1.618%;
      @include viewport-tablet{
        width: $gs-bp;
        min-height:300px;
      }
      text-align:left;
      width:100%;
    }
    .demo__preview{
      @include viewport-tablet{
        width: 100%;
        min-height:300px;
      }
      width:100%;
    }
  }


}
</style>