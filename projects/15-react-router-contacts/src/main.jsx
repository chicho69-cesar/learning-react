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

// eslint-disable-next-line no-unused-vars
const routerFromObjects = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
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
    <RouterProvider router={routerFromJSX} />
  </React.StrictMode>,
)
