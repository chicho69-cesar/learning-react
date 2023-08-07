import './src/style.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#app'))

root.render(
  <StrictMode>
    <h1>Hola Mundo</h1>
  </StrictMode>
)
