<template>
    <div id='view-container' v-scroll-spy="{data: 'section'}">
        <Home></Home>
        <About></About>
        <Gallery></Gallery>
        <Contact></Contact>    
    </div>
</template>

<script>
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Gallery from '@/views/Gallery.vue'
import Contact from '@/views/Contact.vue'

    export default {
        data: function(){
            return {
                section: 0
            }
        },
        components:{
            Home,
            About,
            Gallery,
            Contact
        }
    }
</script>

<style scoped>
.over{
    position:fixed;
}
</style>