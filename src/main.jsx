import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalContextProvider } from './context/GlobalContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </StrictMode>,
)
