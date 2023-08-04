import './index.css'

import { createRoot } from 'react-dom/client'
import App from './App'

const root = createRoot(document.querySelector('#root')! as HTMLElement)
root.render(<App />)
