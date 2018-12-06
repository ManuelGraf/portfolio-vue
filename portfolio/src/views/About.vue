<template>
  <div id='about' class="view view--about" v-scroll-spy>
    <div class="view__content">
      <section class="about-info" id="info">
        <div class="about-info__row row">
          <div class="">
            Manuel Graf
          </div>
        </div>
        <div class="about-info__row row">
          <div class="">
            <PhoneNumber></PhoneNumber>
          </div>
        </div>
        <div class="about-info__row row">
          <div class="">
            M.Sc. Medieninformatik
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
      cv,
    }
  }
</script>

<style lang="scss">
  $bgcolor-about: $color-green;
  $color-about: $color-green-darkest;
  .view--about{
    @include curved-border($bgcolor-about,up);
    background: $bgcolor-about;
    color: $color-green-darkest;
  }
</style>
