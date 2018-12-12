<template>
<div class="demo-collapse">
  <div class="close">

  </div>
  <div  
    v-show="isCollapsed"
    @click="toggle" >
    <slot name="placeholder"></slot>
  </div>
  <slot name="demo">
  </slot>
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

<style scoped>
demo-collapse{
  width:100%
}
</style>