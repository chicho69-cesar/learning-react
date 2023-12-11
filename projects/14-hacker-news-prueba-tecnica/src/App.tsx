import { Suspense, lazy } from 'react'
import { Route } from 'wouter'

import Header from './components/Header'

const TopStoriesPage = lazy(() => import('./pages/TopStoriesPage'))
const DetailsPage = lazy(() => import('./pages/DetailsPage'))

function App() {
  return (
    <>
      <Header />

      <main>
        <Suspense fallback={<p>Loading...</p>}>
          <Route path='/' component={TopStoriesPage} />
          <Route path='/article/:id' component={DetailsPage} />
        </Suspense>
      </main>
    </>
  )
}

export default App
