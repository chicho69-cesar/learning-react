import './index.css'

/* Importamos las fuentes de roboto que son las que utiliza Material UI */
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import App from './App'
import { darkTheme } from './config/theme'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  /* Usamos el theme provider para configurar el theme de Material UI para el proyecto */
  <ThemeProvider theme={darkTheme}>
    {/* Usamos el css baseline para hacer un unificador del css en todos los 
    navegadores, igual que si fuera normalize css */}
    <CssBaseline />
    <App />
  </ThemeProvider>
)
