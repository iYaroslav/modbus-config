import React from 'react'
import { Select, Form, Layout, Button } from '@iq/iq-ui-kit'
import UIWrapper from './components/UIWrapper'
import HexInput from './components/HexInput'

const App = () => {
  return <UIWrapper>
    <Form onSubmit={ () => {} }>
      <Select
        required
        name='port'
        placeholder='Serialport'
        entries={ () => window.API.serial.list() }
        render={ ({ path }) => ({ key: path, title: path }) }
      />

      <HexInput
        required
        value={ 1 }
        name='address'
        placeholder='Address'
      />

      <Layout horizontal>
        <HexInput
          required
          name='register'
          placeholder='Register'
          value={ 0xD001 }
        />

        <HexInput
          name='value'
          placeholder='Value'
          value={ 0 }
        />
      </Layout>

      <Layout horizontal fill>
        <Button primary title='Read' onClick={ () => {

        } } />
        <Button submit danger title='Write' />
      </Layout>
    </Form>
  </UIWrapper>
}

export default App
