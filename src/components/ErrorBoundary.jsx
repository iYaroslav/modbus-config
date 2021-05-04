import React from 'react'
import { Button, Header } from '@iq/iq-ui-kit';
import UIWrapper from './UIWrapper'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
  }

  render() {
    if (this.state.hasError) {
      return (
        <UIWrapper
          header={<Header
            title='Unhandled error detected!'
            subtitle='Please, send this message to developer'
          />}
          footer={<Button
            danger
            title="Reload application"
            onClick={() => window.location.reload()}
          />}
        >
          <pre style={{
            margin: 0,
            color: 'var(--iq-error)',
            fontSize: '80%',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            userSelect: 'auto',
            pointerEvent: 'auto',
            cursor: 'text',
          }}>{
            this.state.error.toString() + '\n\n' + (this.state.error.stack || '')
          }</pre>
        </UIWrapper>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
