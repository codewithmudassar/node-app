import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './components/Context.jsx'

createRoot(document.getElementById('root')).render(
  <CartProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </CartProvider>
)
