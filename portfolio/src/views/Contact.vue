<template>
  <div id="contact" class="view view--contact">
    <div class="view__content">
      <h2 class="view__headline">Get in touch</h2>
      <ul class="contact-items">
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
      <footer class="contact-footer">
        <button type="button" class="contact-footer__link" @click="openImprint">Imprint</button>
      </footer>
    </div>
    <Teleport to="body">
      <div v-if="imprintOpen" class="imprint-overlay" @click.self="closeImprint">
        <div class="imprint" role="dialog" aria-modal="true" aria-labelledby="imprint-title">
          <button ref="imprintClose" type="button" class="imprint__close" aria-label="Close imprint"
            @click="closeImprint">
            <span class="fas fa-times"></span>
          </button>
          <h5 id="imprint-title" class="imprint__label">Imprint</h5>
          <p>
            Manuel Frederik Graf<br>
            M.Sc. Media Informatics, IHK Media Designer
          </p>
          <p>
            <span v-for="line in imprint.address" :key="line">{{ line }}<br></span>
          </p>
          <p>
            Email: <a :href="'mailto:' + imprint.mail">{{ imprint.mail }}</a><br>
            UstID 147/150/00
          </p>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
// @ is an alias to /src

// Imprint contact data is stored base64-encoded and only decoded/rendered when
// the overlay opens, so it never sits as plain text in the page or the bundle
// for address/email scrapers.
const IMPRINT = {
  address: ["Rm9yc3RlbnJpZWRlciBBbGxlZSA2Mw==", "ODE0NzYgTcO8bmNoZW4="],
  mail: "bWFpbEBtYW51ZWxncmFmLmNvbQ=="
};

function decode(b64) {
  return new TextDecoder().decode(Uint8Array.from(atob(b64), c => c.charCodeAt(0)));
}

export default {
  name: "contact",
  data: function() {
    return {
      imprintOpen: false,
      imprint: null
    };
  },
  methods: {
    openImprint() {
      this.imprint = {
        address: IMPRINT.address.map(decode),
        mail: decode(IMPRINT.mail)
      };
      this.imprintOpen = true;
      document.addEventListener("keydown", this.onKeydown);
      this.$nextTick(() => this.$refs.imprintClose.focus());
    },
    closeImprint() {
      this.imprintOpen = false;
      document.removeEventListener("keydown", this.onKeydown);
    },
    onKeydown(ev) {
      if (ev.key === "Escape") this.closeImprint();
    }
  },
  unmounted() {
    document.removeEventListener("keydown", this.onKeydown);
  },
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

.contact-footer {
  margin: 4.5rem auto 0;
  min-width: min(560px, 100%);
  border-top: 1px solid rgba($color-contact, 0.4);
  padding-top: 1rem;

  &__link {
    min-height: $min-tap;
    padding: 0 12px;
    background: none;
    color: $color-contact;
    font-family: $font-condensed;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    cursor: pointer;

    &:hover,
    &:focus-visible {
      text-decoration: underline;
      text-underline-offset: 4px;
    }
  }
}

// teleported to <body>, outside the section
.imprint-overlay {
  position: fixed;
  inset: 0;
  z-index: 100; // above nav (50) and logo
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba($color-black, 0.6);
}

.imprint {
  position: relative;
  width: 100%;
  max-width: 440px;
  padding: 28px 30px;
  border-radius: 8px;
  background: $color-yellow;
  box-shadow: $shadow-card;
  color: $ink-yellow;
  font-family: $font-base;
  font-size: 14px;
  line-height: 1.7;
  text-align: left;

  p + p {
    margin-top: 0.9rem;
  }

  a {
    color: $ink-yellow;
    text-decoration: underline;
  }

  &__label {
    font-family: $font-condensed;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 0 0 1rem;
  }

  &__close {
    position: absolute;
    top: 8px;
    right: 8px;
    width: $min-tap;
    height: $min-tap;
    border-radius: 50%;
    background: none;
    color: $ink-yellow;
    font-size: 18px;
    cursor: pointer;

    &:hover,
    &:focus-visible {
      background: rgba($ink-yellow, 0.12);
    }
  }
}
</style>

