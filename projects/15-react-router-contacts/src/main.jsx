import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import Root, { loader as rootLoader, action as rootAction } from './routes/Root'
import ErrorPage from './pages/ErrorPage'
import Index from './routes/Index'
import Contact, { loader as contactLoader, action as contactAction } from './routes/Contact'
import EditContact, { action as editContactAction } from './routes/Edit'
import { action as destroyAction } from './routes/Destroy'

/* Asi podemos definir las rutas de nuestro proyecto especificando cada una de las rutas
como un objeto del arreglo que recibe createBrowserRouter */
// eslint-disable-next-line no-unused-vars
const routerFromObjects = createBrowserRouter([
  {
    path: '/', // Path es la ruta que va a tener el component
    element: <Root />, // Element es el componente que va a renderizar cuando se haga match con la ruta
    errorElement: <ErrorPage />, // ErrorElement es el componente que va a renderizar cuando ocurra un error en el match con la ruta
    loader: rootLoader, // Loader es una función que se ejecuta antes de renderizar el componente
    action: rootAction, // Action es una función que se ejecuta se hace un submit de un Form
    children: [ // Children es un arreglo de objetos que contiene las rutas hijas
      {
        errorElement: <ErrorPage />, // errorElement compartido con las rutas hijas
        children: [
          {
            /* Las rutas son index son las rutas por defecto, es decir, la primer
            ruta hija que se va a renderizar cuando estemos en su ruta padre */
            index: true,
            element: <Index />,
          },
          {
            path: '/contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: '/contacts/:contactId/edit',
            element: <EditContact />,
            loader: contactLoader,
            action: editContactAction,
          },
          {
            path: '/contacts/:contactId/destroy',
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ]
      },
    ]
  },
])

/* Asi podemos definir las rutas de nuestro proyecto especificando cada una de las rutas
con elementos JSX y no con objetos */
const routerFromJSX = createBrowserRouter(
  createRoutesFromElements(
    <Route 
      path='/'
      element={<Root />}
      errorElement={<ErrorPage />}
      loader={rootLoader}
      action={rootAction}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />

        <Route
          path='/contacts/:contactId'
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />

        <Route
          path='/contacts/:contactId/edit'
          element={<EditContact />}
          loader={contactLoader}
          action={editContactAction}
        />

        <Route
          path='/contacts/:contactId/destroy'
          element={<div>Oops! There was an error.</div>}
          action={destroyAction}
        />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Renderizamos nuestras rutas */}
    <RouterProvider router={routerFromJSX} />
  </React.StrictMode>,
)
