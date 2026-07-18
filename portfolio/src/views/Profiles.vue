<template>
  <div id="profiles" class="view view--profiles">
    <h2 class="view__headline profiles__headline">Where I publish</h2>
    <p class="profiles__intro">Beyond client work, I publish things — videos, SFX, music and open source.</p>
    <div class="profiles-grid">
      <div class="profile-card profile-card--youtube">
        <div class="profile-card__header">
          <span class="profile-card__icon fab fa-youtube"></span>
          <span class="profile-card__title">YouTube</span>
          <span class="profile-card__caption">3 channels</span>
        </div>
        <a v-for="channel in channels" :key="channel.handle" :href="channel.url" target="_blank" rel="noopener"
          class="channel-row">
          <span v-if="channel.logoAvatar" class="channel-row__avatar channel-row__avatar--logo">
            <img :src="channel.avatar" :alt="channel.handle + ' avatar'" />
          </span>
          <img v-else :src="channel.avatar" :alt="channel.handle + ' avatar'" class="channel-row__avatar" />
          <span class="channel-row__text">
            <span class="channel-row__name">{{ channel.name }}
              <span class="channel-row__handle">{{ channel.handle }}</span>
            </span>
            <span class="channel-row__description">{{ channel.description }}</span>
          </span>
        </a>
      </div>
      <div class="profile-card profile-card--github">
        <div class="profile-card__header">
          <span class="profile-card__icon fab fa-github"></span>
          <span class="profile-card__title">GitHub</span>
          <span class="profile-card__caption">{{ ghStatusLabel }}</span>
        </div>
        <template v-if="ghStatus === 'loading'">
          <div v-for="n in 3" :key="n" class="repo-row repo-row--skeleton">
            <span></span><span></span><span></span>
          </div>
        </template>
        <template v-else>
          <a v-for="repo in repos" :key="repo.name" :href="repo.url" target="_blank" rel="noopener" class="repo-row">
            <span class="repo-row__name">{{ repo.name }}</span>
            <span class="repo-row__description">{{ repo.description }}</span>
            <span class="repo-row__meta">
              <span class="repo-row__lang" v-if="repo.language">
                <span class="repo-row__dot" :style="{ background: langColor(repo.language) }"></span>{{ repo.language }}
              </span>
              <span>updated {{ repo.updated }}</span>
            </span>
          </a>
        </template>
        <a href="https://github.com/ManuelGraf" target="_blank" rel="noopener" class="profile-card__button">
          All repos on GitHub
        </a>
      </div>
    </div>
    <ul class="profiles-links">
      <li v-for="link in secondaryLinks" :key="link.label" class="profiles-link">
        <a :href="link.url" target="_blank" rel="noopener">
          <span :class="link.icon"></span>{{ link.label }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import yummieAvatar from "@/assets/img/yummie_wave.png";
import musicAvatar from "@/assets/svg/bildmarke-inverted.svg";
import personalAvatar from "@/assets/img/facebook-profile.jpg";

const CHANNELS = [
  {
    name: "Yummie Plays",
    handle: "@yummieplays",
    url: "https://www.youtube.com/@yummieplays",
    avatar: yummieAvatar,
    description:
      "Gaming & game development — let's-plays, devlogs and hands-on guides how to create 3D Environments and Games with various Tools"
  },
  {
    name: "Manuel Graf Music",
    handle: "@manuelgrafmusic",
    url: "https://www.youtube.com/@manuelgrafmusic",
    // placeholder until the real channel avatar is available
    avatar: musicAvatar,
    logoAvatar: true,
    description:
      "My original music — compositions, game scores and documenting my own learning progress."
  },
  {
    name: "Manuel F. Graf",
    handle: "@manuelfgraf",
    url: "https://www.youtube.com/@manuelfgraf",
    avatar: personalAvatar,
    description:
      "My personal channel — projects that doesn't fit neatly anywhere else."
  }
];

const SECONDARY_LINKS = [
  { label: "Twitch", icon: "fab fa-twitch", url: "https://twitch.tv/yumyumyummieee/" },
  { label: "DeviantArt", icon: "fab fa-deviantart", url: "https://www.deviantart.com/yummieee" },
  { label: "Logopond", icon: "fas fa-pencil-alt", url: "https://logopond.com/yummie/profile/17039" },
  { label: "Freesound", icon: "fas fa-music", url: "https://freesound.org/people/yummie/" }
];

// shown when the GitHub API is unreachable or rate-limited
const REPO_SNAPSHOT = [
  {
    name: "portfolio-vue",
    url: "https://github.com/ManuelGraf/portfolio-vue",
    description: "my personal portfolio app with vueJS",
    language: "Vue",
    updated: "Jul 2026"
  },
  {
    name: "Coloroides",
    url: "https://github.com/ManuelGraf/Coloroides",
    description: "A small three js game in which you have to color passing asteroids with particles.",
    language: "TypeScript",
    updated: "Jul 2026"
  },
  {
    name: "ImageKeyer",
    url: "https://github.com/ManuelGraf/ImageKeyer",
    description: "An Application to help Erase certian Hues from an Image",
    language: "TypeScript",
    updated: "Jul 2026"
  }
];

const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Vue: "#41b883",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  "C#": "#178600",
  "C++": "#f34b7d",
  GDScript: "#355570",
  Python: "#3572A5",
  PHP: "#4F5D95"
};

const GH_API = "https://api.github.com/users/ManuelGraf/repos?sort=pushed&per_page=12";
const GH_CACHE_KEY = "profiles-gh-repos";
const GH_CACHE_MAX_AGE = 60 * 60 * 1000; // 1h, stays under the 60 req/h API limit

export default {
  name: "profiles",
  data: function () {
    return {
      channels: CHANNELS,
      secondaryLinks: SECONDARY_LINKS,
      repos: [],
      ghStatus: "loading" // 'loading' | 'live' | 'snapshot'
    };
  },
  computed: {
    ghStatusLabel() {
      if (this.ghStatus === "live") return "● live · GitHub API";
      if (this.ghStatus === "snapshot") return "cached snapshot";
      return "loading…";
    }
  },
  mounted() {
    this.loadRepos();
  },
  methods: {
    langColor(language) {
      return LANGUAGE_COLORS[language] || "#cfcfcf";
    },
    formatMonth(iso) {
      return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
    },
    mapRepos(list) {
      return list
        .filter(repo => !repo.fork)
        .slice(0, 3)
        .map(repo => ({
          name: repo.name,
          url: repo.html_url,
          description: repo.description || "No description yet.",
          language: repo.language,
          updated: this.formatMonth(repo.pushed_at)
        }));
    },
    readCache() {
      try {
        const cached = JSON.parse(localStorage.getItem(GH_CACHE_KEY));
        if (cached && Date.now() - cached.time < GH_CACHE_MAX_AGE) return cached.data;
      } catch (e) {
        /* corrupt cache — ignore */
      }
      return null;
    },
    async loadRepos() {
      const cached = this.readCache();
      if (cached) {
        this.repos = this.mapRepos(cached);
        this.ghStatus = "live";
        return;
      }
      try {
        const res = await fetch(GH_API);
        if (!res.ok) throw new Error("GitHub API " + res.status);
        const data = await res.json();
        this.repos = this.mapRepos(data);
        this.ghStatus = "live";
        try {
          localStorage.setItem(GH_CACHE_KEY, JSON.stringify({ time: Date.now(), data }));
        } catch (e) {
          /* storage full/blocked — just skip caching */
        }
      } catch (e) {
        this.repos = REPO_SNAPSHOT;
        this.ghStatus = "snapshot";
      }
    }
  }
};
</script>

<style lang="scss">
$background-profiles: $color-magenta;

@keyframes profiles-pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.45;
  }
}

.view--profiles {
  @include curved-border($background-profiles, up);

  @include viewport-print {
    display: none;
  }

  background: $background-profiles;
  padding: 2rem 3rem 5rem;

  @include viewport-mobile {
    padding: 2rem 1rem 4rem;
  }
}

.profiles__headline {
  color: $color-magenta-text-bright;
}

.profiles__intro {
  font-size: $fontsize-m;
  line-height: 1.6em;
  text-align: center;
  color: $color-magenta-text;
  max-width: 560px;
  margin: 0 auto 3rem;
}

.profiles-grid {
  display: grid;
  grid-template-columns: 1fr; // stack: YouTube first, GitHub below
  gap: 20px;
  max-width: $width-content-max;
  margin: 0 auto;

  @include viewport-tablet {
    grid-template-columns: #{$gn}fr 1fr; // golden ratio
    gap: 32px;
  }
}

.profile-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 28px 30px;
  box-shadow: $shadow-card;
  display: flex;
  flex-direction: column;

  &--github {
    gap: 12px;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 12px;
    border-bottom: 2px solid $color-magenta-text;
    padding-bottom: 14px;
  }

  &__icon {
    font-size: $fontsize-icon;
    color: $color-magenta;
  }

  &__title {
    font-family: $font-condensed;
    font-size: $fontsize-title;
    letter-spacing: 1.5px;
    color: $color-card-heading;
  }

  &__caption {
    font-family: monospace;
    font-size: $fontsize-caption;
    color: $color-card-muted;
    margin-left: auto;
  }

  // pinned to the card bottom so both cards stay equal height
  &__button {
    display: block;
    text-align: center;
    background: $color-magenta;
    color: #ffffff;
    text-transform: uppercase;
    border-radius: 5px;
    font-weight: bold;
    font-size: $fontsize-small;
    padding: 11px;
    margin-top: auto;
    transition: background 0.2s ease;

    &:hover {
      background: $color-magenta-dark;
    }
  }
}

.channel-row {
  display: flex;
  gap: 18px;
  align-items: center;
  padding: 22px 4px;
  min-height: $min-tap;
  border-bottom: 1px solid $color-card-divider;
  color: $color-card-text;
  transition: transform 0.2s ease, background 0.2s ease;

  &:last-of-type {
    border-bottom: 0;
  }

  &:hover {
    transform: translateX(5px);
    background: $color-magenta-tint;
  }

  &__avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: $color-magenta-text-bright;
    flex-shrink: 0;
    object-fit: cover;

    @include viewport-mobile {
      width: 56px;
      height: 56px;
    }

    &--logo {
      background: $color-magenta-light;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 38px;
        height: 38px;

        @include viewport-mobile {
          width: 30px;
          height: 30px;
        }
      }
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__name {
    font-family: $font-condensed;
    font-size: $fontsize-title-s;
    color: $color-card-heading;
  }

  &__handle {
    font-family: monospace;
    font-size: $fontsize-handle;
    color: $color-magenta;
    font-weight: normal;
  }

  &__description {
    font-size: $fontsize-copy-s;
    line-height: 1.6em;
  }
}

.repo-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 4px;
  border-bottom: 1px solid $color-card-divider;
  color: $color-card-text;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateX(5px);
    background: $color-magenta-tint;
  }

  &__name {
    font-family: $font-condensed;
    font-size: $fontsize-m;
    color: $color-card-heading;
  }

  &__description {
    font-size: $fontsize-small;
    line-height: 1.55em;
  }

  &__meta {
    display: flex;
    gap: 14px;
    align-items: center;
    font-family: monospace;
    font-size: $fontsize-caption;
    color: $color-card-muted;
    margin-top: 2px;
  }

  &__lang {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    display: inline-block;
  }

  &--skeleton {
    pointer-events: none;

    span {
      display: block;
      height: 10px;
      border-radius: 5px;
      background: $color-card-divider;
      animation: profiles-pulse 1.2s ease-in-out infinite;

      &:nth-child(1) {
        width: 40%;
        height: 14px;
      }

      &:nth-child(2) {
        width: 90%;
      }

      &:nth-child(3) {
        width: 55%;
      }
    }
  }
}

.profiles-links {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 52px;
  margin: 4rem 0 0;
  padding: 0;

  @include viewport-mobile {
    flex-wrap: wrap;
    gap: 28px;
  }
}

.profiles-link a {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: $color-magenta-text;
  font-family: $font-condensed;
  font-size: $fontsize-label;
  letter-spacing: 0.5px;
  transition: transform 0.2s ease, color 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    color: #ffffff;
  }

  span {
    width: 54px; // ≥ $min-tap
    height: 54px;
    border-radius: 50%;
    background: #ffffff;
    color: $color-magenta;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: $fontsize-icon-s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
}
</style>
