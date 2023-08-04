import './index.css'

import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App.tsx'
import { store } from './store' // Accedemos a la store de Redux

const root = ReactDOM.createRoot(document.getElementById('root')! as HTMLElement)

root.render(
  <Provider store={store}> {/* Proveemos el provider con los estados de redux */}
    <App />
  </Provider>
)
