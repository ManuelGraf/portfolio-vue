<template>
  <div id="gallery" class="view view--gallery">
    <div class="view__content">
      <h2 class="view__headline">What I do</h2>
    </div>
    <div class="view__content">
      <p>
        This section still has a lot of placeholders, I will gather whats left of my work and present it here soon!
        <br>For now, please visit one of my web profiles, which contain some things I made like Logos, Videos, Sound Effects etc:
      </p>
      <ul class="profiles">
        <li class="profile-item fab fa-youtube">
          <a href="https://www.youtube.com/user/yumyumyummieee/" target="_blank" class>youtube</a>
        </li>
        <li class="profile-item fab fa-twitch">
          <a href="https://twitch.tv/yumyumyummieee/" target="_blank" class>Twitch</a>
        </li>
        <li class="profile-item fas fa-music">
          <a href="https://freesound.org/people/yummie/" target="_blank" class>freesound</a>
        </li>
        <li class="profile-item fab fa-deviantart">
          <a href="https://www.deviantart.com/yummieee" target="_blank" class>Deviantart</a>
        </li>
        <li class="profile-item fas fa-pencil-alt">
          <a href="https://logopond.com/yummie/profile/17039" target="_blank" class>Logopond</a>
        </li>
      </ul>
    </div>
    <div class="view__content">
      <h2 class="view__headline">Digital Stuff I made:</h2>
    </div>
    <div class="view__content">
      <div class="demos">
        <div class="gallery-entry" v-for="(item,index) in demos" :key="index">
          <h3 class="headline">{{ item.title }}</h3>
          <div class="demo">
            <div class="demo__preview">
              <a :href="item.links ? item.links[0].href: ''" target="_blank">
                <img :src="item.thumbImage" :alt="item.title">
              </a>
            </div>
            <div class="demo__description">
              <p v-html="item.description"></p>
              <ul class="description-links">
                <li class="description-link" v-for="(link,i) in item.links" :key="i">
                  <a target="_blank" :href="link.href">{{link.text}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="view__content">
      <div class="col-12">
        <h2 class="view__headline">Analog Stuff I made:</h2>
      </div>
    </div>
    <div class="view__content">
      <p
        class="empty"
      >I also like all kinds of traditional art. And laser cutters. Pictures of this are scattered everywhere and I didnt find the time to collect everything yet.</p>
    </div>
  </div>
</template>

<style lang="scss">
$bgcolor-gallery: $color-petrol;
$color-gallery: $color-petrol-lightest;
.description-links {
  list-style: none;
  margin-top: 1rem;
}
.description-link {
  margin-top: 0.3rem;
}
.description-link a,
.button {
  display: block;
  text-align: center;
  cursor: pointer;
  width: 100%;
  background: $color-gallery;
  color: $bgcolor-gallery !important;
  text-transform: uppercase;
  border-radius: 5px;
  text-decoration: none !important;
  font-weight: bold;

  &:hover {
    background: lighten($color-gallery, 20%);
  }
  &:active,
  &:focus {
    background: darken($color-gallery, 20%);
  }
}
.empty {
  font-size: $fontsize-m;
  text-align: center;
  opacity: 0.8;
  color: $color-gallery;
  padding-bottom: 100px;
}
.view--gallery {
  @include curved-border($bgcolor-gallery, up);
  background: $bgcolor-gallery;
  color: $color-gallery;

  .view__content {
    flex-direction: row;
  }

  .demos {
    max-width: $width-content-max;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    .gallery-entry {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      margin: 5rem 2rem 8rem 2rem;
      .demo {
        @include viewport-tablet {
          flex-direction: row;
        }
        flex-direction: column;
        display: flex;
      }
      .demo__description {
        @include viewport-tablet {
          margin-left:2rem;
          margin-right:2rem;
          margin-top: 0;
        }
        margin: 1rem 0 2rem 0;
        .list{
          list-style-type:circle;
          margin: 1rem 1.5rem;
        }
        a {
          // margin-left: 1rem;
          text-decoration: underline;
          cursor: pointer;
          color: rgba(255, 255, 255, 0.5);
        }
        p{
          padding-bottom:1rem;
        }
      }
      .headline {
        @include viewport-tablet {
          font-size:$fontsize-l;
          text-align:left
        }
        
        margin: 1rem 0 2rem 0;
        font-size:$fontsize-xl;
        text-align:center
      }
      .demo__preview {
        @include viewport-tablet {
          flex: 0 0 $gs-bp;
          }
        flex: 0;
        margin: 1rem 0;

        img {
          width: 100%;
          max-width: 100%;
          height: auto;
        }
      }
      .demo {
        flex: 0 0 $gs-ap;
      }
    }
  }

  a {
    color: $color-gallery;
  }

  .profiles {
    list-style-type: none;
    font-size: $fontsize-l;
    margin: 2rem 5rem 5rem 5rem;
  }
  .profile-item {
    display: block;
    margin: 2em;
    a {
      font-family: $font-condensed;
      padding-left: 10px;
    }
  }
}
</style>

<script>
import DemoPlaceholder from "@/components/DemoPlaceholder";
import Vue from "vue";
// import GlobeScene from '@/components/GlobeScene'
export default {
  components: {
    DemoPlaceholder
    // GlobeScene
  },
  data: function() {
    return {
      demos: [
      {
          title: "DEP.PIN",
          thumbImage: "/img/dep.pin.jpg",
          links: [
            {
              text: "download for Windows",
              href: "/demo/dep.pin-1.0.0.exe"
            }
          ],
          description:
            `Cross Platform Native App to keep npm packages updated and fixed to specific versions, which allows for easier security checks and licensing reports. <br> It eliminates guesswork in what npm packages your app <br>actually</br> uses. <br>
             Features: 
             <ul class="list">
              <li>select and pin dependencies from a list of all available versions</li>
              <li>npm audit GUI</li>
              <li>npm-check-updates GUI</li>
              <li>Github Changelogs for each possible update</li>
              </ul>
            `
        },
        {
          title: "Virtual Reality",
          thumbImage: "/img/BPVR.jpg",
          description:
          "Ever since last year of university, I research user interaction in virtual 3D (WebGL) environments. My Master thesis revolved around smartphone based Virtual Reality controls.<br/><br/> Currently, I am creating tools for facility managers and planners. And creating prototypes using new interaction concepts like gesture or speech input to enhance enhance control in those evironments."
          },
        {
          title: "Simple HTML keyboard Visualizer",
          thumbImage: "/img/keyboard.jpg",
          description:
          "A simple html file that can be used as a browser source in OBS to visualise the notes im playing on the MIDI keyboard."
          },

        {
          title: "3D Data Viz: Cluster Data on Globe",
          thumbImage: "/img/globe.jpg",
          yt: "qUQUSjc5jAA",
          playing: false,
          description:
            "Clustering of locations on a 3D globe inside of a WebGL scene in the browser. Locations and clusters are bound via Angular to the unprojected 3D scene coordinates that fit to actual GPS coordinates.",
          links: [
            {
              text: "Watch on youtube",
              href: "https://www.youtube.com/watch?v=qUQUSjc5jAA"
            }
          ]
        },
        {
          title: "Video Exergame: MagiKart",
          thumbImage: "/img/magikart.png",
          links: [
            {
              text: "Watch a test run on youtube",
              href: "https://www.youtube.com/watch?v=4_fhHUCZjbk"
            },
            {
              text: "Watch Full Design at Manuel Grafs Bachelor Thesis",
              href: "0_dl/BA_Manuel_Graf_final.pdf"
            },
            {
              text: "Project Files",
              href: "0_dl/BABFinclReverse.rar"
            },
            {
              text: "ReFit Systems",
              href: "https://www.refit-systems.com/de/gamo/"
            }
          ],
          yt: "4_fhHUCZjbk",
          playing: false,
          description:
          `<p>
              <strong>A Multiplayer "Serious Game" or "ExerGame"</strong> that was controlled by riding an ergometer and leaning from left to right for rehabilitation purposes.
              It was created by Manuel Graf and Michael Prummer under the supervision of Dr. Alejandro Mendoza Garcia. 
              It´s intended use was to offer a <strong>playful and appealing motivator for children to pursue cardio training</strong>.
            </p>
            <p>
              The topic of Manuel F. Graf´s Bachelor Thesis included <strong>developing an enticing multi player serious game</strong> (incl. game design, sport theory...) by using Dr. Mendoza Garcias MDC Connector for receiving Input from medical and non <strong>medical periphery devices</strong> (ergometers, motion sensors, heart rate monitors...).
              The main topic for the thesis was ho to create an engaging and motivating experience by combining motivation theory (sdt,...) and comparing Multi- vs single player games effects on exhaustion and cardio training success.
            </p>
            <p>
              The Game Design featured a game similar to popular battle racing games like Super Mario Kart that is controlled by the users body instead of input devices like gamepads.Acceleration was controlledd by cycling the ergometer and users were able to steer by physically leaning to the side. 
              The closer the user got to their optimal heart rate (adjusted to fitness level, age, condition) the better upgrades, easier steering and higher maximum speed. 
              A complete Game Design Document can be found at <a href="0_dl/BA_Manuel_Graf_final.pdf">Manuel Grafs Bachelor Thesis</a>
            </p>
            <p>
              For Information on the architecture of the Server-Client structure of the Game, please refer to <a href="https://www.xing.com/profile/Michael_Prummer" title="Michael Prummer auf Xing">Michael Prummer</a>  
            </p>`
        },
        {
          title: "Video Game: Underlord",
          thumbImage: "/img/underlord.png",
          links: [
            {
              text: "watch trailer on youtube",
              href: "https://www.youtube.com/watch?v=P9EKf6Z_g5Y"
            }
          ],
          yt: "P9EKf6Z_g5Y",
          playing: false,
          description:
            '<p>The <strong>poor Goblins</strong> fell under the Spell of a <strong>giant Rainbow-lazer Care Bear</strong>. Be a good Master and guide your minions back to the underworld with your unholy powers.</p> <p><strong>Underlord is a game which concept is like "Lemmings"</strong>. To surpass obstacles, you need to carry then over gaps or lift objects out of the way so they can pass freely. This game requires a motion sensor. We used the <strong>Intel Realsense Camera</strong> for development.</p> <p>This game is now part of the Gamo Rehabilitation Gaming System by ReFit Systems.</p>'
        },
        {
          title: "Video Game: Rise",
          thumbImage: "/img/rise.jpg",
          links: [
            {
              text: "watch Intro on youtube",
              href: "https://www.youtube.com/watch?v=VxfVAsfRoQ8&t=1s"
            }
          ],
          yt: "VxfVAsfRoQ8",
          playing: false,
          description:
            "<p>Unreal Engine Jump & Run Game for Unreal Development Seminar at LMU Munich. <br> I was responsible for project management, scripting and UI design/implementation. Within 3 months we managed to create 1-2h of gameplay Jump&run and run game in Unreal Engine.</p>"
        },
        {
          title: "YARA: Yet Aother Running App ",
          thumbImage: "/img/yara.png",
          links: [
            {
              text: "watch video on youtube",
              href: "https://www.youtube.com/watch?v=0vG63Cnq-Ro"
            }
          ],
          yt: "0vG63Cnq-Ro",
          playing: false,
          description:
            "<strong>Android App built for University.</strong> This App calculates the users current step frequency and polls an online API to match local music bpm. Playlists are generated accordingly."
        },
        {
          title: "Fat Ninja: iOS Sidescroller Game ",
          thumbImage: "/img/fatninja.png",
          links: [
            {
              text: "Watch the final presentation",
              href:
                "https://docs.google.com/presentation/d/e/2PACX-1vRbqfkrgJBCmnF5q7ecZrtM_LSbeuRvCz6bQsTf4hj2Uja5WqvNIrrIdnUvv8FLUkbb3UpX75j_UhFg/pub?start=false&loop=false&delayms=10000"
            },
            {
              text: "Watch 2D Trailer",
              href: "https://www.youtube.com/watch?v=QRYNYQylQAg"
            },
            {
              text: "Watch 3D Trailer",
              href: "https://www.youtube.com/watch?v=2-dd-OasPG4"
            }
          ],
          description:
            "<strong>iOs Sidescroller Game</strong>. I was responsible for Artwork, Animations, UI Design and Game Scripting."
        },
        {
          title: "Mindsumo",
          thumbImage: "/img/mindsumo.jpg",
          description:
            `<p>A <strong>Browser based Puzzle Game</strong> I created in a Hackathon when I couldnt sleep one night. 
            It is inspired by the idea, that a little Sumo protects your mind from unwanted thoughts at night.<br>
              </p><p>
            your goal is to push items out of the arena, that dont satisfy the stage's requirement, 
            e.g. if the stage says 'multiples of 10', you have to push out all numbers that are NOT multiples of 10.
            </p>`
        },
        {
          title: "Simple Browser Paint",
          thumbImage: "/img/sample.png",
          links: [
            {
              text: "watch it in action",
              href: "/demo/paint/index.html"
            }
          ],
          description:
            "A very basic painting app for browsers. It was build 2015 with jquery and html5 canvas"
        },
        {
          title: "Akabanga.de",
          thumbImage: "/img/akabanga.jpg",
          links: [
            {
              text: "Visit Website",
              href: "https://akabanga.de"
            }
          ],
          link: "https://akabanga.de",
          description:
            "Wordpress based Web Shop for Akabanga, a spicy oil from Rwanda."
        },
        {
          title: "Joachimgraf.com",
          thumbImage: "/img/joachimgraf.jpg",
          links: [
            {
              text: "Visit Website",
              href: "https://joachimgraf.com"
            }
          ],
          description: "A Website for the munich-based artist Joachim Graf"
        }
      ]
    };
  }
};
</script>


