const SerialPort = require('serialport')
const ModbusRTU = require('modbus-serial').default

const client = new ModbusRTU()

module.exports = {
  list: SerialPort.list,
  connect: (path, address, resolve, reject) => {
    client.setID(address)
    client.setTimeout(1000)

    client
      .connectRTUBuffered(path, {
        baudRate: 115200,
        // parity: 'even',
        dataBits: 8,
        stopBits: 1,
      })
      .then(() => {
        resolve(client)
      })
      .catch(reject)
  },
  writeRegister: (address, value) => client.writeRegister(address, value),
  writeCoil: (address, state) => client.writeCoil(address, state),
  readCoils: (address, length = 1) => client.readCoils(address, length),

  readDiscreteInputs: (address, length = 1) => client.readDiscreteInputs(address, length),
  readHoldingRegisters: (address, length = 1) => client.readHoldingRegisters(address, length),
  readInputRegisters: (address, length = 1) => client.readInputRegisters(address, length),
}
