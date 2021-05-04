module.exports = (app, mainWindow, isDev) => {
  const template = [
    {
      label: 'Application',
      submenu: [
        { label: 'About Application', selector: 'orderFrontStandardAboutPanel:' },
        { label: 'Reload', accelerator: 'CmdOrCtrl+R', role: 'forceReload' },
        { label: 'Quit', accelerator: 'Command+Q', click: app.quit },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
      ],
    },
  ]

  if (isDev) {
    template.push({
      label: 'Dev',
      submenu: [{ label: 'Toggle dev tools', accelerator: 'CmdOrCtrl+Alt+I', role: 'toggleDevTools' }],
    })
  }

  return template
}
