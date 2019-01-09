<template>
  <div id="gallery" class="view view--gallery">
    <h3 class="view__headline">What I do</h3>
    <div class="view__content">
      <p class="col-8">
        This section still has a lot of placeholders, I will gather whats left of my work and present it here soon!<br/>
        For now, please visit one of my web profiles, which contain some things I made like Logos, Videos, Sound Effects etc:
      </p>
      <ul class="col-4 profiles">
        <li class="profile-item fas fa-music">
          <a href="https://freesound.org/people/yummie/" target="_blank" class="">freesound.org</a>
        </li>
        <li class="profile-item fab fa-deviantart">
          <a href="https://www.deviantart.com/yummieee" target="_blank" class="">Deviantart</a>
        </li>
        <li class="profile-item fas fa-pencil-alt">
          <a href="https://logopond.com/yummie/profile/17039" target="_blank" class="">Logopond</a>
        </li>
      </ul>
    <div class="col-12">
      <h3 class="view__headline">Digital Stuff I made:</h3>
    </div>
    <div class="demos">
      <demo-placeholder v-for="(item,index) in demos" :key="index">
          <div slot="placeholder">
            <h4>{{ item.title }}</h4>
            <img :src="item.placeHolderImage" :alt="item.title">
          </div>
          <div class="demo__content" slot="demo">
            <div class="demo__preview col-a" v-if="!item.yt">
              <img :src="item.placeHolderImage" :alt="item.title">
            </div>
            <div class="demo__preview col-a" v-if="item.yt">
              <iframe width="100%" height="100%" :src="item.yt" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class="demo__description col-b" v-html="item.description">
              <p  v-html="item.description">
              </p>
              <p>
                <ul class="description-links">
                  <li class="description-link" v-for="(link,lind) in item.links" :key="lind">
                    <a :href="link.href">{{link.text}}</a>
                  </li>
                </ul>
                <a :href="item.link" target="_blank">
                  Watch it in action
                </a>
              </p>
            </div>
          </div>
      </demo-placeholder>
    </div>
  </div>
  </div>
</template>

<style lang="scss">
$bgcolor-gallery: $color-petrol;
$color-gallery: $color-petrol-lightest;
.view--gallery {
  @include curved-border($bgcolor-gallery, up);
  background: $bgcolor-gallery;
  color: $color-gallery;

  .view__content{
    flex-direction: row;
  }

  .demos{
    justify-content: flex-start;
    align-items: center;
    width:100%;
    display:flex;
    flex-direction: row;
    flex-wrap:wrap;
    overflow:hidden;
    padding:10px;
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
        width: $gs-ap;
        min-height:300px;
      }
      width:100%;
    }
  }

  a{
    color: $color-gallery;
  }

  .profiles{
    list-style-type: none;
    font-size: $fontsize-l;
  }
  .profile-item{
    display:block;
    a{
      font-family: $font-serif;
      padding-left:10px;
    }
  }
}
</style>

<script>
import DemoPlaceholder from "@/components/DemoPlaceholder";
import Vue from 'vue'
// import GlobeScene from '@/components/GlobeScene'
export default {
  components: {
    DemoPlaceholder
    // GlobeScene
  },
  data: function(){
    return {
      demos:[
        {
          title:'Virtual Reality',
          placeHolderImage: '/demo/paint/sample.png',
          description:'Ever since last year of university, I design user interaction in virtual 3D WebGL environments.'
        },
        {
          title:'Simple Browser Paint',
          placeHolderImage: '/demo/paint/sample.png',
          links:[
            {
             text: 'watch it in action',
             href: '/demo/paint/index.html'
            }
          ],
          description:'A very basic painting app for browsers. It was build 2015 with jquery and html5 canvas'
        },
        {
          title:'Video Exergame: MagiKart',
          placeHolderImage: 'https://via.placeholder.com/150',
          links:[
            {
             text: 'Watch a test run on youtube',
             href: 'https://www.youtube.com/watch?v=4_fhHUCZjbk'
            },
            {
             text: 'Watch Full Design at Manuel Grafs Bachelor Thesis',
             href: '/dl/Bachelor_Thesis_Manuel_Graf_Biofeedback_Exergame_2014.pdf'
            }
          ],
          yt: 'https://www.youtube.com/embed/4_fhHUCZjbk',
          description:'<p>A Multiplayer "Serious Game" or "ExerGame" that was controlled by riding an ergometer and leaning from left to right for rehabilitation purposes. It was created by Manuel Graf and Michael Prummer under the supervision of Dr. Alejandro Mendoza Garcia. It´s intended use was to offer a playful  and appealing motivator for children to pursue cardio training.</p><p>The topic of Manuel F. Graf´s Bachelor Thesis included developing an enticing multi player serious game (incl. game design, sport theory...) by using Dr. Mendoza Garcias MDC Connector for receiving Input from medical  and non medical periphery devices (ergometers, motion sensors, heart rate monitors...).The main topic for the thesis was ho to create an engaging and motivating experience by combining motivation theory (sdt,...) and comparing Multi- vs single player games effects on exhaustion and cardio training success. </p><p>The Game Design featured a game similar to popular battle racing games like Super Mario Kart that is controlled by the users body instead of input devices like gamepads.Acceleration was controlledd by cycling the ergometer and users were able to steer by physically leaning to the side. The closer the user got to their optimal heart rate (adjusted to fitness level, age, condition) the better upgrades, easier steering and higher maximum speed. A complete Game Design Document can be found at Manuel Grafs Bachelor Thesis: www.manuelgraf.com/dl/Bachelor_Thesis_Manuel_Graf_Biofeedback_Game</p><p>For Information on the architecture of the Server-Client structure of the Game, please refer to Michael Prummer: https://www.xing.com/profile/Michael_Prummer <p>'
        },
        {
          title:'Video Game: Underlord',
          placeHolderImage: '/demo/paint/sample.png',
          links:[
            {
             text: 'watch trailer on youtube',
             href: 'https://www.youtube.com/watch?v=ZotusbvVtDs&t=48s'
            },
            {
             text: 'ReFit Systems',
             href: 'https://www.refit-systems.com/de/gamo/'
            },
          ],
          yt: 'https://www.youtube.com/embed/ZotusbvVtDs',
          description:'<p>The poor Goblins fell under the Spell of a giant Rainbow laze Care Bear. Be a good Master and guide your minions back to the underworld with your unholy powers.</p> <p>Underlord is a game which concept is like "Lemmings". To surpass obstacles, you need to carry then over gaps or lift objects out of the way so they can pass freely. This game requires a motion sensor. We used the Intel Realsense Camera for development.</p> <p>This game is now part of the Gamo Rehabilitation Gaming System by ReFit Systems.</p>'
        },
        {
          title:'Video Game: Rise',
          placeHolderImage: '/demo/rise.png',
          links:[
            {
             text: 'watch trailer on youtube',
             href: 'https://www.youtube.com/watch?v=ZotusbvVtDs&t=48s'
            },
            {
             text: 'ReFit Systems',
             href: 'https://www.refit-systems.com/de/gamo/'
            },
          ],
          yt: 'https://www.youtube.com/embed/ZotusbvVtDs',
          description:'<p>The poor Goblins fell under the Spell of a Giant Rainbow Laser Care Bear. Be a good Master and guide your minions back to the underworld with your unholy powers.</p> <p>Underlord is a game which concept is like "Lemmings". To surpass obstacles, you need to carry then over gaps or lift objects out of the way so they can pass freely. This game requires a motion sensor. We used the Intel Realsense Camera for development.</p> <p>This game is now part of the Gamo Rehabilitation Gaming System by ReFit Systems.</p>'
        },
        {
          title:'YARA: Yet Aother Running App ',
          placeHolderImage: '/demo/yara.png',
          links:[
            {
             text: 'watch video on youtube',
             href: 'https://www.youtube.com/watch?v=0vG63Cnq-Ro'
            }
          ],
          yt:'https://www.youtube.com/embed/0vG63Cnq-Ro',
          description:'Android App build for University. This App calculates the users current step frequency and polls an online API to match local music bpm. Playlists are generated accordingly.'
        },
        {
          title:'Fat Ninja: iOS Sidescroller Game ',
          placeHolderImage: '/demo/fatninja.png',
          links:[
            {
             text: 'Watch the final presentation',
             href: 'https://docs.google.com/presentation/d/e/2PACX-1vRbqfkrgJBCmnF5q7ecZrtM_LSbeuRvCz6bQsTf4hj2Uja5WqvNIrrIdnUvv8FLUkbb3UpX75j_UhFg/pub?start=false&loop=false&delayms=10000'
            },
            {
             text: 'Watch 2D Trailer',
             href: 'https://www.youtube.com/watch?v=QRYNYQylQAg'
            },
            {
             text: 'Watch 3D Trailer',
             href: 'https://www.youtube.com/watch?v=2-dd-OasPG4'
            }
          ],
          description:'Android App build for University. This App calculates the users current step frequency and polls an online API to match local music bpm. Playlists are generated accordingly.'
        },
        {
          title:'Akabanga.de',
          placeHolderImage: '/demo/akabanga.jpg',
          links:[
            {
             text: 'Visit Website',
             href: 'https://akabanga.de'
            }
          ],
          link: 'https://akabanga.de',
          description:'Wordpress based Web Shop for Akabanga, a spicy oil from Rwanda. The shop is maintained by my father Joachim Graf.'
        },
        {
          title:'Joachimgraf.com',
          placeHolderImage: '/demo/joachimgraf.jpg',
          links:[
            {
             text: 'Visit Website',
             href: 'https://joachimgraf.com'
            }
          ],
          description:'A very basic painting app for browsers. It was build 2015 with jquery and html5 canvas'
        }
      ]
    }
  }
};
</script>


