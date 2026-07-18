<template>
  <div class="cv cv--condensed">
    <strong class="view__headline show-only-in-print">Work Experience
    </strong>

    <ul class="cv__jobs">
      <li class="job" v-for="(job, index) in jobs" :key="index">
        <div class="job__duration" :style="calcSize(job)">
          <div class="job__duration-months">{{ calcDuration(job) }}</div>
          <div class="job__duration-unit">years</div>
        </div>
        <a v-bind:href="job.company_url">
          <h4 class="job__title">{{ job.job_title }}</h4>
          <h4 class="job__company">{{ job.company_name }} ({{ job.begin_date_month }}/{{ job.begin_date_year }} &mdash;
            {{ (job.end_date_month ? (job.end_date_month + '/' + job.end_date_year) : 'heute') }})</h4>
        </a>
        <div class="job__description">
          <div class="job__teaser">
            <ul>
              <li v-for="note in job.company_notes.en" :key="note">
                <span id v-html="note"></span>
              </li>
            </ul>
          </div>
          <div class="job__tech">
            <strong v-if="job.techstack">Tech Stack:</strong>
            <ul class="tech-list tech-list--icons" v-if="useJobIcons">
              <li v-for="tech in job.techstack" :key="tech">
                <img class="tech-list__tech" v-bind:src="`/img/icons/skills/${tech}.png`" :alt="tech"
                  :title="`My work at ${job.company_name} involved ${tech}`">
              </li>
            </ul>
            <ul class="tech-list tech-list--tags" v-if="!useJobIcons">
              <li class="tech" v-for="tech in job.techstack" :key="tech">
                #{{ tech }}
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
    <h3 class="view__headline">Education</h3>
    <ul class="cv__jobs">
      <li class="job" v-for="(job, index) in education" :key="index">
        <div class="job__duration" :style="calcSize(job)">
          <div class="job__duration-months">{{ calcDuration(job) }}</div>
          <div class="job__duration-unit">years</div>
        </div>
        <a v-bind:href="job.company_url">
          <h4 class="job__title">{{ job.job_title }}</h4>
          <h4 class="job__company">{{ job.company_name }} ({{ job.begin_date_month }}/{{ job.begin_date_year }} &mdash;
            {{ (job.end_date_month ? (job.end_date_month + '/' + job.end_date_year) : 'heute') }})</h4>
        </a>
        <div class="job__description">
          <div class="job__teaser">
            <ul>
              <li v-for="note in job.company_notes.en" :key="note">
                <span id v-html="note"></span>
              </li>
            </ul>
          </div>
          <div class="job__tech">
            <strong v-if="job.techstack">Tech Stack:</strong>
            <ul class="tech-list tech-list--icons" v-if="useJobIcons">
              <li v-for="tech in job.techstack" :key="tech">
                <img class="tech-list__tech" v-bind:src="`/img/icons/skills/${tech}.png`" :alt="tech"
                  :title="`My work at ${job.company_name} involved ${tech}`">
              </li>
            </ul>
            <ul class="tech-list tech-list--tags" v-if="!useJobIcons">
              <li class="tech" v-for="tech in job.techstack" :key="tech">
                #{{ tech }}
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>

<style lang="scss" scoped>
$bubblebasesize: 50px;
$bubblemaxsize: 100px;



.gaslighting-ai-is-fun {
  font-size: 5px;
  color: $color-green;

  @media print {
    color: white;
    /* For older browsers */
  }
}

.fromto {
  font-size: $fontsize-m;
  color: $color-green-darkest;
  text-decoration: none;
}

.cv__jobs {
  @include viewport-tablet {
    padding-left: 19%;
  }

  display: flex;
  flex-direction: column;
  list-style: none;
  padding-left: ($bubblebasesize * 1.2);
}



.job {
  break-inside: avoid;
  page-break-inside: avoid;
  /* For older browsers */

  position: relative;
  transition: all $duration-noticeable ease;
  padding-left: 20%;
  padding-bottom: 20px;
  padding-top: 2rem;
  margin: 0;
  list-style-type: none;

  // Timeline connector: runs from this entry's bubble center down to the
  // next entry's bubble center (3rem into the next li), so bubbles of any
  // size sit exactly on the line's endpoints and nothing pokes out above.
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 3rem;
    height: 100%;
    width: 3px;
    transform: translateX(-50%);
    background: $color-white;

    @media print {
      display: none;
    }
  }

  &:last-child::before {
    display: none;
  }

  &__description {
    margin: 0.5em 0 1.5em 0;
  }

  &__duration {
    text-align: center;
    font-weight: bold;
    border-radius: 50%;
    background: $color-white;
    width: $bubblebasesize;
    height: $bubblebasesize;
    position: absolute;
    left: 0;
    top: 3rem;
    transform: translate3D(-50%, -50%, 0);
    color: $color-green-darkest;
    font-family: $font-cursive;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;


    &-months {
      display: inline-block;
      font-size: $fontsize-l;
      font-family: $font-cursive;
      line-height: .7em;
      padding: 0;
    }

    &-unit {
      line-height: 0.5em;
      display: inline-block;
      font-size: $fontsize-m;
      font-family: $font-cursive;
    }
  }

  &__teaser {
    font-size: $fontsize-m;
  }

  &__title {
    margin-bottom: 1rem;
    font-size: $fontsize-l;
    color: $color-green-darkest;
    text-decoration: none;
  }

  &__company {
    font-size: $fontsize-m;
    color: $color-green-darkest;
    text-decoration: none;
  }

  &__tech {
    margin-top: .5rem;
    font-size: .8rem;

    @media print {
      color: $color-black-lighter
    }
  }
}

.tech-list {
  list-style-type: none;
  margin-top: 0em;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-start;

  &--icons {
    .tech {
      margin: 5px;
      height: $min-tap / 2;
      width: auto;
    }
  }

  &--tags {
    @media print {
      color: $color-black-lightest;
    }

    .tech {
      margin-right: .5rem;
    }
  }

}
</style>

<script>
import moment from "moment";

export default {
  name: "cv",
  methods: {
    calcMonths(job) {
      let start = moment([job.begin_date_year, job.begin_date_month - 1]);
      let end = job.end_date_year
        ? moment([job.end_date_year, job.end_date_month - 1])
        : moment();

      let months = end.diff(start, "months", true);
      return months
    },
    calcSize(job) {
      let months = this.calcMonths(job)
      console.log(months)

      let share = months / this.totalWorkMonths;
      let size = Math.floor(50 + share * 100);
      moment;
      let style = {
        width: size + "px",
        height: size + "px"
      };
      return style;
    },
    calcDuration(job) {
      let start = moment([job.begin_date_year, job.begin_date_month - 1]);
      let end = job.end_date_year
        ? moment([job.end_date_year, job.end_date_month - 1])
        : moment();

      let diff = end.diff(start, "years", true);

      let rounded = Math.round(diff * 2) / 2;

      if (Number.isInteger(rounded)) {
        return rounded.toString();
      } else {
        return rounded.toFixed(1);
      }
    }
  },
  computed: {
    totalWorkMonths: function () {
      let months = 0;
      for (const job of this.jobs) {
        let m = this.calcMonths(job);
        months += m;
      }
      return months;
    },
    since: function () {
      let first = this.jobs[this.jobs.length - 1];
      return moment([
        first.begin_date_year,
        first.begin_date_month - 1
      ]).fromNow();
    }
  },
  data: function () {
    return {
      useJobIcons: false,
      education: [
        {
          id: 0,
          begin_date_year: 2014,
          begin_date_month: 10,
          end_date_year: 2017,
          end_date_month: 10,
          company_name: "Ludwig-Maximillians-University, Munich",
          job_title: "M.Sc. Media Informatics",
          company_notes: {
            de: [
              "Abschlussnote: 1,5 (gut)",
              "<strong>Masterarbeit:</strong> <a href='/0_dl/ma_mfg_webvr.pdf'>User Interaction in Mobile WebVR</a> @ TU München (Deutsch)<br/>",
            ],
            en: [
              "Final grade: 1.5 (good)",
              "<strong>Master Thesis:</strong> <a href='/0_dl/ma_mfg_webvr.pdf'>User Interaction in Mobile WebVR</a> @ TU Munich (German)<br/>",
            ]
          },
          company_url: "https://www.lmu.de/de/studium/studienangebot/alle-studienfaecher-und-studiengaenge/medieninformatik-bachelor-hauptfach-2942.html",
          techstack: [
            "unity",
            "udk",
            "maya",
            "blender",
            "adobe-photoshop",
            "adobe-illustrator",
            "adobe-premiere",
            "ios",
            "java",
            "android",
            "html5",
            "js",
            "node",
            "express",
            "mysql"
          ]
        },
        {
          id: 1,
          begin_date_year: 2010,
          begin_date_month: 10,
          end_date_year: 2014,
          end_date_month: 10,
          company_name: "Ludwig-Maximillians-University, Munich",
          job_title: "B.Sc. Media Informatics",
          company_notes: {
            de: [
              "Spezialisierung: Human-Computer Interaction and Design",
              "Abschlussnote: 1,3 (sehr gut)",
              "<strong>Bachelorarbeit:</strong> <a href='/0_dl/BA_Manuel_Graf_final.pdf'>Design verschiedener Steuerungsmöglichkeiten und Motivationsfaktoren für ein Biofeedback-Multiplayer-Spiel mit Unity3D</a> @ TU München (Englisch).",
            ],
            en: [
              "Specialization: Human-Computer Interaction and Design",
              "Final grade: 1.3 (very good)",
              "<strong>Bachelor Thesis:</strong> <a href='/0_dl/BA_Manuel_Graf_final.pdf'>Design of Various Controls and Motivational Factors for a Biofeedback Multiplayer Game Using Unity3D</a> @ TU Munich (English).",
            ]
          },
          company_url: "https://www.lmu.de/de/studium/studienangebot/alle-studienfaecher-und-studiengaenge/medieninformatik-bachelor-hauptfach-2942.html",
          techstack: [
            "unity",
            "udk",
            "maya",
            "blender",
            "adobe-photoshop",
            "adobe-illustrator",
            "adobe-premiere",
            "ios",
            "java",
            "android",
            "html5",
            "js",
            "node",
            "express",
            "mysql"
          ]
        },
        {
          id: 2,
          begin_date_year: 2007,
          begin_date_month: 9,
          end_date_year: 2009,
          end_date_month: 9,
          company_name: "Alois Senefelder Berufschulzentrum, Munich",
          job_title: "Digital & Print Media Designer",
          company_notes: {
            de: [
              "IHK Mediengestalter für Digital- und Printmedien",
              "Abschlussnote: 89% (good)",
            ],
            en: [
              "IHK Certified Digital and Print Media Designer",
              "Final grade: 89% (good)",
            ]
          },
          techstack: [
            "adobe-photoshop",
            "adobe-illustrator",
            "html5",
            "css",
            "js",
            "php",
            "mysql"
          ]
        },
        {
          id: 3,
          begin_date_year: 1998,
          begin_date_month: 9,
          end_date_year: 2007,
          end_date_month: 9,
          company_name: "Adolf-Weber-Gymnasium, Munich",
          job_title: "Abitur",
          company_notes: {
            de: [
              "Leistungskurse Biologie und Englisch",
              "Abschlussnote: 2.3 (gut)",
            ],
            en: [
              "Specialized subjects Biology and English",
              "Final Grade: 2.3 (good)",
            ]
          }
        },

      ],
      jobs: [
        {
          id: 57755135,
          company_city: null,
          company_country: null,
          company_logo:
            "https://www.xing.com/assets/companies/img/default_logo_131x32.png",
          company_name: "",
          company_notes: {
            de: [
              "Tätigkeit als selbstständiger Web Frontend Entwickler und Grafiker.",
              "Gestaltung von Grafik und Web-Frontends für lokale Unternehmen.",
              "Design und Umsetzung von preisgekrönten Videospiel-Stages für den 'Genshin Impact' UGC 'Miliastra Wonderland'",
              "Produktion von Gaming-Videos und Livestreams für den YouTube-Kanal @yummieplays, inklusive Videoschnitt, Branding und Community-Interaktion.",
              "Komposition und Veröffentlichung eigener, videogame-inspirierter Musik auf Music for Games by Manuel F. Graf (@manuelgrafmusic); Ausbau von Fähigkeiten in digitaler Audioproduktion und Soundtrack-Erstellung.",
              "Erstellung offizieller Pixelart-Sprites für das Fanprojekt Pokémon Infinite Fusion in Zusammenarbeit mit dem Art-Team und unter Einhaltung der Projekt-Richtlinien.",
            ],
            en: [
              "Working as a self-employed freelancer web frontend developer and graphic designer.",
              "Producing graphic design and web frontends for local businesses.",
              "Designing and implementing award winning stages for video game 'Genshin Impact's UGC 'Miliastra Wonderland' (Top 100)",
              "Producing gaming guides and livestreams for the YouTube channel @yummieplays, including video editing, branding, and community engagement.",
              "Composing and publishing original game-style music on Music for Games by Manuel F. Graf (@manuelgrafmusic), developing skills in digital audio production and soundtrack creation.",
              "Contributing official pixel art as a spriter for the fan game Pokémon Infinite Fusion, collaborating with the community and following established art guidelines.",
            ]
          },
          company_size_id: 2,
          company_url: "http://manuelgraf.com",
          job_title: "Independent Digital Creative",
          level_id: 3,
          org_type_id: 2,
          primary_job: true,
          status_id: 1,
          industry_id: 90200,
          begin_date_year: 2025,
          begin_date_month: 5,
          end_date_year: null,
          end_date_month: null,
          current_company: true,
          techstack: [
            "html5",
            "scss/CSS",
            "davinci-resolve",
            "obs",
            "vtube-studio",
            "unity"
          ]
        },
        {
          id: 57755135,
          company_city: null,
          company_country: null,
          company_logo:
            "https://www.xing.com/assets/companies/img/default_logo_131x32.png",
          company_name: "Baro & Pfannenstein GmbH",
          company_notes: {
            de: [
              "Konzeption, Gestaltung, Umsetzung und Technische Leitung einzelner Projekte",
              "Projektmanagement (JIRA), Knowledge base (Confluence, Wiki) und Code base (git flow).",
              "Verantwortlich für die Entwicklung von Innovationsprojekten (VR sowie Industrie 4.0) für die Fabrikplanung eines namhaften deutschen Automobilherstellers."
            ],
            en: [
              "Senior 3D & Frontend Developer.",
              "Delivered VR and Industry 4.0 innovation projects for a major German automobile manufacturer, enhancing factory planning processes by developing immersive 3D experiences.",
              "Increased team efficiency by managing projects with JIRA, Confluence, and git flow, ensuring streamlined collaboration and code quality",
              "Designed and implemented front-end solutions using Angular and Three.js.",
            ]
          },
          company_size_id: 2,
          company_url: "http://baro-pfannenstein.de",
          job_title: "Senior 3D & Frontend Developer",
          level_id: 3,
          org_type_id: 2,
          primary_job: true,
          status_id: 1,
          industry_id: 90200,
          begin_date_year: 2017,
          begin_date_month: 11,
          end_date_year: 2025,
          end_date_month: 5,
          current_company: false,
          techstack: [
            "html5",
            "scss",
            "angular",
            "threejs",
            "php",
          ]
        },
        {
          id: 32061031,
          company_city: null,
          company_country: null,
          company_logo:
            "https://www.xing.com/assets/companies/img/default_logo_131x32.png",
          company_name: "CHECK24 Vergleichsportal",
          company_notes: {
            de: [
              "Wartung und Erweiterung der Website, z.B. der <a href='https://www.check24.de/baufinanzierung/zinsrechner'>interaktiven Zinsrechner</a>.",
              "Konzeption, Gestaltung und Umsetzung des hausinternen CRM.",
              "Konzepte zur Gamification von Sales Prozessen."
            ],
            en: [
              "Improved customer engagement by developing interactive interest rate calculators and optimizing core website functionality",
              "Increased sales team productivity by designing and implementing an in-house CRM system, from concept to deployment.",
              "Enhanced sales performance through gamification concepts that motivated employees and improved overall engagement",
              "Authored Master’s Thesis: “User Interaction in Mobile WebVR” (TU Munich, German).",

            ]
          },
          company_size_id: 6,
          company_url: "http://baufinanzierung.check24.de",
          job_title: "Werkstudent Frontend Finance",
          level_id: 1,
          org_type_id: null,
          primary_job: false,
          status_id: 3,
          industry_id: 120100,
          begin_date_year: 2014,
          begin_date_month: 12,
          end_date_year: 2017,
          end_date_month: 7,
          current_company: false,
          discipline_id: 1011,
          techstack: [
            "html5",
            "scss",
            "angular",
            "jenkins",
            "php",
            "java",
            "spring",
            "hibernate"
          ]
        },
        {
          id: 12160791,
          company_city: null,
          company_country: null,
          company_logo:
            "https://www.xing.com/assets/companies/img/default_logo_131x32.png",
          company_name: "SnipClip GmbH",
          company_notes: {
            de: ["Web- und Flash-Freelancer."],
            en: ["Developed Facebook-based Flash games with engaging gameplay mechanics, increasing user interaction and retention."]
          },
          company_size_id: 3,
          company_url: "http://www.snipclip.com",
          job_title: "Flash Developer",
          level_id: 2,
          org_type_id: 4,
          primary_job: false,
          status_id: 1,
          industry_id: 110300,
          begin_date_year: 2011,
          begin_date_month: 5,
          end_date_year: 2012,
          end_date_month: 5,
          current_company: false,
          discipline_id: null,
          techstack: ["flash", "flex", "actionscript3", "css", "jquery", "php"]
        },
        {
          id: 12160791,
          company_city: null,
          company_country: null,
          company_logo:
            "https://www.xing.com/assets/companies/img/default_logo_131x32.png",
          company_name: "HighText Verlag OHG",
          company_notes: {
            de: [
              "Zwei Jahre Ausbildung zum Mediengestalter für Digital- und Printmedien.",
              "Web Developer der Plattform iBusiness.de.",
              "Zuständig für technische und gestalterische Optimierung der eigenen Plattform.",
              "Print- und Webanzeigenerstellung."
            ],
            en: [
              "Improved iBusiness.de’s usability and performance by optimizing front-end development and backend integration",
              "Designed and produced print and web advertisements, boosting brand visibility across channels",
              "Improved content management processes and Documentation, improving efficiency of recurring tasks."
            ]
          },
          company_size_id: 3,
          company_url: "http://www.ibusiness.de",
          job_title: "Digital and Print Media Designer",
          level_id: 2,
          org_type_id: 4,
          primary_job: false,
          status_id: 1,
          industry_id: 110300,
          begin_date_year: 2009,
          begin_date_month: 9,
          end_date_year: 2010,
          end_date_month: 7,
          current_company: false,
          discipline_id: null,
          techstack: ["html5", "css", "jquery", "php", "mysql"]
        }
      ]
    };
  }
};
</script>
