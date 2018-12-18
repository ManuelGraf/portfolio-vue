<template>
  <div id='about' class="view view--about" v-scroll-spy>
    <div class="view__content">
      <div class="about__header">
        <div class="about__portrait">
          <Portrait></Portrait>
        </div>
        <section class="about__info" id="info">
          <div class="about__info__row row" 
            v-for="i in info" 
            :key="i.label"
          >
            <div :class="'about__info__'+i.icon">
              <span :class="'about__info__icon fas fa-'+i.icon"></span>                
              <span class="about__info__content" v-html="i.content"></span>                
            </div>
          </div>
        </section>
      </div>
        <h2 class="view__headline">Curriculum Vitae</h2>
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
          {"label": "nationality", "content":"deutsch", "icon": "globe" }
        ]
      }
    }
  }
</script>

<style lang="scss">
  $bg-about: $color-green;
  $color-about: $color-green-darkest;
  $color-spot: $color-black;

  .about__header{
    @include viewport-tablet{
      flex-direction: row;
      width:100%;       
    }
    flex-direction: column;        
    display:flex;
    align-items: center;
    justify-content: center;
  }

  .about__info{
    margin: 2rem 2rem 2rem 10%;

    &__row{
      position:relative;
      margin:5px;
      display:flex;
    }
    &__icon{
      position:absolute;
      left: 0px;
      top:5px;
      transform:translate3d(-150%,0,0)
    }
  }
  .view--about {
    @include curved-border($bg-about,up);
    @include viewport-tablet{
      flex-direction: column;
    }
    background: $bg-about;
    color: $color-about;

    .view__content{
      flex-direction:column;
    }

    a, a:visited, a:hover{
      color: $color-spot;
    }
  }
  .about__portrait{
    @include viewport-tablet{
      width: $gs-bp;
    }
    background: $color-white;
    border-radius: 50%;
    width: $gs-ap;
    overflow: hidden;
    float:left;

    #portrait{
      height:100%;
      position:relative;
      transform:translate3D(0, 0, 0)
    }
  }

</style>
