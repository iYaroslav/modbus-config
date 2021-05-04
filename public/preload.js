const { contextBridge, ipcRenderer } = require('electron')
const path = require('path')

contextBridge.exposeInMainWorld('API' , {
  appIconPath: path.join(__dirname, 'app-icon.png'),
  serial: require('./serial'),
  closeWindow: () => ipcRenderer.send('window-close'),
  minimizeWindow: () => ipcRenderer.send('window-minimize'),
  printTicket: (ticket) => ipcRenderer.send('print-ticket', ticket),
  onFocusChanged: (cb) => ipcRenderer.on('focus-changed', (_, focused) => cb(focused)),
  onConfigRequest: (cb) => ipcRenderer.on('config-request', () => cb()),
  setAutorun: (enabled) => {
    if (enabled) {
      ipcRenderer.send('window-autorun-enable')
    } else {
      ipcRenderer.send('window-autorun-disable')
    }
  },
})
