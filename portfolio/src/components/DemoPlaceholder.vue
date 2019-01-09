<template>
<div class="demo-collapse" :class="{'is-open': !isCollapsed}">
  <div  
    v-show="isCollapsed"
    @click="toggle"
    class="demo__placeholder"
     >
    <slot name="placeholder"></slot>
  </div>
  <div class="demo__content"  v-if="!isCollapsed">
    <div class="close fa fa-times-circle" @click="toggle"></div>
    <slot name="demo">
    </slot> 
  </div>
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
  &.is-open{
    width:100%;
  }

  display:inline-block;
  text-align:center;
  transition: all $duration-complex ease;
  // overflow:hidden;
  position:relative;
  box-sizing: border-box;
  padding:0;
  min-height:150px;
  transition: all $duration-complex ease;
  img{
    max-width: 100%;
  }

  width:100%;
  transition: all $duration-complex ease;
}
</style>