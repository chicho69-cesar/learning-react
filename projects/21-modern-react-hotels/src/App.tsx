import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Route, Switch } from 'wouter'
import { Toaster } from 'react-hot-toast'

import HotelList from './components/HotelList'
import HotelDetails from './components/HotelDetails'

function App() {
  return (
    <div>
      {/* Creamos nuestro toaster con react-hot-toast */}
      <Toaster position='top-left' reverseOrder={false} />
      
      {/* Creamos nuestro cliente de react-query */}
      <QueryClientProvider client={new QueryClient()}>
        {/* Creamos nuestro Switch para navegar entre las rutas con wouter */}
        <Switch>
          {/* Creamos nuestra primera ruta con wouter */}
          <Route
            path='/'
            component={HotelList}
          />

          <Route
            path='/hotel/:id'
            component={HotelDetails}
          />
        </Switch>
      </QueryClientProvider>
    </div>
  )
}

export default App
