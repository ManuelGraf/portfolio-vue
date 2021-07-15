<template>
  <div id="contact" class="view view--contact">
    <ul class="contact-items">
      <li class="contact-item">
        <a href="mailto:mail@manuelgraf.com" target="_blank">
          <span class="fas fa-envelope"></span>
          Email
        </a>
      </li>
      <li class="contact-item">
        <a href="https://www.facebook.com/manuel.f.graf" target="_blank">
          <span class="fab fa-facebook"></span>
          Facebook
        </a>
      </li>
      <li class="contact-item">
        <a href="https://www.linkedin.com/in/manuel-graf-70186a15/" target="_blank">
          <span class="fab fa-linkedin-in"></span>
          LinkedIn
        </a>
      </li>

      <li class="contact-item">
        <a href="https://twitter.com/Manuel_Graf" target="_blank">
          <span class="fab fa-twitter"></span>
          Twitter
        </a>
      </li>
      <li class="contact-item">
        <a href="https://www.xing.com/profile/Manuel_Graf4/" target="_blank">
          <span class="fab fa-xing"></span>
          Xing
        </a>
      </li>
    </ul>
    <div class="divider"></div>
    <div class="imprint">
      <p>
        Owner: Manuel Frederik Graf
        <br>M.Sc. Media informatics, IHK Media Designer
        <br>
        <br>Address: Forstenrieder Allee 63, 81476 München
        <br>Email: mg@apfelkuh.de
        <br>UstID: 147/150/00
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "contact",
  data: function() {
    return {};
  },
  methods: {},
  components: {}
};
</script>

<style lang="scss">
$background-contact: $color-yellow;
$color-contact: $color-yellow-darkest;
.view--contact {
  @include curved-border($background-contact, up);
  @include viewport-print {
    display: none;
  }
  padding-top: 16%;
  padding-left: 64px;
  a {
    color: $color-yellow-darkest;
  }

  background: $background-contact;
}
.imprint {
  color: $color-contact;
  font-size: $fontsize-s;
}

.contact-items {
  display: flex;
  flex-flow: row wrap;
}
.contact-item {
  font-size: $fontsize-l;
  color: $color-contact;
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
  flex: 1 1 60%;
  width: 50%;
  & a {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-contact;
    flex: 1 1 50%;
  }
  & span::before {
    border-radius: 50%;
    color: $background-contact;
    background: $color-contact;
    padding: 5px;
    width: 1.3em;
    height: 1.3em;
    display: block;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

