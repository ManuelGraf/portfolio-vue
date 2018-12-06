<template>
  <div id='about' class="view view--about" v-scroll-spy>
    <div class="view__content">
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
  export default {
    components:{
      cv      
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
  $bgcolor: $color-green;
  $color: $color-green-darkest;
  $color-spot: $color-black;
  .view--about{
    @include curved-border($bgcolor,up);
    background: $bgcolor;
    color: $color-green-darkest;

    a, a:visited, a:hover{
      color: $color-spot;
    }
  }

</style>
