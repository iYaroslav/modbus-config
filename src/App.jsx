import React, { useState, useCallback } from 'react'
import { Select, Message, Layout, Card } from '@iq/iq-ui-kit'
import UIWrapper from './components/UIWrapper'
import HexInput from './components/HexInput'

function Coil({ read, write, name, disabled }) {
  const [address, setAddress] = useState(0)
  const [value, setValue] = useState(1)

  return <Card title={ name } style={ {
    padding: '1.6rem 0 0',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: 'none',
    borderRadius: 0,
  } }>
    <Layout horizontal>
      <HexInput
        disabled={ disabled }
        required
        name={ 'register' + name.replace(' ', '') }
        placeholder='Address'
        value={ address }
        onChange={ setAddress }
        actions={ [{
          icon: 'vertical_align_bottom',
          onClick: () => read(address),
        }] }
      />

      <Select
        required
        entries={[ 1, 2 ]}
        render={(v) => ({
          key: v,
          title: v === 1 ? 'True' : 'False'
        })}
        disabled={ disabled }
        name={ 'value' + name.replace(' ', '') }
        placeholder='Value'
        value={ value }
        onChange={ setValue }
        actions={ [{
          icon: 'send',
          onClick: () => write(address, value === 1),
        }] }
      />
    </Layout>
  </Card>
}

function Register({ read, write, name, disabled }) {
  const [address, setAddress] = useState(0)
  const [value, setValue] = useState(0)

  return <Card title={ name } style={ {
    padding: '1.6rem 0 0',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: 'none',
    borderRadius: 0,
  } }>
    <Layout horizontal>
      <HexInput
        disabled={ disabled }
        required
        name={ 'register' + name.replace(' ', '') }
        placeholder='Address'
        value={ address }
        onChange={ setAddress }
        actions={ [{
          icon: 'vertical_align_bottom',
          onClick: () => read(address),
        }] }
      />

      <HexInput
        disabled={ disabled }
        name={ 'value' + name.replace(' ', '') }
        placeholder='Value'
        value={ value }
        onChange={ setValue }
        actions={ [{
          icon: 'send',
          onClick: () => write(address, value),
        }] }
      />
    </Layout>
  </Card>
}

// noinspection JSUnresolvedVariable
const Serial = window.API.serial

const App = () => {
  const [address, setAddress] = useState(1)

  const read = useCallback((promise) => {
    promise
      .then(({ buffer }) => {
        // noinspection JSCheckFunctionSignatures
        Message({
          title: '0x' + (buffer.toString('hex').padStart(2, '0')),
          timeout: 5000,
          type: 'success'
        })
      })
      .catch((e) => {
        Message({
          title: 'Unable to read',
          subtitle: e.message,
          timeout: 5000,
          type: 'error'
        })
      })
  }, [])

  const write = useCallback((promise) => {
    promise
      .then(() => {
        Message({
          title: 'Success',
          timeout: 3000,
          type: 'success'
        })
      })
      .catch((e) => {
        Message({
          title: 'Unable to write',
          subtitle: e.message,
          timeout: 5000,
          type: 'error'
        })
      })
  }, [])

  return <UIWrapper>
    <HexInput
      required
      value={ address }
      onChange={ setAddress }
      name='address'
      placeholder='Address'
    />

    <Select
      required
      name='port'
      placeholder='Serialport'
      entries={ () => Serial.list() }
      render={ ({ path }) => ({ key: path, title: path }) }
      onChange={(port) => {
        if (!port || !address) return

        // noinspection JSCheckFunctionSignatures
        Message
          .Loading(new Promise((resolve, reject) => {
            Serial.connect(port.path, address, resolve, reject)
          }))
          .then((_client) => {
            Message({
              title: 'Connected',
              timeout: 3000,
              type: 'success'
            })
          })
          .catch((e) => {
            Message({
              title: 'Unable to connect',
              subtitle: e.message,
              timeout: 15000,
              type: 'error'
            })
          })
      } }
    />

    <Coil
      name='Coils'
      read={ (address) => read(Serial.readCoils(address)) }
      write={ (address, value) => write(Serial.writeCoil(address, value)) }
    />

    <Register
      name='Discrete Inputs'
      read={ (address) => read(Serial.readDiscreteInputs(address)) }
      write={ (address, value) => write(Serial.writeRegister(address, value)) }
    />

    <Register
      name='Holding Registers'
      read={ (address) => read(Serial.readHoldingRegisters(address)) }
      write={ (address, value) => write(Serial.writeRegister(address, value)) }
    />

    <Register
      name='Input Registers'
      read={ (address) => read(Serial.readInputRegisters(address)) }
      write={ (address, value) => write(Serial.writeRegister(address, value)) }
    />
  </UIWrapper>
}

export default App
