import { Input } from '@iq/iq-ui-kit'
import React from 'react'

export default function HexInput(props) {
  return <Input
    type={ 'number' }
    hint={ (v) => {
      if (v < 0) return 'Value must be a number!'
      if (v > 255) return 'Value too large!'
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
    checkValidity={ (v) => v < 256 && v >= 0 }
    serialize={ (v) => {
      if (isNaN(v)) return '0x'

      try {
        return '0x' + (v.toString(16).toUpperCase().padStart(2, '0'))
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
