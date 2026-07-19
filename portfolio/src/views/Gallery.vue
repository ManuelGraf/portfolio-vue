<template>
  <div id="gallery" class="view view--gallery">
    <div class="view__content">
      <h2 class="view__headline">What I do</h2>
    </div>
    <div class="view__content">
      <div class="gallery-filters">
        <button v-for="cat in categories" :key="cat" class="gallery-filter"
          :class="{ 'gallery-filter--active': cat === activeFilter }" @click="setFilter(cat)">
          {{ cat }} <span class="gallery-filter__count">{{ countFor(cat) }}</span>
        </button>
      </div>
    </div>
    <div class="view__content">
      <div class="project-grid" ref="grid">
        <div v-for="item in visibleDemos" :key="item.idx" class="project-card"
          :class="{ 'project-card--open': openIdx === item.idx }" :style="cardStyle(item)"
          @click="openCard(item.idx, $event)" @mousemove="onTilt(item.idx, $event)" @mouseleave="tilt = null">
          <!-- expanded state -->
          <template v-if="openIdx === item.idx">
            <div class="project-card__expanded">
              <div class="project-card__media">
                <img :src="item.thumbImage" :alt="item.title" />
                <span class="project-card__cat project-card__cat--badge">{{ item.cat }}</span>
              </div>
              <div class="project-card__body">
                <button class="project-card__close" @click.stop="openIdx = -1" aria-label="Close">✕</button>
                <h3 class="project-card__title">{{ item.title }}</h3>
                <div class="project-card__description" v-html="item.description"></div>
                <ul class="description-links" v-if="item.links && item.links.length">
                  <li class="description-link" v-for="(link, i) in item.links" :key="i">
                    <a target="_blank" :href="link.href" @click.stop>{{ link.text }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </template>
          <!-- collapsed state -->
          <template v-else>
            <div class="project-card__thumb">
              <img :src="item.thumbImage" :alt="item.title" />
              <div class="project-card__veil" :class="{ 'project-card__veil--on': isTilted(item.idx) }">
                <span class="project-card__pill">✦ View project</span>
              </div>
            </div>
            <div class="project-card__glare" :style="glareStyle(item.idx)"></div>
            <div class="project-card__meta">
              <div class="project-card__row">
                <h3 class="project-card__title project-card__title--small">{{ item.title }}</h3>
                <span class="project-card__cat">{{ item.cat }}</span>
              </div>
              <p class="project-card__teaser">{{ item.teaser }}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- <div class="view__content">
      <div class="col-12">
        <h2 class="view__headline">Analog Stuff I made:</h2>
      </div>
    </div>
    <div class="view__content">
      <p class="empty">I also like all kinds of traditional art. And laser cutters. Pictures of this are scattered
        everywhere and I didnt find the time to collect everything yet.</p>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeFilter: "All",
      openIdx: -1,
      cols: 3,
      tilt: null, // { i, rx, ry, gx, gy }
      demos: [
        {
          title: "ImageKeyer",
          thumbImage: "/img/imagekeyer.jpg",
          cat: "Tools",
          teaser: "Client-side web tool that removes background colors from images while preserving fine detail — nothing ever leaves your browser.",
          links: [
            { text: "Try it live", href: "https://manuelgraf.github.io/ImageKeyer/" },
            { text: "View on GitHub", href: "https://github.com/ManuelGraf/ImageKeyer" }
          ],
          description:
            `<p><strong>A fully client-side image keying tool</strong> for removing specific colors from images while keeping subject details intact. All processing happens in the browser — no uploads, no network requests (enforced by a strict Content Security Policy).</p>
             Features:
             <ul class="list">
              <li>pick colors to remove — and optionally colors to keep</li>
              <li>magic brush for erasing backgrounds, inspired by onOne Mask Pro</li>
              <li>decontamination of semi-transparent pixels to preserve glass, hair and smoke</li>
              <li>eraser, restore and pan brush modes with undo/redo</li>
              <li>touch support with two-finger zoom &amp; pan</li>
              <li>export as PNG or WebP with transparency, EXIF/GPS metadata stripped</li>
             </ul>
             <p>Built with React, TypeScript and Vite.</p>`
        },
        {
          title: "Coloroids",
          thumbImage: "/img/coloroids.jpg",
          cat: "Games",
          teaser: "A cosmic browser painting game: color grey asteroids with particle streams before the 3-minute timer runs out.",
          links: [
            { text: "Play the game", href: "https://manuelgraf.github.io/Coloroids/" },
            { text: "View on GitHub", href: "https://github.com/ManuelGraf/Coloroids" }
          ],
          description:
            `<p><strong>A browser-based cosmic painting game.</strong> Move your mouse (or finger) to direct a stream of color particles onto grey asteroids — once an asteroid is fully colored, it detonates and scores points. Small asteroids give 1 point, medium 2 and large 5.</p>
             <p>Grab <strong>Radius and Intensity Boost</strong> power-ups drifting through space, and watch out for <strong>black holes</strong> that swallow your particles and slow down time. High scores are saved locally in the browser — no backend needed.</p>
             <p>Remixed from Google AI Studio's "Cosmic Flow" mini-app and reengineered into a self-contained single-player experience. Built with TypeScript, three.js and Vite as a fully static site.</p>`
        },
        {
          title: "Teyvat Sports Day",
          thumbImage: "/img/teyvat-sports-day.jpg",
          cat: "Games",
          teaser: "A UGC sports competition for Genshin Impact's Miliastra Wonderland — who runs fastest, jumps highest and leaps furthest?",
          links: [
            { text: "View on miliastra.games", href: "https://miliastra.games/games/teyvat-sports-day-24784325698-en" }
          ],
          description:
            `<p><strong>A UGC game built with Genshin Impact's Miliastra Wonderland editor.</strong></p>
             <p>Put your favorite Teyvat characters to the test! Who can run the fastest, jumps the highest and leaps the furthest? Compare your own characters or compete against friends in a series of athletic challenges.</p>
             <p>Rated 10/10 by players on miliastra.games.</p>`
        },
        {
          title: "Creature Colosseum",
          thumbImage: "/img/creature-colosseum.jpg",
          cat: "Games",
          teaser: "Bet your Mora on monster battles in this Miliastra Wonderland party game — double your stake if your side wins.",
          links: [
            { text: "View on miliastra.games", href: "https://miliastra.games/games/creature-colosseum-7604456514-en" }
          ],
          description:
            `<p><strong>A UGC party game built with Genshin Impact's Miliastra Wonderland editor.</strong></p>
             <p>Creations battle each other in the Colosseum. You are granted some starting Mora and can bet on one of the sides — the bold are rewarded greatly: if your side wins, you <strong>double your stake</strong>. Win against the other betters by owning the most Mora after 5 rounds.</p>
             <p>For once, enjoy watching enemies smashing other enemies instead of yourself. Lean back and enjoy the show — while earning (or losing…) some Mora!</p>
             <p>90.91% player approval on miliastra.games.</p>`
        },
        {
          title: "Ice Bridging: Boar Rush",
          thumbImage: "/img/boar-rush.jpg",
          cat: "Games",
          teaser: "Cryo only! Freeze the river and guide boars home in this co-op Miliastra Wonderland game.",
          links: [
            { text: "View on miliastra.games", href: "https://miliastra.games/games/ice-bridging-boar-rush-11899423810-en" }
          ],
          description:
            `<p><strong>A UGC co-op game built with Genshin Impact's Miliastra Wonderland editor.</strong></p>
             <p>Cryo only! Freeze the river to build ice bridges and guide the boars safely home. A collaborative third-person challenge for you and your friends.</p>
             <p>Rated 9/10 by players on miliastra.games.</p>`
        },
        {
          title: "DEP.PIN",
          thumbImage: "/img/dep.pin.jpg",
          cat: "Tools",
          teaser: "Cross-platform native app to pin, audit and update npm dependencies — no more guesswork about what your app actually uses.",
          links: [
            { text: "download for Windows", href: "/demo/dep.pin-1.0.0.exe" }
          ],
          description:
            `Cross Platform Native App to keep npm packages updated and fixed to specific versions, which allows for easier security checks and licensing reports. <br> It eliminates guesswork in what npm packages your app <b>actually</b> uses. <br>
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
          cat: "VR & 3D",
          teaser: "Research on user interaction in WebGL/VR environments — from a Master thesis on smartphone-based VR controls to tools for facility planners.",
          description:
            "Ever since last year of university, I research user interaction in virtual 3D (WebGL) environments. My Master thesis revolved around smartphone based Virtual Reality controls.<br/><br/> Currently, I am creating tools for facility managers and planners. And creating prototypes using new interaction concepts like gesture or speech input to enhance enhance control in those evironments."
        },
        {
          title: "3D Data Viz: Cluster Data on Globe",
          thumbImage: "/img/globe.jpg",
          cat: "VR & 3D",
          teaser: "Location clustering on a WebGL globe — GPS coordinates bound via Angular into unprojected 3D scene space.",
          yt: "qUQUSjc5jAA",
          playing: false,
          description:
            "Clustering of locations on a 3D globe inside of a WebGL scene in the browser. Locations and clusters are bound via Angular to the unprojected 3D scene coordinates that fit to actual GPS coordinates.",
          links: [
            { text: "Watch on youtube", href: "https://www.youtube.com/watch?v=qUQUSjc5jAA" }
          ]
        },
        {
          title: "Simple HTML keyboard Visualizer",
          thumbImage: "/img/keyboard.jpg",
          cat: "Tools",
          teaser: "An HTML browser source for OBS that visualises the notes played on a MIDI keyboard.",
          links: [
            { text: "try with your keyboard", href: "/demo/midi-keyboard.html" }
          ],
          description:
            "A simple HTML file that can be used as a browser source in OBS to visualise the notes im playing on the MIDI keyboard."
        },
        {
          title: "Video Exergame: MagiKart",
          thumbImage: "/img/magikart.png",
          cat: "Games",
          teaser: "A multiplayer exergame controlled by riding an ergometer and leaning left/right — playful cardio rehabilitation for children (Bachelor thesis).",
          links: [
            { text: "Watch a test run on youtube", href: "https://www.youtube.com/watch?v=4_fhHUCZjbk" },
            { text: "Watch Full Design at Manuel Grafs Bachelor Thesis", href: "0_dl/BA_Manuel_Graf_final.pdf" },
            { text: "Project Files", href: "0_dl/BABFinclReverse.rar" },
            { text: "ReFit Systems", href: "https://www.refit-systems.com/de/gamo/" }
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
          cat: "Games",
          teaser: "A Lemmings-like motion-controlled game: guide goblins home using an Intel RealSense camera. Now part of the Gamo rehabilitation system.",
          links: [
            { text: "watch trailer on youtube", href: "https://www.youtube.com/watch?v=P9EKf6Z_g5Y" }
          ],
          yt: "P9EKf6Z_g5Y",
          playing: false,
          description:
            '<p>The <strong>poor Goblins</strong> fell under the Spell of a <strong>giant Rainbow-lazer Care Bear</strong>. Be a good Master and guide your minions back to the underworld with your unholy powers.</p> <p><strong>Underlord is a game which concept is like "Lemmings"</strong>. To surpass obstacles, you need to carry then over gaps or lift objects out of the way so they can pass freely. This game requires a motion sensor. We used the <strong>Intel Realsense Camera</strong> for development.</p> <p>This game is now part of the Gamo Rehabilitation Gaming System by ReFit Systems.</p>'
        },
        {
          title: "Mindsumo",
          thumbImage: "/img/mindsumo.jpg",
          cat: "Games",
          teaser: "A browser puzzle game built in one sleepless hackathon night — a little Sumo pushes unwanted thoughts out of your mind.",
          links: [
            { text: "play the game", href: "/demo/mindsumo/index.html" }
          ],
          description:
            `<p>A <strong>Browser based Puzzle Game</strong> I created in a Hackathon when I couldnt sleep one night.
            It is inspired by the idea, that a little Sumo protects your mind from unwanted thoughts at night.<br>
              </p><p>
            your goal is to push items out of the arena, that dont satisfy the stage's requirement,
            e.g. if the stage says 'multiples of 10', you have to push out all numbers that are NOT multiples of 10.
            </p>`
        },
        {
          title: "Video Game: Rise",
          thumbImage: "/img/rise.jpg",
          cat: "Games",
          teaser: "Unreal Engine jump&run built in 3 months at LMU Munich — project management, scripting and UI design.",
          links: [
            { text: "watch Intro on youtube", href: "https://www.youtube.com/watch?v=VxfVAsfRoQ8&t=1s" }
          ],
          yt: "VxfVAsfRoQ8",
          playing: false,
          description:
            "<p>Unreal Engine Jump & Run Game for Unreal Development Seminar at LMU Munich. <br> I was responsible for project management, scripting and UI design/implementation. Within 3 months we managed to create 1-2h of gameplay Jump&run and run game in Unreal Engine.</p>"
        },
        {
          title: "YARA: Yet Aother Running App ",
          thumbImage: "/img/yara.png",
          cat: "Mobile",
          teaser: "Android app that matches music BPM to your live step frequency and generates playlists accordingly.",
          links: [
            { text: "watch video on youtube", href: "https://www.youtube.com/watch?v=0vG63Cnq-Ro" }
          ],
          yt: "0vG63Cnq-Ro",
          playing: false,
          description:
            "<strong>Android App built for University.</strong> This App calculates the users current step frequency and polls an online API to match local music bpm. Playlists are generated accordingly."
        },
        {
          title: "Simple Browser Paint",
          thumbImage: "/img/sample.png",
          cat: "Tools",
          teaser: "A basic painting app for browsers, built 2015 with jQuery and HTML5 canvas.",
          links: [
            { text: "watch it in action", href: "/demo/paint/index.html" }
          ],
          description:
            "A very basic painting app for browsers. It was build 2015 with jquery and html5 canvas"
        },
        {
          title: "Fat Ninja: iOS Sidescroller Game ",
          thumbImage: "/img/fatninja.png",
          cat: "Games",
          teaser: "iOS sidescroller — artwork, animations, UI design and game scripting.",
          links: [
            {
              text: "Watch the final presentation",
              href: "https://docs.google.com/presentation/d/e/2PACX-1vRbqfkrgJBCmnF5q7ecZrtM_LSbeuRvCz6bQsTf4hj2Uja5WqvNIrrIdnUvv8FLUkbb3UpX75j_UhFg/pub?start=false&loop=false&delayms=10000"
            },
            { text: "Watch 2D Trailer", href: "https://www.youtube.com/watch?v=QRYNYQylQAg" },
            { text: "Watch 3D Trailer", href: "https://www.youtube.com/watch?v=2-dd-OasPG4" }
          ],
          description:
            "<strong>iOs Sidescroller Game</strong>. I was responsible for Artwork, Animations, UI Design and Game Scripting."
        },
        {
          title: "Akabanga.de",
          thumbImage: "/img/akabanga.jpg",
          cat: "Web",
          teaser: "WordPress web shop for Akabanga, a spicy oil from Rwanda.",
          links: [
            { text: "Visit Website", href: "https://akabanga.de" }
          ],
          link: "https://akabanga.de",
          description:
            "Wordpress based Web Shop for Akabanga, a spicy oil from Rwanda."
        },
        {
          title: "Joachimgraf.com",
          thumbImage: "/img/joachimgraf.jpg",
          cat: "Web",
          teaser: "A website for the Munich-based artist Joachim Graf.",
          links: [
            { text: "Visit Website", href: "https://joachimgraf.com" }
          ],
          description: "A Website for the munich-based artist Joachim Graf"
        }
      ]
    };
  },
  mounted() {
    this.measureCols();
    window.addEventListener("resize", this.measureCols);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.measureCols);
  },
  computed: {
    categories() {
      return ["All", "Tools", "Games", "VR & 3D", "Web", "Mobile"];
    },
    visibleDemos() {
      return this.demos
        .map((d, idx) => ({ ...d, idx }))
        .filter(d => this.activeFilter === "All" || d.cat === this.activeFilter);
    }
  },
  methods: {
    measureCols() {
      const grid = this.$refs.grid;
      if (!grid) return;
      this.cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    },
    countFor(cat) {
      return cat === "All" ? this.demos.length : this.demos.filter(d => d.cat === cat).length;
    },
    setFilter(cat) {
      this.activeFilter = cat;
      this.openIdx = -1;
      this.tilt = null;
    },
    openCard(idx, e) {
      if (this.openIdx === idx) return;
      this.openIdx = idx;
      this.tilt = null;
      const el = e && e.currentTarget;
      this.$nextTick(() => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const navOffset = 80; // keep clear of fixed nav
        // scroll only when the expanded card starts above the fold or too far down
        if (rect.top < navOffset || rect.top > window.innerHeight * 0.4) {
          window.scrollBy({ top: rect.top - navOffset, behavior: "smooth" });
        }
      });
    },
    isTilted(idx) {
      return this.tilt && this.tilt.i === idx && this.openIdx !== idx;
    },
    onTilt(idx, e) {
      if (this.openIdx === idx) return;
      const r = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      this.tilt = {
        i: idx,
        ry: (px - 0.5) * 16,
        rx: (0.5 - py) * 14,
        gx: Math.round(px * 100),
        gy: Math.round(py * 100)
      };
    },
    cardStyle(item) {
      const isOpen = this.openIdx === item.idx;
      if (isOpen) {
        // open card spans the full row; jump to the start of its own row
        const vi = this.visibleDemos.findIndex(d => d.idx === item.idx);
        const rowStart = Math.floor(vi / this.cols) * this.cols;
        return {
          gridColumn: "1 / -1",
          order: rowStart * 2,
          cursor: "default",
          boxShadow: "0 18px 50px rgba(0, 20, 21, 0.45)"
        };
      }
      const vi = this.visibleDemos.findIndex(d => d.idx === item.idx);
      const on = this.isTilted(item.idx);
      const rx = on ? this.tilt.rx : 0;
      const ry = on ? this.tilt.ry : 0;
      return {
        order: vi * 2 + 1,
        transform: `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(${on ? 22 : 0}px)`,
        transition: on
          ? "box-shadow 0.2s ease"
          : "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.45s ease",
        boxShadow: on
          ? `${(-ry * 1.6).toFixed(0)}px ${(rx * 1.6 + 24).toFixed(0)}px 44px rgba(0, 20, 21, 0.5)`
          : "0 8px 22px rgba(0, 20, 21, 0.3)"
      };
    },
    glareStyle(idx) {
      if (!this.isTilted(idx)) return { background: "none" };
      return {
        background: `radial-gradient(circle at ${this.tilt.gx}% ${this.tilt.gy}%, rgba(255,255,255,0.25), rgba(255,255,255,0) 55%)`
      };
    }
  }
};
</script>

<style lang="scss">
$bgcolor-gallery: $color-petrol;
$color-gallery: $color-petrol-lightest;

@keyframes gallery-grow {
  from {
    opacity: 0;
    transform: scale(0.96);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes gallery-fadeup {
  from {
    opacity: 0;
    transform: translateY(14px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
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

  a {
    color: $color-gallery;
  }

  // ---- filter chips ----
  .gallery-filters {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    margin: 1rem 1rem 2rem 1rem;
  }

  .gallery-filter {
    font-family: $font-base;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 0.04em;
    padding: 8px 18px;
    border-radius: 99px;
    cursor: pointer;
    border: 1.5px solid $color-gallery;
    background: rgba($color-white, 0.08);
    color: $color-gallery;
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s, color 0.2s;

    &:hover {
      transform: translateY(-2px) scale(1.06);
    }

    &__count {
      opacity: 0.6;
      font-weight: 400;
    }

    &--active {
      background: $color-green;
      border-color: $color-green;
      color: $color-black;
      transform: translateY(-2px) scale(1.06);
    }
  }

  // ---- project grid ----
  .project-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 26px;
    perspective: 1200px;
    width: 100%;
    max-width: $width-content-max;
    margin: 0 auto 4rem auto;
    padding: 0 1rem;

    @include viewport-tablet {
      grid-template-columns: repeat(3, 1fr);
      padding: 0;
    }
  }

  .project-card {
    background: $color-white;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    transform-style: preserve-3d;

    &__thumb {
      position: relative;
      overflow: hidden;

      img {
        width: 100%;
        height: 170px;
        object-fit: cover;
        display: block;
        background: #e7ecec;
        transition: transform 0.45s ease;
      }
    }

    &:hover &__thumb img {
      transform: scale(1.07);
    }

    &__veil {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(1, 42, 44, 0);
      transition: background 0.25s ease;

      &--on {
        background: rgba(1, 42, 44, 0.45);

        .project-card__pill {
          opacity: 1;
          transform: translateY(0) rotate(-2deg);
        }
      }
    }

    &__pill {
      background: $color-green;
      color: $color-black;
      font-family: $font-condensed;
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 10px 20px;
      border-radius: 99px;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
      opacity: 0;
      transform: translateY(14px);
      transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    &__glare {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    &__meta {
      padding: 14px 16px 18px 16px;
    }

    &__row {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      align-items: baseline;
    }

    &__title {
      font-family: $font-condensed;
      font-weight: 500;
      font-size: 28px;
      color: $color-black;
      margin: 0 0 12px 0;
      padding-right: 40px;

      &--small {
        font-size: 19px;
        margin: 0;
        padding-right: 0;
      }
    }

    &__cat {
      font-family: $font-base;
      font-weight: 600;
      font-size: 10px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: $bgcolor-gallery;
      background: #dcebeb;
      padding: 3px 8px;
      border-radius: 99px;
      white-space: nowrap;

      &--badge {
        position: absolute;
        left: 18px;
        bottom: 14px;
        font-size: 11px;
        letter-spacing: 0.12em;
        color: $color-black;
        background: $color-green;
        padding: 4px 12px;
      }
    }

    &__teaser {
      margin: 6px 0 0 0;
      font-size: 13px;
      line-height: 1.5;
      color: #5a6062;
      padding-bottom: 0;
    }

    // ---- expanded state ----
    &--open {
      animation: gallery-grow 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    &__expanded {
      display: flex;
      flex-direction: column;

      @include viewport-tablet {
        flex-direction: row;
      }
    }

    &__media {
      position: relative;
      flex: 0 0 auto;

      @include viewport-tablet {
        flex: 0 0 44%;
      }

      img {
        width: 100%;
        height: 220px;
        object-fit: cover;
        display: block;
        background: #e7ecec;

        @include viewport-tablet {
          height: 100%;
          min-height: 340px;
        }
      }
    }

    &__body {
      flex: 1;
      min-width: 0;
      padding: 26px 30px 28px 30px;
      position: relative;
      animation: gallery-fadeup 0.5s ease 0.1s both;
    }

    &__close {
      position: absolute;
      top: 14px;
      right: 14px;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: none;
      background: #e2efef;
      color: $bgcolor-gallery;
      font-size: 15px;
      cursor: pointer;
      line-height: 1;

      &:hover {
        background: $color-green;
        color: $color-black;
      }
    }

    &__description {
      font-size: 14px;
      line-height: 1.65;
      color: #3c4243;

      p {
        padding-bottom: 1rem;
      }

      .list {
        list-style-type: circle;
        margin: 1rem 1.5rem;
      }

      a {
        text-decoration: underline;
        cursor: pointer;
        color: $bgcolor-gallery;
      }
    }
  }

  .description-links {
    list-style: none;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 1rem;
    padding: 0;
  }

  .description-link a {
    display: block;
    text-align: center;
    cursor: pointer;
    background: $bgcolor-gallery;
    color: $color-white !important;
    text-transform: uppercase;
    border-radius: 6px;
    text-decoration: none !important;
    font-weight: bold;
    font-size: 12px;
    letter-spacing: 0.05em;
    padding: 11px 20px;

    &:hover {
      background: lighten($bgcolor-gallery, 15%);
    }

    &:active,
    &:focus {
      background: darken($bgcolor-gallery, 5%);
    }
  }
}
</style>
