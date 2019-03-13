import './click-highlight.scss'

const MAX_TIMEOUT = 250
const HIGHLIGHT_CLASS = 'v-click-highlight'

export default {
  bind (el) {
    const trigger = el.__highlightTrigger = () => triggerHighlight(el)
    el.addEventListener('mousedown', trigger)
    el.addEventListener('touchstart', trigger)
  },
  unbind (el) {
    el.removeEventListener('mousedown', el.__highlightTrigger)
    el.removeEventListener('mouseup', el.__highlightRemover)
    el.removeEventListener('mouseout', el.__highlightRemover)
    el.removeEventListener('touchend', el.__highlightRemover)
  }
}

export function trigger (el) {
  if (el instanceof Element) {
    triggerHighlight(el, false)
    setTimeout(() => removeHighlight(el), MAX_TIMEOUT)
  } else {
    trigger(el.$el)
  }
}

function triggerHighlight (el, bindEvents = true) {
  const remover = el.__highlightRemover = () => removeHighlight(el)
  el.classList.add(HIGHLIGHT_CLASS)
  el.__highlightStartTimestamp = Date.now()
  if (bindEvents) {
    el.addEventListener('mouseup', remover)
    el.addEventListener('mouseout', remover)
    el.addEventListener('touchend', remover)
  }
  if (el.__highlightStopTimeout) {
    clearTimeout(el.__highlightStopTimeout)
    el.__highlightStopTimeout = undefined
  }
}

function removeHighlight (el) {
  const delta = Date.now() - el.__highlightStartTimestamp
  if (delta > MAX_TIMEOUT) {
    el.classList.remove(HIGHLIGHT_CLASS)
  } else {
    el.__highlightStopTimeout =
      setTimeout(() => removeHighlight(el), MAX_TIMEOUT - delta)
  }
}
