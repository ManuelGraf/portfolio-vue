/**
 * Minimal replacement for vue-in-viewport-directive (Vue 2 only).
 * Adds the same classes the old directive did:
 *   in-viewport / above-viewport / below-viewport
 *
 * The numeric binding value works like the old offset:
 * a negative value (e.g. v-in-viewport="-500") means the element
 * only counts as "above the viewport" once it is that many pixels
 * past the viewport top.
 */
const HANDLERS = new WeakMap()

function offsetOf(binding) {
  return typeof binding.value === 'number' ? binding.value : 0
}

function update(el, offset) {
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  const above = rect.bottom < offset
  const below = rect.top > vh - offset
  el.classList.toggle('above-viewport', above)
  el.classList.toggle('below-viewport', below)
  el.classList.toggle('in-viewport', !above && !below)
}

export default {
  mounted(el, binding) {
    const handler = () => update(el, offsetOf(binding))
    HANDLERS.set(el, handler)
    window.addEventListener('scroll', handler, { passive: true, capture: true })
    window.addEventListener('resize', handler, { passive: true })
    handler()
  },
  updated(el, binding) {
    update(el, offsetOf(binding))
  },
  unmounted(el) {
    const handler = HANDLERS.get(el)
    if (handler) {
      window.removeEventListener('scroll', handler, { capture: true })
      window.removeEventListener('resize', handler)
      HANDLERS.delete(el)
    }
  }
}
