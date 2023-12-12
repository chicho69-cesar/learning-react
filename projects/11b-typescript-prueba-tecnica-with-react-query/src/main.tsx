import './index.css'

import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import App from './App.tsx'

const root = createRoot(document.querySelector('#root') as HTMLElement)
/* Creamos nuestro query client para react query */
const queryClient = new QueryClient()

root.render(
  /* Creamos nuestro provider para react query y le pasamos el query client */
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools />
  </QueryClientProvider>,
)
