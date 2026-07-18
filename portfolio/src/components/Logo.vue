<template>
  <div class="logo" v-in-viewport="-500">
    <div class="logo-flex">
      <router-link to="/">
        <div class="logo-icon">
          <svg ref="eyeSvg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="38.6px"
            viewBox="39.384 51.899 62.5 38.6" enable-background="new 39.384 51.899 62.5 38.6" xml:space="preserve">
            <defs>
              <clipPath id="eye-socket-clip">
                <!-- eye opening, derived from the inner boundary of the lash path below;
                     keeps the moving eyeball behind the lashes -->
                <path d="M61.184,83.9c-8.2-4.801-13.7-11.7-13.7-11.7s7.601-9.5,18.2-13.9c0,0,6.418-2.343,11.367-2.343
                  s12.833,3.742,12.833,3.742c5.2,2.8,9.399,6.5,12,9.2L101.684,75.499c-2.2,2.301-9.038,7.601-9.038,7.601
                  s-3.583,4.42-14.958,4.42S61.184,83.9,61.184,83.9z" />
              </clipPath>
            </defs>
            <g clip-path="url(#eye-socket-clip)">
              <g ref="iris" class="iris">
                <path d="M78.991,54.224c-1.854-0.182-3.731-0.104-5.567,0.257c-2.738,0.535-5.37,1.693-7.705,3.44l1.387,5.227
                  l-5.22-1.41c-1.759,2.328-2.932,4.962-3.483,7.699c-0.84,4.193-0.264,8.607,1.725,12.486c0.88,1.72,2.031,3.332,3.464,4.774
                  c6.518,6.546,16.604,7.381,24.03,2.488c1.058-0.694,2.057-1.503,2.991-2.434c0.926-0.924,1.738-1.925,2.441-2.975l-5.596-5.617
                  l-4.088-4.108l0,0l-5.433,5.407l1.491,1.498l2.601,2.611c-2.968,1.401-6.402,1.432-9.408,0.15c-1.308-0.562-2.547-1.345-3.617-2.414
                  c-1.501-1.512-2.469-3.338-2.955-5.261c-0.589-2.326-0.465-4.801,0.426-7.055l4.345,1.175l4.476,1.209l-1.191-4.479l-1.149-4.347
                  c3.955-1.544,8.599-0.804,11.898,2.222l5.416-5.393C87.078,56.339,83.086,54.626,78.991,54.224z" />
              </g>
            </g>
            <path class="eye" d="M61.184,83.9c-8.2-4.801-13.7-11.7-13.7-11.7s7.601-9.5,18.2-13.9c0,0,6.418-2.343,11.367-2.343
              s12.833,3.742,12.833,3.742c5.2,2.8,9.399,6.5,12,9.2c-3.9-5.801-13.101-17-25.7-17c-17,0-36.8,19.3-36.8,19.3
              s19.8,19.3,36.8,19.3c12.4,0,21.4-9.7,25.5-15c-2.2,2.301-9.038,7.601-9.038,7.601s-3.583,4.42-14.958,4.42
              S61.184,83.9,61.184,83.9z" />
          </svg>
        </div>
      </router-link>
      <h1 class="logo-name">
        <span class="first-name">manuel.</span>
        <span class="last-name">graf</span>
      </h1>
      <h2 class="subline">
        Code &amp;
        <span class="subline-graf">Graf</span>ik aus München.
      </h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  font-weight: 700;
  box-sizing: border-box;
  margin: 0;

  .logo-flex {
    position: absolute;
    z-index: 49;
    text-align: center;
    padding-top: 30%;
    width: 100%;
    height: 38.2%;
    padding: 0;
    margin: 0;
    background-color: rgba($color-black-light, 0);
    transition: all $duration-noticeable ease;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }

  .logo-name {
    text-align: center;
    font-size: $fontsize-xl;
    padding-top: 1rem;

    @include viewport-tablet {
      font-size: $fontsize-xxl;
    }
  }

  .subline {
    padding-top: 2rem;
    color: $color-black-light;
    font-size: $fontsize-s;

    @include viewport-tablet {
      font-size: $fontsize-m;
    }
  }

  .subline-graf {
    color: $color-green;
  }

  .first-name {
    color: $color-black-light;
  }

  .last-name {
    color: $color-black-light;
    // color: $color-green;
  }

  .logo-icon {
    order: 1;

    // transition: all $duration-complex ease;
    svg {
      height: 60px;
      transition: all $duration-noticeable ease;

      // transition: all $duration-complex ease;
    }
  }

  .eye {
    fill: $color-black-light;
    transition: fill $duration-noticeable ease;
  }

  .iris {
    fill: $color-black-light;
    transition: fill $duration-noticeable ease;
  }
}

.logo.above-viewport {
  .logo-flex {
    position: fixed;
    z-index: 49;
    top: 0;
    height: 60px;
    // padding:10px;
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath fill='%23FFFFFF'  d='M0 0 Q 50 100 100 0 L 0 0z'/%3E%3Cpath stroke='none' fill='%23ffffff' d='M0 0 Q 50 100 100 0'/%3E%3C/svg%3E");
    // height: 30px;
    flex-direction: row;
    justify-content: center;
    padding-bottom: 30px;
    padding-top: 3px;
  }

  .subline {
    display: none;
  }

  .subline {
    display: none;
  }

  .logo-name {
    display: none;
    font-size: $fontsize-s;
    padding: 2px 0 0 0;
    margin: 0;

    .first-name,
    .last-name {
      // font-weight:300;
      color: $color-white-darkest;
    }
  }

  .logo-icon {
    width: 45px;

    svg {
      height: 20px;
      padding: 0;
      margin: 0;
    }
  }
}
</style>

<script>
// iris travel is in viewBox units, so it scales with the rendered logo size
const IRIS_MAX_OFFSET = 4.5;
// cursor distance (px) at which the iris deflection saturates
const IRIS_SATURATE_PX = 260;
// per-frame lerp factor — lower = more Live2D-like lag
const IRIS_EASE = 0.12;

export default {
  name: "logo",
  components: {},
  data: function () {
    return {};
  },
  mounted() {
    this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.irisTarget = { x: 0, y: 0 };
    this.irisCurrent = { x: 0, y: 0 };
    this.rafId = null;
    window.addEventListener("mousemove", this.onMouseMove, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener("mousemove", this.onMouseMove);
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  },
  methods: {
    onMouseMove(e) {
      if (!this.$refs.iris || this.reduceMotion.matches) return;
      const rect = this.$refs.eyeSvg.getBoundingClientRect();
      if (!rect.width) return;
      // the eyeball sits close enough to the viewBox center that the svg
      // rect center works as the eye center in screen coordinates
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const mag = IRIS_MAX_OFFSET * Math.min(1, dist / IRIS_SATURATE_PX);
      this.irisTarget.x = (dx / dist) * mag;
      this.irisTarget.y = (dy / dist) * mag;
      if (this.rafId === null) this.rafId = requestAnimationFrame(this.tick);
    },
    tick() {
      const iris = this.$refs.iris;
      if (!iris) {
        this.rafId = null;
        return;
      }
      const c = this.irisCurrent;
      const t = this.irisTarget;
      c.x += (t.x - c.x) * IRIS_EASE;
      c.y += (t.y - c.y) * IRIS_EASE;
      iris.setAttribute("transform", `translate(${c.x.toFixed(3)} ${c.y.toFixed(3)})`);
      if (Math.abs(t.x - c.x) > 0.01 || Math.abs(t.y - c.y) > 0.01) {
        this.rafId = requestAnimationFrame(this.tick);
      } else {
        this.rafId = null;
      }
    }
  }
};
</script>
