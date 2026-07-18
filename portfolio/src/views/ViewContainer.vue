<template>
    <div id='view-container'>
        <Home></Home>
        <About></About>
        <Gallery></Gallery>
        <Profiles></Profiles>
        <Contact></Contact>
    </div>
</template>

<script>
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Gallery from '@/views/Gallery.vue'
import Profiles from '@/views/Profiles.vue'
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
            Profiles,
            Contact
        }
    }
</script>

<style>
.over{
    position:fixed;
}
</style>
