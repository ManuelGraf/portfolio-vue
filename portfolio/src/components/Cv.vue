<template>
  <div class="cv">
    total months: {{totalWorkMonths}}
    <ul class="cv__jobs">
      <li class="job" v-for="(job, index) in jobs" :key="index">
        <span class="job__date">{{calcDuration(job)}} mo</span>
        <a v-bind:href="job.company_url">
          <h4 class="job__company">{{job.company_name}}</h4>
        </a>
        <div class="job__description">
          <div class="job__teaser">{{job.company_notes}}</div>
          <div class="job__tech">
            <ul class="tech-list">
              <li>
                <img
                  class="tech-list__tech"
                  v-for="tech in job.techstack"
                  :key="tech"
                  v-bind:src="`/img/icons/skills/${tech}.png`"
                  :alt="tech"
                  :title="`My work at ${job.company_name} involved ${tech}`"
                >
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
.cv__jobs {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-left: ($bubblebasesize * 1.2);
}
.job {
  position: relative;
  transition: all $duration-noticeable ease;
  padding-left: 20%;
  padding-top: 20px;
  padding-bottom: 20px;
  border-left: 3px solid $color-white;
  margin: 0;
  list-style-type: none;

  &__date {
    display:flex;
    align-content: center;
    justify-content: center;
    border-radius: 50%;
    background: $color-white;
    width: $bubblebasesize;
    height: $bubblebasesize;
    position: absolute;
    left: 0;
    transform: translate(-50%, 0);
    color: $color-green;
  }
  &__teaser {
    font-size: $fontsize-s;
  }
  &__company {
    font-size: $fontsize-m;
    text-decoration: none;
  }
}
.tech-list {
  list-style-type: none;
  &__tech{
    height: $min-tap / 2;
    width: auto;
  }
}
</style>

<script>
import moment from "moment";
export default {
  name: "cv",
  methods: {
    calcSize(job) {
      console.log(moment([job.begin_date_year, job.begin_date_month,1]))
      let months = 
        moment([job.begin_date_year, job.begin_date_month,1])
        .diff([job.end_date_year, job.end_date_month,1]);
        let share = months/this.totalWorkMonths;
      return {
        width: 50+ share * 300,
        height: 50+ share * 300
      };
    },
    calcDuration(job) {
      if(job.end_date_year){
        return moment([job.end_date_year, job.end_date_month])
        .diff(moment([job.begin_date_year, job.begin_date_month]),'months',true)
      }else{
        return moment([job.begin_date_year, job.begin_date_month,1])
          .fromNow(true);

      }

    }
  },
  filters: {},
  computed: {
    totalWorkMonths: function() {
      let months = 0;
      for (const job of this.jobs) {
        months += 
          moment([job.begin_date_year, job.begin_date_month,0])
          .diff([job.end_date_year, job.end_date_month,0]);
      }
      return months
    },
    since: function() {
      let first = this.jobs[this.jobs.length - 1];
      return moment([first.begin_date_year,first.begin_date_month, 1]).fromNow();
    }
  },
  data: function() {
    return {
      jobs: [
        {
          id: 57755135,
          company_city: null,
          company_country: null,
          company_logo:
            "https://www.xing.com/assets/companies/img/default_logo_131x32.png",
          company_name: "Baro Pfannenstein GmbH",
          company_notes:
            "Konzeption, Gestaltung, Umsetzung und Leitung einzelner Projekte und Koordination von Entwicklerteams. Pflege von Projektmanagementsoftware, Knowledge base und Code base.\r\nVerantwortlich für die Entwicklung von Innovationsprojekten (VR sowie Industrie 4.0) für die Fabrikplanung eines namhaften deutschen Immobilienherstellers.",
          company_size_id: 2,
          company_url: "http://baro-pfannenstein.de",
          job_title: "Lead (3D) Frontend Developer",
          level_id: 3,
          org_type_id: 2,
          primary_job: true,
          status_id: 1,
          industry_id: 90200,
          begin_date_year: 2017,
          begin_date_month: 11,
          end_date_year: null,
          end_date_month: null,
          current_company: true,
          techstack: [
            "html5",
            "scss",
            "angularjs",
            "threejs",
            "php",
            "adobe-photoshop",
            "adobe-illustrator"
          ]
        },
        {
          id: 12160790,
          company_city: null,
          company_country: null,
          company_logo:
            "https://www.xing.com/assets/companies/img/default_logo_131x32.png",
          company_name: "Ludwig-Maximilians-Universität München",
          company_notes:
            "Freiberuflich Tätig (unter anderem als  Phexmedia als Webdesigner und Webentwickler.",
          company_size_id: null,
          company_url: null,
          job_title:
            "Medieninformatik-Student / freier Web-Developer und Designer",
          level_id: null,
          org_type_id: null,
          primary_job: false,
          status_id: 4,
          industry_id: 170300,
          begin_date_year: 2010,
          begin_date_month: 10,
          end_date_year: 2017,
          end_date_month: 9,
          current_company: false,
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
          id: 32061031,
          company_city: null,
          company_country: null,
          company_logo:
            "https://www.xing.com/assets/companies/img/default_logo_131x32.png",
          company_name: "CHECK24 Vergleichsportal",
          company_notes: null,
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
            "angularjs",
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
          company_notes: "Web and Flash Freelancer",
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
          techstack: ["flash", "css", "jquery", "php"]
        },
        {
          id: 12160791,
          company_city: null,
          company_country: null,
          company_logo:
            "https://www.xing.com/assets/companies/img/default_logo_131x32.png",
          company_name: "HighText Verlag OHG",
          company_notes:
            "Web Developer der Plattform iBusiness.de. Zuständig für technische und gestalterische Optimierung der eigenen Plattform, Print- und Webanzeigenerstellung.",
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
        },
        {
          id: 12160792,
          company_city: null,
          company_country: null,
          company_logo:
            "https://www.xing.com/assets/companies/img/default_logo_131x32.png",
          company_name: "HighText Verlag OHG",
          company_notes:
            "Auszubildender, Verantwortlich für Webdesign, im team zuständig für CI, CD, Systemadministration und Anwendungsentwicklung",
          company_size_id: 3,
          company_url: "http://www.ibusiness.de",
          job_title: "Auszubildender",
          level_id: 1,
          org_type_id: 4,
          primary_job: false,
          status_id: 1,
          industry_id: 110300,
          begin_date_year: 2007,
          begin_date_month: 9,
          end_date_year: 2009,
          end_date_month: 8,
          current_company: false,
          discipline_id: null,
          techstack: ["html5", "css", "jquery", "BOIL", "mysql"]
        },
        {
          id: 12160793,
          company_city: null,
          company_country: null,
          company_logo:
            "https://www.xing.com/assets/companies/img/default_logo_131x32.png",
          company_name: "Creative Illusions",
          company_notes: "Banner- \u0026 Webdesign",
          company_size_id: 3,
          company_url: null,
          job_title: "Grafik/ Banner-Designer",
          level_id: null,
          org_type_id: null,
          primary_job: false,
          status_id: 4,
          industry_id: 170300,
          begin_date_year: 2005,
          begin_date_month: 4,
          end_date_year: 2006,
          end_date_month: 1,
          current_company: false,
          discipline_id: null,
          techstack: ["adobe-photoshop"]
        },
        {
          id: 12160794,
          company_city: null,
          company_country: null,
          company_logo:
            "https://www.xing.com/assets/companies/img/default_logo_131x32.png",
          company_name: "Welt der Wunder GmbH",
          company_notes: null,
          company_size_id: 3,
          company_url: "http://www.wdw.de",
          job_title: "SchulPraktikant",
          level_id: 1,
          org_type_id: null,
          primary_job: false,
          status_id: 3,
          industry_id: 110400,
          begin_date_year: 2005,
          begin_date_month: 7,
          end_date_year: 2005,
          end_date_month: 8,
          current_company: false,
          discipline_id: null
        },
        {
          id: 12160796,
          company_city: null,
          company_country: null,
          company_logo:
            "https://www.xing.com/assets/companies/img/default_logo_131x32.png",
          company_name: "Privat",
          company_notes: "Gründer der free-Webdesign-Community GraphixX.",
          company_size_id: 2,
          company_url: null,
          job_title: "GraphixX Design",
          level_id: null,
          org_type_id: 5,
          primary_job: false,
          status_id: 5,
          industry_id: 170300,
          begin_date_year: 2004,
          begin_date_month: 2,
          end_date_year: 2005,
          end_date_month: 5,
          current_company: false,
          discipline_id: null,
          techstack: ["adobe-photoshop"]
        }
      ]
    };
  }
};
</script>

