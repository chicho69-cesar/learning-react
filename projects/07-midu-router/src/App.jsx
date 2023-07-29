import { lazy, Suspense } from 'react'

import { Router } from './Router'
import { Route } from './Route'

import Page404 from './pages/404.jsx'
import SearchPage from './pages/Search.jsx'

/* Los lazy load components son componentes especiales los cuales hacen que cuando
un componente no se renderiza de inicio en la pagina, lo cual es lo mas normal
en una SPA, lo debemos de hacer lazy porque de esta forma el componente no se va a
descargar hasta que se necesite renderizar */
const LazyHomePage = lazy(() => import('./pages/Home.jsx'))
const LazyAboutPage = lazy(() => import('./pages/About.jsx'))

const appRoutes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage,
  },
  {
    path: '/search/:query',
    Component: SearchPage,
  }
]

function App () {
  return (
    <main>
      {/* El componente especial Suspense se utiliza en conjunto con los lazy load
      components para que mientras el componente lazy se descarga podemos renderizar
      un componente de carga en la prop fallback de Suspense */}
      <Suspense fallback={null}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
