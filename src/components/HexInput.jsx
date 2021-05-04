import { Input } from '@iq/iq-ui-kit'
import React from 'react'

export default function HexInput(props) {
  return <Input
    type={ 'number' }
    hint={ (v) => {
      if (v > (2 << 15) - 1) return 'Value too large!'
      if (v < 0) return 'Value must be greater than 0!'
      return true
    } }
    onFocus={ (e) => {
      if (e.target.value && e.target.value.indexOf('x')) {
        e.target.setSelectionRange(
          e.target.value.indexOf('x') + 1,
          e.target.value.length
        )
      }
    } }
    checkValidity={ (v) => v < (2 << 15) && v >= 0 }
    serialize={ (v) => {
      try {
        return '0x' + v.toString(16).toUpperCase()
      } catch (e) {
        return '0x'
      }
    } }
    deserialize={ (v) => {
      if (!v) return 0
      if (v.indexOf('x') !== -1) {
        v = v.substr(v.indexOf('x') + 1)
      }

      return Number.parseInt(v, 16)
    } }

    { ...props }
  />
}
