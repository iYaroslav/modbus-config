const escpos = require('escpos')
escpos.USB = require('escpos-usb')
escpos.Serial = require('escpos-serialport')
const { list, PortInfo } = require('serialport')
const { filter, path, pipe, tap } = require('ramda')

// const supportedVendors = {
//   '0483': {
//     '3350': true,
//   },
// }

async function lsTty() {
  return pipe(
    tap(console.log),
    // filter((item) =>
    //   !!path([item.vendorId || '', item.productId || ''], supportedVendors)),
    //   (items) => {
    //
    //     if (!items.length) {
    //       return undefined
    //     }
    //
    //     return {
    //       path: items[0].path,
    //       serial: items[0].serialNumber || ''
    //     }
    //   },
  )(await list())
}

async function getPrinter() {
  let device

  try {
    device = new escpos.USB()
  } catch (e) {
    // const ttys = await lsTty()
    device = new escpos.Serial('/dev/tty.usbserial-0001', {
      baudRate: 9600,
    })
  }

  const printer = new escpos.Printer(device, { encoding: "GB18030" /* default */ })

  if (!device) console.log('No device')
  if (!printer) console.log('No prenter')

  return [device, printer]
}

function print() {
  getPrinter()
    .then(([device, printer]) => {
      console.log(printer)
      if (device && printer) {
        device.open(() => {
          // printer
          //   .text('Hello printer!')
          //   .cut()
          //   .print(escpos.command.GS + '\x65\x03\x00')
          //   .close()

          printer
            .font('a')
            .align('ct')
            .style('bu')
            .size(1, 1)
            .text('The quick brown fox jumps over the lazy dog')
            .text('敏捷的棕色狐狸跳过懒狗')
            .barcode('1234567', 'EAN8')
            .table(["One", "Two", "Three"])
            .tableCustom(
              [
                { text:"Left", align:"LEFT", width:0.33, style: 'B' },
                { text:"Center", align:"CENTER", width:0.33},
                { text:"Right", align:"RIGHT", width:0.33 }
              ],
              { encoding: 'cp857', size: [1, 1] } // Optional
            )
            .qrimage('https://github.com/song940/node-escpos', function(err){
              this.cut();
              this.close();
            });
        })
      }
    })
    .catch(console.error)
}

print()
