<template>
  <div class="cv-timeline" :class="{ 'cv-timeline--collapsed': !expanded }">
    <div class="cv-timeline__columns">
      <section v-for="group in groups" :key="group.key" class="cv-timeline__group">
        <h4 class="cv-timeline__label"><span :class="group.icon"></span>{{ group.label }}</h4>
        <ol class="timeline">
          <li v-for="(entry, index) in group.entries" v-show="expanded || index < group.preview" :key="entry.title + entry.from"
            class="timeline__entry" :class="{
              'timeline__entry--current': !entry.to,
              'timeline__entry--fade': !expanded && index === group.preview - 1 && group.entries.length > group.preview
            }">
            <span class="timeline__date">{{ entry.from }} – {{ entry.to || 'today' }}</span>
            <h5 class="timeline__title">{{ entry.title }}</h5>
            <span class="timeline__org">{{ entry.org }}</span>
            <template v-if="entry.notes">
              <button type="button" class="timeline__toggle" :aria-expanded="isOpen(group.key, index)"
                @click="toggle(group.key, index)">
                {{ isOpen(group.key, index) ? 'Less' : 'Details' }}
                <span class="fas fa-chevron-down"></span>
              </button>
              <div v-show="isOpen(group.key, index)" class="timeline__details">
                <ul class="timeline__notes">
                  <li v-for="note in entry.notes" :key="note" v-html="note"></li>
                </ul>
                <ul v-if="entry.tags" class="timeline__tags">
                  <li v-for="tag in entry.tags" :key="tag">{{ tag }}</li>
                </ul>
              </div>
            </template>
          </li>
        </ol>
      </section>
    </div>
    <button type="button" class="cv-timeline__more" :aria-expanded="expanded" @click="expanded = !expanded">
      {{ expanded ? 'Show less' : 'Show full timeline' }}
      <span class="fas fa-chevron-down"></span>
    </button>
  </div>
</template>

<script>
// Wording and dates follow the 2026 PDF CV (public/ManuelGraf-CV-2026-*.pdf);
// the expandable notes are carried over from the old timeline (Cv.vue).
const POSITIONS = [
  {
    from: "5/2025",
    to: null,
    title: "Self-employed Freelancer / Creative Technologist",
    org: "Independent, Munich",
    notes: [
      "Designing and implementing contest-winning stages and training material for Genshin Impact's game authoring tool <strong>Miliastra Sandbox</strong> as a contracted content creator.",
      "Producing graphic design and web frontends for local businesses.",
      "Producing gaming guides and livestreams, including video editing, branding and community engagement.",
      "Composing and publishing original game-style music (<a href='https://www.youtube.com/@manuelgrafmusic' target='_blank' rel='noopener'>@manuelgrafmusic</a>).",
      "Contributing official pixel art as a spriter for the fan game <strong>Pokémon Infinite Fusion</strong>."
    ],
    tags: ["HTML5", "(S)CSS", "Unity", "DaVinci Resolve", "OBS", "VTube Studio"]
  },
  {
    from: "11/2017",
    to: "5/2025",
    title: "Senior 3D & Frontend Developer",
    org: "Baro & Pfannenstein GmbH, Munich",
    notes: [
      "Delivered VR and Industry 4.0 innovation projects for a <strong>major German automobile manufacturer</strong>, enhancing factory planning with immersive 3D experiences.",
      "Concept, design, implementation and technical lead of individual projects.",
      "Managed projects with Jira, Confluence and Git Flow, ensuring streamlined collaboration and code quality.",
      "Designed and implemented front-end solutions using Angular and Three.js."
    ],
    tags: ["Angular", "Three.js", "HTML5", "SCSS", "PHP"]
  },
  {
    from: "12/2014",
    to: "7/2017",
    title: "Werkstudent Frontend Finance",
    org: "CHECK24 Vergleichsportal, Munich",
    notes: [
      "Improved customer engagement by developing interactive interest rate calculators and optimizing core website functionality.",
      "Designed and implemented an in-house CRM system, from concept to deployment.",
      "Gamification concepts that motivated the sales team and improved engagement."
    ],
    tags: ["Angular", "HTML5", "SCSS", "Java", "Spring", "Hibernate", "PHP", "Jenkins"]
  },
  {
    from: "5/2011",
    to: "5/2012",
    title: "Junior Flash Developer",
    org: "SnipClip GmbH, Munich",
    notes: [
      "Developed Facebook-based Flash games with engaging gameplay mechanics, increasing user interaction and retention."
    ],
    tags: ["Flash", "Flex", "ActionScript 3", "CSS", "jQuery", "PHP"]
  },
  {
    from: "9/2007",
    to: "7/2010",
    title: "Digital and Print Media Designer",
    org: "HighText Verlag OHG, Munich",
    notes: [
      "Apprenticeship as IHK Digital and Print Media Designer, then web developer for the platform iBusiness.de.",
      "Improved iBusiness.de's usability and performance through front-end and backend optimization.",
      "Designed and produced print and web advertisements."
    ],
    tags: ["HTML5", "CSS", "jQuery", "PHP", "MySQL"]
  }
];

const EDUCATION = [
  {
    from: "10/2014",
    to: "10/2017",
    title: "M.Sc. Media Informatics",
    org: "Ludwig-Maximilians-Universität (LMU), Munich",
    notes: [
      "Thesis @ TU Munich: <a href='/0_dl/ma_mfg_webvr.pdf' target='_blank'>User Interaction in Mobile WebVR</a>",
      "Final grade: 1.5 (A-)"
    ]
  },
  {
    from: "10/2010",
    to: "9/2014",
    title: "B.Sc. Media Informatics",
    org: "Ludwig-Maximilians-Universität (LMU), Munich",
    notes: [
      "Thesis @ TU Munich: <a href='/0_dl/BA_Manuel_Graf_final.pdf' target='_blank'>Design of Various Controls and Motivational Factors for a Biofeedback Multiplayer Game Using Unity3D</a>",
      "Specialization: Human-Computer Interaction and Design",
      "Final grade: 1.3 (A)"
    ]
  },
  {
    from: "9/2007",
    to: "9/2009",
    title: "IHK Certified Digital and Print Media Designer",
    org: "Alois Senefelder Berufsschulzentrum, Munich"
  },
  {
    from: "9/1998",
    to: "9/2007",
    title: "Abitur",
    org: "Adolf-Weber-Gymnasium, Munich",
    notes: ["Specialized subjects Biology and English", "Final grade: 2.3 (B)"]
  }
];

export default {
  name: "cv-timeline",
  data: function () {
    return {
      expanded: false,
      open: {},
      groups: [
        { key: "positions", label: "Positions", icon: "fas fa-briefcase", entries: POSITIONS, preview: 3 },
        { key: "education", label: "Education", icon: "fas fa-graduation-cap", entries: EDUCATION, preview: 2 }
      ]
    };
  },
  methods: {
    isOpen(group, index) {
      return !!this.open[group + index];
    },
    toggle(group, index) {
      this.open[group + index] = !this.open[group + index];
    }
  }
};
</script>

<style lang="scss">
$timeline-ink: $ink-green-strong;
$timeline-dot: 12px;
$timeline-axis: 6px; // x of the line; dots and line are both centered on it

.cv-timeline {
  &__columns {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;

    @include viewport-tablet {
      grid-template-columns: #{$gn}fr 1fr; // golden ratio, positions get more room
      gap: 3.5rem;
    }
  }

  &__label {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 0 1.25rem;
    font-family: $font-condensed;
    font-size: $fontsize-label;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: $ink-green-label;
  }

  &__more {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 2rem auto 0;
    min-height: $min-tap;
    padding: 0 22px;
    border: 1px solid $timeline-ink;
    border-radius: 99px;
    background: transparent;
    color: $timeline-ink;
    font-family: $font-condensed;
    font-size: $fontsize-label;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: background $duration-instant, color $duration-instant;

    &:hover,
    &:focus-visible {
      background: $timeline-ink;
      color: $color-green;
    }

    &[aria-expanded="true"] .fa-chevron-down {
      transform: rotate(180deg);
    }

    @include viewport-print {
      display: none;
    }
  }
}

.timeline {
  list-style: none;
  margin: 0;
  padding: 0;

  &__entry {
    position: relative;
    padding: 0 0 1.75rem 30px;

    // connector line between the dots
    &::before {
      content: "";
      position: absolute;
      left: $timeline-axis;
      top: 10px;
      bottom: -10px;
      width: 2px;
      transform: translateX(-50%);
      background: rgba($timeline-ink, 0.3);
    }

    &:last-child::before {
      display: none;
    }

    // dot
    &::after {
      content: "";
      position: absolute;
      left: $timeline-axis;
      top: 4px;
      transform: translateX(-50%);
      box-sizing: border-box; // the global * rule doesn't reach pseudo-elements
      width: $timeline-dot;
      height: $timeline-dot;
      border-radius: 50%;
      border: 2px solid $timeline-ink;
      background: $color-green;
    }

    &--current::after {
      background: $timeline-ink;
    }

    // last preview item fades out to hint at more entries
    &--fade {
      mask-image: linear-gradient(to bottom, #000 35%, transparent);
      -webkit-mask-image: linear-gradient(to bottom, #000 35%, transparent);
    }

    @include viewport-print {
      display: list-item !important; // print always shows the full timeline
      mask-image: none;
      -webkit-mask-image: none;
    }
  }

  &__date {
    display: block;
    font-family: monospace;
    font-size: $fontsize-caption + 1;
    letter-spacing: 0.5px;
    color: $ink-green-label;
  }

  &__title {
    margin: 0.2rem 0 0;
    font-family: $font-condensed;
    font-size: $fontsize-title;
    font-weight: 500;
    line-height: 1.25;
    color: $timeline-ink;
  }

  &__org {
    display: block;
    font-size: $fontsize-small;
    color: $ink-green-body;
  }

  &__toggle {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 0.4rem;
    padding: 4px 0;
    background: none;
    color: $timeline-ink;
    font-family: monospace;
    font-size: $fontsize-caption + 1;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;

    .fas {
      font-size: 9px;
      transition: transform $duration-instant;
    }

    &[aria-expanded="true"] .fas {
      transform: rotate(180deg);
    }

    @include viewport-print {
      display: none;
    }
  }

  &__details {
    margin-top: 0.4rem;
    color: $ink-green-body;
    font-size: $fontsize-copy-s;
    line-height: 1.6;

    a {
      color: $timeline-ink;
      text-decoration: underline;
    }

    @include viewport-print {
      display: block !important;
    }
  }

  &__notes {
    margin: 0;
    padding-left: 1.1rem;

    li + li {
      margin-top: 0.35rem;
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 2px 14px;
    list-style: none;
    margin: 0.8rem 0 0;
    padding: 0;

    li {
      font-family: monospace;
      font-size: $fontsize-caption;
      color: $timeline-ink;
    }
  }
}
</style>
