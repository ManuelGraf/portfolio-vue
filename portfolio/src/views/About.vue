<template>
  <div id="about" class="view view--about">
    <div class="resume">

      <header class="about-intro">
        <h2 class="view__headline">What I do</h2>
        <p class="view__subline">Scalable web apps &amp; multi-sensory experiences.</p>
        <div class="about-intro__text">
          <p>
            I bridge <strong>technical logic</strong> and a <strong>designer’s eye</strong> — from Angular, React
            and TypeScript to <strong>spatial computing</strong> and <strong>3D environments</strong>.
          </p>
          <p>
            With an M.Sc. from <strong>LMU Munich</strong> and research at <strong>TU Munich</strong>, I turn complex
            industrial requirements like <strong>Digital Twins</strong> into intuitive, immersive solutions.
          </p>
        </div>

        <ul class="about-intro__facts">
          <li v-for="fact in facts" :key="fact.label">
            <strong>{{ fact.value }}</strong>{{ fact.label }}
          </li>
        </ul>
      </header>

      <div class="resume__pillars">
        <article v-for="(pillar, index) in pillars" :key="pillar.title" class="pillar">
          <header class="pillar__header">
            <span class="pillar__icon" :class="pillar.icon"></span>
            <span class="pillar__index">0{{ index + 1 }} / {{ pillar.kicker }}</span>
            <h3 class="pillar__title">{{ pillar.title }}</h3>
          </header>
          <ul class="pillar__points">
            <li v-for="point in pillar.points" :key="point.lead">
              <h4 class="pillar__lead">{{ point.lead }}</h4>
              <p v-html="point.text"></p>
            </li>
          </ul>
        </article>
      </div>

      <a :href="download.href" :download="download.filename" :hreflang="download.lang" class="cv-download">
        <span class="fas fa-arrow-down"></span>{{ download.label }}
        <span class="cv-download__meta">PDF</span>
      </a>

      <section class="resume__block">
        <h3 class="resume__heading">Career</h3>
        <cv-timeline></cv-timeline>
      </section>

      <section class="resume__block">
        <h3 class="resume__heading">Skills</h3>
        <div class="skills-grid">
          <div v-for="group in skills" :key="group.label" class="skills-group">
            <h4 class="skills-group__label">{{ group.label }}</h4>
            <ul v-if="group.levels" class="skills-group__levels">
              <li v-for="item in group.items" :key="item[0]">
                <span>{{ item[0] }}</span><span class="skills-group__level">{{ item[1] }}</span>
              </li>
            </ul>
            <ul v-else class="skills-group__list">
              <li v-for="item in group.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
import CvTimeline from "@/components/CvTimeline.vue";
import moment from "moment";

function yearsSince(year, month, until) {
  const end = until ? moment([until[0], until[1] - 1]) : moment();
  return end.diff(moment([year, month - 1]), "years", true);
}

const PILLARS = [
  {
    kicker: "Engineering",
    icon: "fas fa-code",
    title: "Senior Web Frontend Developer",
    points: [
      {
        lead: "Architecture & Implementation",
        text: "Performant front-end solutions in TypeScript, HTML5 and (S)CSS, with code quality ensured through best practices and modern monitoring tools."
      },
      {
        lead: "Industrial Innovation (VR & Web)",
        text: "Industry 4.0 projects for a major German automobile manufacturer — Digital Twins that improve factory planning and employee training through immersive 3D web experiences."
      },
      {
        lead: "Mentorship & Leadership",
        text: "Trained junior developers in gesture-based interaction and agile workflows; boosted productivity with custom in-house tooling (CRMs) and process automation."
      },
      {
        lead: "Agile Management",
        text: "Kanban/Scrum, Jira and Git Flow in explorative, cutting-edge contexts."
      }
    ]
  },
  {
    kicker: "Design & Research",
    icon: "fas fa-pen-nib",
    title: "Creative Technologist & Interaction Designer",
    points: [
      {
        lead: "Mobile WebVR · Master’s Thesis",
        text: "A framework for dual-phone interaction and advanced locomotion within Digital Twins in the NavVis 3D ecosystem (TU Munich / LMU)."
      },
      {
        lead: "Biofeedback Game · Bachelor’s Thesis",
        text: "A Unity3D game controlled via biofeedback that motivates adolescents to exercise after heart surgery (TU Munich / German Heart Center)."
      },
      {
        lead: "NUI & Gesture Control",
        text: "Touchless interfaces, including hand-tracking for sterile environment terminals and image-based interaction models."
      },
      {
        lead: "Award-Winning Digital Creative",
        text: "Global Top 100 for a custom game in Genshin Impact UGC Miliastra Wonderland. Gaming guides and livestreams (<a href='https://www.youtube.com/@yummieplays' target='_blank' rel='noopener'>@yummieplays</a>), game-style soundtracks (<a href='https://www.youtube.com/@manuelgrafmusic' target='_blank' rel='noopener'>@manuelgrafmusic</a>) and official pixel art for Pokémon Infinite Fusion."
      }
    ]
  }
];

const SKILLS = [
  {
    label: "Tech Stack",
    items: ["TypeScript", "JavaScript", "HTML5", "(S)CSS", "Angular", "React", "Vue", "Next.js", "Three.js", "Node.js", "Express", "C#", "Python"]
  },
  {
    label: "Tools",
    items: ["Cursor", "Copilot", "Unity3D", "Unreal Engine", "MongoDB", "PostgreSQL", "Adobe Creative Suite", "DaVinci Resolve", "Reaper DAW"]
  },
  {
    label: "Languages",
    levels: true,
    items: [["German", "Native"], ["English", "Fluent"], ["French", "Basics"]]
  }
];

// one button: German CV for German browsers, English for everyone else
const DOWNLOADS = {
  en: { label: "Download CV", lang: "en", href: "/ManuelGraf-CV-2026-en.pdf", filename: "ManuelGraf-CV-2026-en.pdf" },
  de: { label: "Lebenslauf herunterladen", lang: "de", href: "/ManuelGraf-CV-2026-de.pdf", filename: "ManuelGraf-CV-2026-de.pdf" }
};

export default {
  components: {
    CvTimeline
  },
  data: function () {
    const lang = (navigator.language || "en").toLowerCase().startsWith("de") ? "de" : "en";
    return {
      pillars: PILLARS,
      skills: SKILLS,
      download: DOWNLOADS[lang],
      facts: [
        { value: Math.floor(yearsSince(2007, 9)), unit: "yrs", label: "designing & building digital media" },
        { value: Math.round(yearsSince(2017, 11, [2025, 5]) * 2) / 2, unit: "yrs", label: "Industry 4.0, VR & 3D web" },
        { value: "Top 100", label: "global ranking, Genshin UGC" }
      ].map(f => ({ value: f.unit ? f.value + " " + f.unit : f.value, label: f.label }))
    };
  }
};
</script>

<style lang="scss">
$bg-about: $color-green;
$ink: $ink-green-strong;
$hairline: rgba($ink-green-strong, 0.25);

.view--about {
  @include curved-border($bg-about, up);

  background: $bg-about;
  color: $ink-green-body;
  padding-bottom: 5rem;

  @include viewport-print {
    &::before {
      display: none;
    }

    background: white;
    padding: 0;
  }
}

.resume {
  max-width: $width-content-max;
  margin: 0 auto;
  padding: 2rem 20px 0; // + the shared .view__headline top margin

  @include viewport-mobile {
    padding: 0 0 0 16px;
  }

  // ---- pillars ----
  &__pillars {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 5rem;

    @include viewport-tablet {
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
  }

  &__block {
    margin-top: 5rem;
  }

  &__heading {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0 0 2rem;
    font-family: $font-condensed;
    font-size: $fontsize-xl;
    font-weight: 500;
    line-height: 1;
    color: $ink;

    // hairline running to the right edge
    &::after {
      content: "";
      flex: 1;
      height: 1px;
      background: $hairline;
    }
  }
}

// ---- intro: centered headline + subline like the other sections ----
.about-intro {
  text-align: center;
  color: $ink;

  .view__subline {
    color: $ink-green-body;
  }

  // more breathing room before the cards on desktop
  @include viewport-tablet {
    padding-bottom: 2rem;
  }

  &__text {
    max-width: 640px;
    margin: 0 auto;
    line-height: 1.6em;
    color: $ink-green-body;

    p + p {
      margin-top: 0.9rem;
    }

    strong {
      color: $ink;
    }
  }

  &__facts {
    display: flex;
    justify-content: center;
    gap: 2rem 5rem;
    margin: 3.5rem 0 0;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      max-width: 180px;
      font-size: $fontsize-small;
      line-height: 1.4;
      color: $ink-green-body;
    }

    strong {
      font-family: $font-condensed;
      font-size: 2.75rem;
      font-weight: 500;
      line-height: 1;
      color: $ink;
    }

    @include viewport-mobile {
      justify-content: space-between;
      gap: 1rem;

      li {
        flex: 1;
        font-size: $fontsize-caption + 1;
      }

      strong {
        font-size: 1.75rem;
      }
    }
  }
}

// centered below the pillar cards
.cv-download {
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  min-height: $min-tap;
  margin: 3rem auto 0;
  padding: 0 24px;
  border-radius: 99px;
  background: $ink;
  color: $color-green;
  font-family: $font-condensed;
  font-size: $fontsize-small + 1;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  box-shadow: 0 6px 18px rgba($ink, 0.3);
  transition: transform $duration-instant, box-shadow $duration-instant;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba($ink, 0.4);
  }

  &__meta {
    font-family: monospace;
    font-size: $fontsize-caption;
    font-weight: normal;
    opacity: 0.7;
  }

  @include viewport-print {
    display: none;
  }
}

.pillar {
  padding: 28px 30px 32px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: $shadow-card;
  color: $color-card-text;

  @include viewport-mobile {
    padding: 22px 20px 26px;
  }

  &__header {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 14px;
    align-items: center;
    padding-bottom: 18px;
    border-bottom: 2px solid $color-green;
  }

  &__icon {
    grid-row: span 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: $color-green;
    color: $ink;
    font-size: 18px;
  }

  &__index {
    font-family: monospace;
    font-size: $fontsize-caption;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: $color-card-muted;
  }

  &__title {
    margin: 2px 0 0;
    font-family: $font-condensed;
    font-size: $fontsize-title + 2;
    font-weight: 500;
    line-height: 1.25;
    color: $color-card-heading;
  }

  &__points {
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: $fontsize-copy-s + 0.5;
    line-height: 1.65;

    li {
      margin-top: 1.25rem;
    }

    a {
      color: $color-green-darkest;
      font-weight: 600;
      text-decoration: underline;
      text-underline-offset: 2px;
    }
  }

  &__lead {
    margin: 0 0 0.2rem;
    font-family: $font-condensed;
    font-size: $fontsize-m + 0.0625;
    font-weight: 500;
    line-height: 1.3;
    color: $color-card-heading;
  }
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @include viewport-tablet {
    grid-template-columns: 1.2fr 1.2fr 0.8fr;
    gap: 3rem;
  }
}

.skills-group {
  &__label {
    margin: 0 0 0.75rem;
    font-family: monospace;
    font-size: $fontsize-caption + 1;
    font-weight: normal;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: $ink-green-label;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: $fontsize-m;
    line-height: 1.9;
    color: $ink;

    li {
      display: inline;
      white-space: nowrap;

      // separator stays at the end of the line, never starts one
      &:not(:last-child)::after {
        content: " · ";
        white-space: normal;
        opacity: 0.6;
      }
    }
  }

  &__levels {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      border-bottom: 1px solid $hairline;
      font-size: $fontsize-m;
      color: $ink;
    }
  }

  &__level {
    font-family: monospace;
    font-size: $fontsize-small;
    color: $ink-green-label;
  }
}
</style>
