import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FiltersProvider } from './context/filters/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FiltersProvider> {/* Inyectamos nuestro provider con el contexto */}
      <App />
    </FiltersProvider>
  </React.StrictMode>,
)
