import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'

const root = createRoot(document.getElementById('root')! as HTMLElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
