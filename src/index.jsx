import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { initUIKit } from '@iq/iq-ui-kit'
import '@iq/iq-ui-kit/lib/iq-ui-kit.css'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary'
import { PropsProvider } from './hooks/useProps'

const root = document.getElementById('root')
root.addEventListener('contextmenu', e => e.preventDefault())

initUIKit()

render(<ErrorBoundary>
  <PropsProvider>
    <App />
  </PropsProvider>
</ErrorBoundary>, root)
