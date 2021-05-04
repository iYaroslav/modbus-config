const electron = require('electron')
const { app, BrowserWindow, Menu, ipcMain } = electron
const fs = require('fs')
const AutoLaunch = require('auto-launch')
const os = require('os')
const path = require('path')
const electronIsDev = require('electron-is-dev')

const cli = require('./cli')
const getWindowState = require('./windowState')

const isDev = cli.flags.dev || require('electron-is-dev')

let mainWindow
app.commandLine.appendSwitch('--disable-http-cache')
app.commandLine.appendSwitch('--ignore-gpu-blacklist')
app.setAppUserModelId('uz.yaroslav.modbus')
app.allowRendererProcessReuse = false

function getAppUrl() {
  if (electronIsDev) {
    return `http://localhost:3131`
  } else {
    return `file://${ path.join(__dirname, 'index.html') }`
  }
}

(() => { // Fixing user data path
  const dataPath = app.getPath('userData')
  const testFile = path.resolve(dataPath, 'check_rw_permissions.txt')

  try {
    fs.writeFileSync(testFile, 'OK')
    fs.readFileSync(testFile)
  } catch (e) {
    const dir = path.resolve(path.dirname(app.getPath('exe')), 'data')
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    app.setPath('userData', dir)
  }
})()

function createWindow() {
  const state = getWindowState()

  mainWindow = new BrowserWindow({
    ...state,
    show: false,
    frame: false,
    resizable: false,
    backgroundColor: '#FFF',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: isDev,
      spellcheck: false,
      textAreasAreResizable: false,
      enableRemoteModule: false,
      webgl: true,
      defaultEncoding: 'UTF-8',
      backgroundThrottling: false,
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  mainWindow
    .loadURL(getAppUrl())
    .then(() => {
      mainWindow.show()
      console.log('MANAGE')
      state.manage(mainWindow)

      if (isDev) {
        // noinspection JSUnresolvedFunction
        mainWindow.webContents.openDevTools()
      }
    })
    .catch(() => {})

  mainWindow.once('closed', () => mainWindow = null)

  mainWindow.webContents.addListener('crashed', (e) => {
    if (!isDev) {
      app.relaunch()
      app.exit(0)
    } else {
      console.error('WEB App crashed', e)
    }
  })

  mainWindow.on('focus', () => mainWindow.webContents.send('focus-changed', true))
  mainWindow.on('blur', () => mainWindow.webContents.send('focus-changed', false))

  ipcMain.on('window-close', () => mainWindow.close())
  ipcMain.on('window-minimize', () => mainWindow.minimize())

  ipcMain.on('window-autorun-enable', () => {
    if (!isDev) {
      new AutoLaunch({
        name: 'QMS iQueue',
        path: os.platform() === 'linux' ? process.env.APPIMAGE : electron.app.getPath('exe'),
      })
        .enable()
        .catch(console.error)
    }
  })

  ipcMain.on('window-autorun-disable', () => {
    if (!isDev) {
      new AutoLaunch({
        name: 'QMS iQueue',
        path: os.platform() === 'linux' ? process.env.APPIMAGE : electron.app.getPath('exe'),
      })
        .disable()
        .catch(console.error)
    }
  })

  Menu.setApplicationMenu(Menu.buildFromTemplate(require('./menu')(app, mainWindow, isDev)))
}

app.on('ready', () => createWindow())

app.on('window-all-closed', () => app.quit())

app.on('activate', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore()
    } else {
      mainWindow.focus()
    }
  } else {
    createWindow()
  }
})

if (!isDev) {
  process.on('uncaughtException', () => {
    app.relaunch()
    app.exit(0)
  })

  process.on('SIGTERM', () => {
    app.relaunch()
    app.exit(0)
  })
}

process.on('SIGINT', () => {
  app && app.quit()
  process.exit()
})
