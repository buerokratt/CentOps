import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
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
