import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Load Plyr styles globally (ensure this runs before component CSS)
import 'plyr/dist/plyr.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
