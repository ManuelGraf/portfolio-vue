<template>
  <div class="expandable">
    <slot></slot>
  </div>
</template>

<script>

  export default {
    methods:{
      onClick:function(event){
        console.log('clicked')
      }
    }  
  }
</script>

<style scoped>

</style>