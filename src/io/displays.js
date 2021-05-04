export const events = {
  ATTACHED: 'iq-display-control-attached',
  DETACHED: 'iq-display-control-detached',
  COLLISION: 'iq-display-control-collision',
  FOUND: 'iq-display-found',
  UPDATED: 'iq-display-updated',
  ERROR: 'iq-display-error',
}

// const control = window.iq.displayControl({
//   // onConnected: () => bus.emit(events.ATTACHED),
//   // onDisconnected: () => bus.emit(events.DETACHED),
//   // onFound: (did) => bus.emit(events.FOUND, did),
//   // onCollision: () => bus.emit(events.COLLISION),
//   // onUpdated: (did) => bus.emit(events.UPDATED, did),
//   // onError: (error) => bus.emit(events.ERROR, error),
// })
const control = {}

export default control
