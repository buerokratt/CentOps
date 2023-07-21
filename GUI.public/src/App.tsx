import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from './components/Toast/ToastContext'
import RootComponent from './RootComponent'

const App: React.FC = () => {
  return (
    <BrowserRouter basename={'/'}>
      <ToastProvider>
        <RootComponent />
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
