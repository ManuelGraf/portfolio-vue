<template>
  <div id='about' class="view view--about" v-scroll-spy>
    <div class="view__content">
      <section class="about-portrait">
        <Portrait></Portrait>
      </section>
      <section class="about-info" id="info">
        <div class="about-info__row row" 
          v-for="i in info" 
          :key="i.label"
        >
          <div :class="'about-info__'+i.icon">
            <span :class="'about-info__icon fas fa-'+i.icon"></span>                
            <span class="about-info__content" v-html="i.content"></span>                
          </div>
        </div>
       
      </section>
      <h3>Curriculum Vitae</h3>
      <cv> </cv>
    </div>
  </div>
</template>


<script>
import cv from '@/components/Cv.vue';
import Portrait from '@/components/Portrait.vue';
  export default {
    components:{
      cv,
      Portrait
    },
    data: function(){
      return {
        info:[
          {"label": "name", "content":"Manuel Graf", "icon": "info" },
          {"label": "title", "content":"M. Sc. Medieninformatik", "icon": "school" },
          {"label": "address", "content":"Forstenrieder Allee 63 <br /> 81476 M&uuml;nchen", "icon": "envelope" },
          {"label": "mail", "content":"mg@apfelkuh.de", "icon": "at" },
          {"label": "phone", "content":"+49 176 65 88 28 56", "icon": "phone" },
          {"label": "web", "content":"<a href='manuelgraf.com'>Website</a>", "icon": "link" },
          {"label": "marital", "content":"ledig", "icon": "ring" },
          {"label": "nationality", "content":"deutsch", "icon": "globe" },
        ]
      }
    }
  }
</script>

<style lang="scss">
  $bg-about: $color-green;
  $color-about: $color-green-darkest;
  $color-spot: $color-black;
  .view--about{
    @include curved-border($bg-about,up);
    background: $bg-about;
    color: $color-about;

    a, a:visited, a:hover{
      color: $color-spot;
    }
  }
  .about-portrait{
    background: $color-white;
    border-radius: 50%;
    padding:10px;
    width:250px;
    height:250px;
    overflow: hidden;

    #portrait{
      height:100%;
      position:relative;
      bottom:-20px;
      left: -20px;
    }
  }

</style>
