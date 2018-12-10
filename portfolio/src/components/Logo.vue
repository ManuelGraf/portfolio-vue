<template>
  <div class="logo" v-in-viewport='-500'>
    <div class="logo-flex">
      <router-link to="/">
        <div class="logo-icon">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="65.633px"
            height="38.6px"
            viewBox="113.7 230.7 65.633 38.6"
            enable-background="new 113.7 230.7 65.633 38.6"
            xml:space="preserve"
          >
            <path
              class="eye"
              d="M166.7,261.9l-4.9-4.9l-4.1-4.1l0,0l-5.4,5.399l1.5,1.5l2.6,2.601c-3,1.399-6.4,1.5-9.4,0.199
              c-1.3-0.6-2.6-1.3-3.6-2.399c-1.5-1.5-2.5-3.3-3-5.3c-0.6-2.301-0.5-4.8,0.4-7.101l4.4,1.2l4.5,1.2l-1.2-4.5l-1.2-4.4
              c4-1.6,8.6-0.8,11.9,2.2l5-5c5.2,2.8,9.4,6.5,12,9.2c-3.9-5.8-13.1-17-25.7-17c-17,0-36.8,19.3-36.8,19.3s19.8,19.3,36.8,19.3
              c12.4,0,21.4-9.7,25.5-15C173.8,256.6,170.6,259.4,166.7,261.9z M134.4,260.8c0.3,0.601,0.7,1.3,1.1,1.9
              c-8.2-4.8-13.7-11.7-13.7-11.7s7.6-9.5,18.2-13.9l1.3,4.9l-5.2-1.4c-1.8,2.3-2.9,5-3.5,7.7C131.8,252.5,132.4,256.9,134.4,260.8z"
            ></path>
          </svg>
        </div>
      </router-link>
      <h1 class="logo-name">
        <span class="first-name">manuel</span>
        <span class="last-name">graf</span>
      </h1>
      <h2 class="subline">
        Code &amp;
        <span class="subline-graf">Graf</span>ik aus München.
      </h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  font-weight: 700;
  box-sizing: border-box;
  margin: 0;

  .logo-flex {
    position: absolute;
    z-index: 49;
    text-align: center;
    padding-top: 30%;
    width: 100%;
    height: 38.2%;
    padding: 0;
    margin: 0;
    background-color: rgba($color-black-light,0);
    transition: all $duration-noticeable ease;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }

  .logo-name {
    text-align: center;
    font-size: $fontsize-xl;
  }
  .subline {
    padding-top: 0.8rem;
    color: $color-black-light;
    font-size: $fontsize-s;
  }
  .subline-graf {
    color: $color-green;
  }
  .first-name {
    color: $color-black-light;
  }
  .last-name {
    color: $color-green;
  }

  .logo-icon {
    order: 1;
    // transition: all $duration-complex ease;
    svg {
      height: 60px;
      transition: all $duration-noticeable ease;

      // transition: all $duration-complex ease;
    }
  }
  .eye {
    fill: $color-black-light;
    transition: fill $duration-noticeable ease;
  }
}

.logo.above-viewport {
  .logo-flex {
    position: fixed;
    z-index: 49;
    top: 0;
    height: 30px;
    // padding:10px;
    background-color: rgba($color-black-light,1);
    height: 30px;
    flex-direction: row;
    justify-content: center;
  }

  .subline {
    display: none;
  }
  .subline {
    display: none;
  }
  .logo-name {
    font-size: $fontsize-s;
    padding:2px 0 0 0;
    margin:0;
    .first-name, .last-name{
      // font-weight:300;
      color:$color-white-darkest;

    }
  }
  .logo-icon {
    width:45px;
    svg {
      height: 12px;
      padding:0;
      margin:0;
      path {
        fill: white;
      }
    }
  }
}
</style>

<script>
export default {
  name: "logo",
  components: {},
  data: function() {
    return {};
  },
  computed: {
    viewPortHeight:function(){
      // return this.$state.viewport.width;
    },
    notCollapsed: function() {
      return this.$element.hasClass("in-viewport");
    }
  }
};
</script>
  
