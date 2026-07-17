<template>
  <div id="about" class="view view--about">
    <div class="view__content">

      <div class="about__header">
        <!-- <img id="portrait--print" src="img/manuel-graf-foto.1024x1024.jpg"
        alt="Manuel F. Graf. Code, Design & Musik München"> -->
        <img id="cv__logo" src="/img/bildmarke_rz_b.png" alt="Manuel F. Graf. Code, Design & Music in Germany,Munich">
        <section id="overview">
          <ul class="skills">
            <h3>Manuel F. Graf
              <br />
              <span class="title"> M.Sc. Media Informatics</span>
            </h3>
            <li>Web Frontend Engineer</li>
            <li>Immersive 3D & XR Developer</li>
            <li>Digital Media & Visual Design Specialist</li>
            <li>Human Centered Design Expert</li>
            <li>Explorative Creator</li>
            <li>Collaborative Team Player</li>
          </ul>
          <h4>Languages:</h4>
          <ul class="languages">
            <li>German (native)</li>
            <li>English (fluent)</li>
            <li>French (basics)</li>
          </ul>
        </section>
        <section id="info" class="show-only-in-print">
          <!-- <div class="about__info about__info--logo show-only-in-print">
            <img src="img/bildmarke_rz_b.png" alt="Manuel F. Graf Logo">
          </div> -->
          <div v-for="i in info" :key="i.label" :class="[
            'about__info',
            'about__info--' + i.label, ,
            'fas fa-' + i.icon,
            { 'show-only-in-print': i.hideinWeb },
            { 'about__info--divider': i.divider }
          ]">
            <span :class="'about__info__content about__info__content--' + i.label" v-html="i.content"></span>
          </div>
        </section>
      </div>
      <div class="divider"></div>
      <div class="headlines">
        <h2 class="view__headline hide-in-print">Curriculum Vitae</h2>
      </div>
      <cv></cv>
    </div>
  </div>
</template>

<script>
import cv from "@/components/Cv.vue";
import Portrait from "@/components/Portrait.vue";
import moment from "moment";

export default {
  components: {
    cv,
    Portrait
  },
  methods: {
    age() {
      let start = moment([1988, 4, 14]);
      let end = moment();
      let diff = end.diff(start, "years", false);
      return diff;
    }
  },
  data: function () {
    return {
      info: [
        {
          label: "name",
          content: "Manuel Graf",
          icon: "envelope",
        },
        {
          label: "address",
          content: "Forstenrieder Allee 63,<br> 81476 M&uuml;nchen",
          icon: null,
          hideinWeb: true,
        },
        { label: "mail", content: "mail@manuelgraf.com", icon: "at", hideinWeb: true },
        { label: "phone", content: "+49 176 65 88 28 56", icon: "phone", hideinWeb: true },
        {
          label: "web",
          content: "<a href='https://manuelgraf.com'>manuelgraf.com</a>",
          icon: "link",
          hideinWeb: true
        },

      ]
    };
  }
};
</script>

<style lang="scss">
$bg-about: $color-green;
$color-about: $color-green-darkest;
$color-spot: $color-black;

#cv__logo {
  display: none;

  @include viewport-tablet {}

  width: 5rem;
}


#overview {
  @media print {
    width: 100%;
    padding: 0;
    text-align: center;
  }

  text-align:center;


  .title {
    padding: 0 0 2em 0;
    margin-top: 2em;
    border-top: 1px solid $color-green-darker;
    font-size: $fontsize-m;
  }

  h3 {
    font-weight: normal
  }

}

#overview ul {
  list-style-type: none;

  li {
    margin-bottom: $gs-a*.1rem;
    margin-top: $gs-b*.1rem;
    font-size: 12px;
  }
}



.about__header {
  @include viewport-tablet {
    width: 100%;
  }

  padding-top:10rem;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
}

.about__portrait {
  margin-bottom: 1rem;

  img {
    width: auto;
  }

  width: $gs-bp;
  overflow: hidden;
  float: left;

  #portrait {
    height: 100%;
    position: relative;
    transform: translate3D(0, 0, 0);

    img {
      width: 100%;
      height: auto;
    }
  }
}

#info {}


.about__info {

  width: $gs-ap;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;

  // &--name,
  // &--name &__content {
  //   font-size: $fontsize-l !important;
  //   margin: 1rem;
  // }
  &--logo img {

    width: 4rem;
    align-self: center;
  }

  &--divider {
    padding-bottom: 1rem;
    border-bottom: 1px solid $color-green-darker
  }

  &__content {
    font-weight: bold;
    font-family: $font-base;
    font-size: $fontsize-base;
    flex: 0 0 90%;

    @media print {
      font-size: 12px;

    }
  }

  &__icon {
    // flex: 0 0 2rem;
    // text-align: center;
    // position: absolute;
    // left: 0px;
    // top: 5px;
    // transform: translate3d(-150%, 0, 0);
  }
}

.view--about {
  @include curved-border($bg-about, up);

  @include viewport-tablet {
    flex-direction: column;
  }

  background: $bg-about;
  color: $color-about;

  .view__content {
    flex-direction: column;
  }

  a,
  a:visited,
  a:hover {
    color: $color-spot;
  }
}
</style>
