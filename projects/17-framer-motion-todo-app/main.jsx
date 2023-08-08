// import './src/style.css'
import 'todomvc-app-css/index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './src/App'

const root = createRoot(document.querySelector('#app'))

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
