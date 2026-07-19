<template>
  <div class="logo">
    <div class="logo-flex" ref="flex">
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
              <!-- full eye silhouette (outer boundary of the outline, corner tip closed
                   with z); the moving lid is confined to this so the descending lash
                   never slides out of the eye -->
              <clipPath id="eye-outline-clip">
                <path d="M101.884,68.899c-3.9-5.801-13.101-17-25.7-17c-17,0-36.8,19.3-36.8,19.3s19.8,19.3,36.8,19.3
                  c12.4,0,21.4-9.7,25.5-15z" />
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
            <!-- upper lid unit: white skin with the designer's upper-lid vector riding
                 its lower edge; a blink translates + squashes the inner group down over
                 the eye. The outer group's static clip keeps it inside the silhouette. -->
            <g clip-path="url(#eye-outline-clip)">
              <g ref="lid">
                <path class="lid-skin" d="M47.491,72.191c0.076-0.096,7.647-9.514,18.193-13.892c0,0,6.418-2.343,11.367-2.343
                  s12.833,3.742,12.833,3.742c5.2,2.8,9.399,6.5,12,9.2L101.884,15L47.491,15z" />
                <path class="eye" d="M47.491,72.191c0.076-0.096,7.647-9.514,18.193-13.892c0,0,6.418-2.343,11.367-2.343
                  s12.833,3.742,12.833,3.742c5.2,2.8,9.399,6.5,12,9.2c-3.9-5.801-13.101-17-25.7-17c-17,0-36.8,19.3-36.8,19.3
                  s0.013,0.013,0.017,0.016L47.491,72.191z" />
              </g>
            </g>
            <!-- lower lid + eye corners: static, drawn above the moving lid so the
                 closed eye rests on the lower lid line -->
            <path class="eye" d="M92.646,83.1c0,0-3.583,4.42-14.958,4.42S61.184,83.9,61.184,83.9c-8.2-4.801-13.7-11.7-13.7-11.7
              s0.007-0.008,0.007-0.009l-8.09-0.977c0.348,0.338,19.935,19.284,36.783,19.284c12.4,0,21.4-9.7,25.5-15
              C99.483,77.8,92.646,83.1,92.646,83.1z" />
          </svg>
        </div>
      </router-link>
      <div class="logo-text" ref="text">
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
  </div>
</template>

<style lang="scss" scoped>
.logo {
  font-weight: 700;
  box-sizing: border-box;
  margin: 0;

  .logo-flex {
    // scroll progress of the shrink: 0 = full hero logo, 1 = docked header.
    // Written per scroll frame by onShrinkScroll, so the morph is
    // scroll-linked and reversible instead of a class toggle that jumps.
    --logo-shrink: 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 49;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    // hero block (38.2vh) morphs into the 93px docked header
    height: calc(38.2vh + (93px - 38.2vh) * var(--logo-shrink));
    // bottom padding lifts the docked icon into the white curve
    padding: 0 0 calc(50px * var(--logo-shrink)) 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // white curve of the docked header, faded in with the shrink
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath fill='%23FFFFFF'  d='M0 0 Q 50 100 100 0 L 0 0z'/%3E%3Cpath stroke='none' fill='%23ffffff' d='M0 0 Q 50 100 100 0'/%3E%3C/svg%3E") no-repeat;
      background-size: 100% 100%;
      opacity: var(--logo-shrink);
      pointer-events: none;
    }
  }

  .logo-text {
    // the text block collapses with the shrink, which is what lets the eye
    // (the flex item above it) glide down into the docked header; its
    // natural height is measured by onShrinkScroll, the fallback only
    // matters for the instant before the first frame
    height: calc(var(--logo-text-h, 10rem) * (1 - var(--logo-shrink)));
    overflow: hidden;
    // fade out early in the shrink, before the clipping becomes noticeable
    opacity: calc(1 - var(--logo-shrink) * 2.5);
  }

  .logo-name {
    text-align: center;
    font-size: $fontsize-xl;
    // the global line-height is set in em and inherits as a fixed ~24px,
    // which the big name overflows — a unitless value scales with the font
    line-height: 1.1;
    margin: 0;
    padding-top: 1rem;

    @include viewport-tablet {
      font-size: $fontsize-xxl;
    }
  }

  .subline {
    line-height: 1.3;
    margin: 0;
    padding-top: 0.5rem;
    color: $color-black-light;
    font-size: $fontsize-s;

    @include viewport-tablet {
      font-size: $fontsize-m;
    }
  }

  .subline-graf {
    color: $color-black-lighter;
  }

  .first-name {
    color: $color-black-light;
  }

  .last-name {
    color: $color-black-light;
    // color: $color-green;
  }

  .logo-icon {
    svg {
      // 60px in the hero, 20px when docked; no transition — the size is
      // driven directly by the scroll position, a transition would lag it
      height: calc(60px - 40px * var(--logo-shrink));
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

  .lid-skin {
    // skin of the upper lid: pure white to match the Home background and the
    // white header curve; it erases the iris and the static upper lash line
    // as the lid comes down (at rest it is white-on-white, invisible)
    fill: white;
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

// blink pause: 2.5s minimum plus up to 4.5s of randomness
const BLINK_MIN_DELAY = 2500;
const BLINK_MAX_EXTRA = 4500;
const BLINK_DURATION = 260;
const DOUBLE_BLINK_CHANCE = 0.15;
// closed-lid transform: SVG groups scale about the user-space origin (y=0),
// so a point lands at LID_SQUASH * y + LID_TRAVEL. With 0.8 / 43 the upper
// lash arc (rest y ≈ 52-56) flattens and settles on the lower lash line
// (y ≈ 87.5) while the skin still covers the whole eye opening.
const LID_SQUASH = 0.8;
const LID_TRAVEL = 43;

// the hero-to-header shrink completes once the hero block (38.2vh, see
// .logo-flex height in the styles) has been scrolled past
const SHRINK_RANGE_VH = 0.382;

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
    this.blinkTimer = null;
    this.shrinkRafId = null;
    window.addEventListener("mousemove", this.onMouseMove, { passive: true });
    window.addEventListener("scroll", this.onShrinkScroll, { passive: true });
    window.addEventListener("resize", this.onShrinkScroll, { passive: true });
    this.onShrinkScroll();
    this.scheduleBlink();
  },
  beforeUnmount() {
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("scroll", this.onShrinkScroll);
    window.removeEventListener("resize", this.onShrinkScroll);
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    if (this.shrinkRafId !== null) cancelAnimationFrame(this.shrinkRafId);
    if (this.blinkTimer !== null) clearTimeout(this.blinkTimer);
  },
  methods: {
    onShrinkScroll() {
      if (this.shrinkRafId !== null) return;
      this.shrinkRafId = requestAnimationFrame(() => {
        this.shrinkRafId = null;
        const flex = this.$refs.flex;
        const text = this.$refs.text;
        if (!flex || !text) return;
        // natural height of the (possibly clipped) text block: sum of its
        // children, since the wrapper's own height is scroll-driven
        let textHeight = 0;
        for (const child of text.children) textHeight += child.offsetHeight;
        const range = window.innerHeight * SHRINK_RANGE_VH;
        const p = Math.min(1, Math.max(0, window.scrollY / range));
        flex.style.setProperty("--logo-text-h", `${textHeight}px`);
        flex.style.setProperty("--logo-shrink", p.toFixed(4));
      });
    },
    scheduleBlink() {
      this.blinkTimer = setTimeout(() => {
        this.blink(Math.random() < DOUBLE_BLINK_CHANCE ? 2 : 1);
        this.scheduleBlink();
      }, BLINK_MIN_DELAY + Math.random() * BLINK_MAX_EXTRA);
    },
    blink(times) {
      const lid = this.$refs.lid;
      if (!lid || !lid.animate || this.reduceMotion.matches) return;
      // close fast (ease-in), hold a beat, reopen slower — real-blink cadence
      // (px inside the svg resolve to viewBox units, so this scales with size)
      const closed = `translateY(${LID_TRAVEL}px) scaleY(${LID_SQUASH})`;
      const anim = lid.animate(
        [
          { transform: "translateY(0px) scaleY(1)", easing: "ease-in" },
          { transform: closed, offset: 0.35 },
          { transform: closed, offset: 0.5, easing: "ease-out" },
          { transform: "translateY(0px) scaleY(1)" }
        ],
        { duration: BLINK_DURATION }
      );
      if (times > 1) {
        anim.onfinish = () => this.blink(times - 1);
      }
    },
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
