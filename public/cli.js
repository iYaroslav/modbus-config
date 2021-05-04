const parseArgs = require('electron-args')

const cli = parseArgs(`
Modbus

Options
  --dev       Open in development mode
`,
  {
    alias: {
      h: 'help',
    },
    default: {
      dev: false,
      geometry: 'auto',
    },
  },
)

module.exports = cli
