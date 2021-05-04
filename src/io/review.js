export const events = {
  ATTACHED: 'iq-review-attached',
  DETACHED: 'iq-review-detached',
  WAKE_UP: 'iq-review-wakeup',
  SLEEP: 'iq-review-sleep',
  REVIEW: 'iq-reviewed',
}

// const control = window.iq.reviewControl({
  // onAttached: () => bus.emit(events.ATTACHED),
  // onDetached: () => bus.emit(events.DETACHED),
  // onReview: (rate) => bus.emit(events.REVIEW, rate),
  // onWakeUp: () => bus.emit(events.WAKE_UP),
  // onSleep: () => bus.emit(events.SLEEP),
// })
const control = {}

export default control
