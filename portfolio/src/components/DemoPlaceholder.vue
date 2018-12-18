<template>
<div class="demo-collapse">
  <div class="close">

  </div>
  <div  
    v-show="isCollapsed"
    @click="toggle"
    class="demo__placeholder"
     >
    <slot name="placeholder"></slot>
  </div>
  <div class="demo__content">
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
demo-collapse{
  width:100%;
  transition: all $duration-complex ease;
}
</style>