const windowStateKeeper = require('electron-window-state')

function getWindowState() {
  return windowStateKeeper({
    defaultWidth: 414,
    defaultHeight: 639,
  })
}

module.exports = getWindowState
