import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import App from './App.jsx'

/* Configuramos nuestro 'ApolloClient' para que guarde la cache de los datos
en memoria y acceda al servidor GraphQL en la dirección 'http://localhost:4000' */
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}> {/* Establecemos el ApolloProvider */}
      <App />
    </ApolloProvider>
  </React.StrictMode>
)
