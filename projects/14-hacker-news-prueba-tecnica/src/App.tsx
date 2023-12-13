import { Suspense, lazy } from 'react'
import { Route } from 'wouter'

import Header from './components/Header'

/* Utilizamos Lazy Load para cargar las paginas bajo demando solamente cuando
sean necesarias de renderizar en la pagina del usuario. */
const TopStoriesPage = lazy(() => import('./pages/TopStoriesPage'))
const DetailsPage = lazy(() => import('./pages/DetailsPage'))

function App() {
  return (
    <>
      <Header />

      <main>
        {/* Nos creamos un suspense para renderizar un loading mientras se hace
        la carga en lazy load de cada pagina */}
        <Suspense fallback={<p>Loading...</p>}>
          <Route path='/' component={TopStoriesPage} />
          <Route path='/article/:id' component={DetailsPage} />
        </Suspense>
      </main>
    </>
  )
}

export default App
