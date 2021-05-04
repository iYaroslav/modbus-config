import React from 'react'
import { Window } from '@iq/iq-ui-kit'

import { useProps } from '../hooks/useProps'

const UIWrapper = ({ children, ...props }) => {
  const { windowProps } = useProps()

  return <Window
    theme={ 'light' }
    showWindowControls
    { ...props }
    { ...windowProps }
  >
    { children }
  </Window>
}

export default UIWrapper
