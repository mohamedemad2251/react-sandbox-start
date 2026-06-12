import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// NOTE: Notice how we import ./index.css, that's the CSS related to the index.html page (we cleared it out to do the styling ourselves)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
