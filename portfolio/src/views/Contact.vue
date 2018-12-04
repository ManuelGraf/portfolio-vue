<template>
  <div id="contact" class="view view--contact">
    <ul>
      <li class="contact-item">
        <a href target="_blank" class="fas fa-twitter">Twitter</a>
      </li>
      <li class="contact-item">
        <a href target="_blank" class="fas fa-facebook-square">Facebook</a>
      </li>
      <li class="contact-item">
        <a href target="_blank" class="fas fa-lastfm-square">Last.fm</a>
      </li>
      <li class="contact-item">
        <a href target="_blank" class="fas fa-music">freesound</a>
      </li>
      <li class="contact-item">
        <a href target="_blank" class="fas fa-deviantart">Deviantart</a>
      </li>
      <li class="contact-item">
        <a href target="_blank" class="fas fa-envelope"></a>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "contact",
  data: function() {
    return {
    };
  },
  methods: {
  },
  components: {}
};
</script>

<style lang="scss">
.view--contact {
  background: $color-bluegrey;
}
</style>

