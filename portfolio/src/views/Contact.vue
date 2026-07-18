<template>
  <div id="contact" class="view view--contact">
    <div class="view__content">
      <h2 class="view__headline">Get in touch</h2>
      <ul class="contact-items">
        <li class="contact-item">
          <a href="mailto:mail@manuelgraf.com" target="_blank">
            <span class="fas fa-envelope"></span>Email
          </a>
        </li>
        <li class="contact-item">
          <a href="https://www.linkedin.com/in/manuel-graf-70186a15/" target="_blank">
            <span class="fab fa-linkedin-in"></span>LinkedIn
          </a>
        </li>
        <li class="contact-item">
          <a href="https://www.xing.com/profile/Manuel_Graf4/" target="_blank">
            <span class="fab fa-xing"></span>Xing
          </a>
        </li>
        <li class="contact-item">
          <a href="https://twitter.com/Manuel_Graf" target="_blank">
            <span class="fab fa-twitter"></span>Twitter
          </a>
        </li>
        <li class="contact-item">
          <a href="https://www.facebook.com/manuel.f.graf" target="_blank">
            <span class="fab fa-facebook"></span>Facebook
          </a>
        </li>
      </ul>
      <div class="imprint">
        <h5 class="imprint__label">Imprint</h5>
        <p>
          Manuel Frederik Graf — M.Sc. Media Informatics, IHK Media Designer<br>
          Forstenrieder Allee 63, 81476 München · mg@apfelkuh.de · UstID 147/150/00
        </p>
      </div>
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
$color-contact: $ink-yellow;   // #8a6600, warmer than before

.view--contact {
  @include curved-border($background-contact, up);
  @include viewport-print { display: none; }
  background: $background-contact;
  padding-top: 12%;
  text-align: center;

  .view__content {
    flex-direction: column;   // headline above the icon row, also on tablet+
    align-items: center;
  }
  .view__headline { color: $color-contact; }
  a { color: $color-contact; }
}

.contact-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px 48px;
  margin-top: 3.5rem;
  padding: 0;
  list-style: none;

  @include viewport-tablet { gap: 48px; }
}

.contact-item a {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: $color-contact;
  font-family: $font-condensed;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: transform $duration-instant;

  &:hover { transform: translateY(-3px); }

  span::before { font-size: 24px; }
  span {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: $color-contact;
    color: $background-contact;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.imprint {
  margin: 4.5rem auto 0;
  max-width: 560px;
  border-top: 1px solid rgba($color-contact, 0.4);
  padding-top: 1.5rem;
  color: $color-contact;
  font-size: 13px;
  line-height: 1.8;

  &__label {
    font-family: $font-condensed;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 0 0 0.5rem;
  }
}
</style>

