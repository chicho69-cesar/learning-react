import './index.css'
import 'todomvc-app-css/index.css'

import ReactDOM from 'react-dom/client'
import App from './App.tsx'

const root: ReactDOM.Root = ReactDOM.createRoot(
  window.document.getElementById('root')! as HTMLElement
)

root.render(
  <App />
)
