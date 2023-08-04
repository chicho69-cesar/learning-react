import { configureStore, type Middleware } from '@reduxjs/toolkit'
import { toast } from 'sonner'

import usersReducer, { rollbackUser } from './users/slice'
import uiReducer from './ui/slice'

/* Creamos un middleware para redux, donde la store tiene acceso al estado, 
next es la función que va a hacer que se continue con el reducer que va a cambiar
el estado, y la action es la acción que se esta ejecutando con dispatch mediante
la cual se va a modificar el estado */
const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  // Previous state before the action
  // console.log(store.getState()) // Accedemos al valor antes de ser modificado

  next(action) // Continuamos con la acción que se va a ejecutar

  // New state after the action
  // console.log(store.getState()) // Accedemos al valor después de ser modificado

  window.localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
}

const syncWithDatabaseMiddleware: Middleware = (store) => (next) => (action) => {
  const { type, payload } = action // Obtenemos el type y el payload de la acción
  const previousState = store.getState() as RootState // Accedemos al estado previo

  next(action)

  /* Evaluamos la acción ejecutada en el slice users */
  if (type === 'users/deleteUserById') { // Eliminando el usuario
    const userIdToRemove = payload
    const userToRemove = previousState.users.find((user) => user.id === userIdToRemove)

    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
			method: 'DELETE'
		})
      .then((res) => {
        if (res.ok) {
          toast.success(`Usuario ${payload} eliminado correctamente`)
        }

        // throw new Error('Error al eliminar el usuario')
      })
      .catch((err) => {
        toast.error(`Error al eliminar el usuario ${userIdToRemove}`)
        if (userToRemove) store.dispatch(rollbackUser(userToRemove))

        console.log(err)
        console.log('Error')
      })
  }
}

/* Creamos nuestra store para Redux, la cual sera como una pizza en la cual va a tener
muchas rebanadas (slices) de estados diferentes, los cuales se conocen como reducers,
donde por ejemplo tenemos un slice para almacenar el estado de los usuarios y otra
para almacenar el estado de la interfaz de usuario. También podemos configurar
los middlewares, los cuales son funciones las cuales se van a ejecutar cuando una acción
es lanzada con un dispatch */
export const store = configureStore({
  reducer: {
    users: usersReducer,
    ui: uiReducer,
  },
  middleware: [
    persistanceLocalStorageMiddleware,
    syncWithDatabaseMiddleware,
  ],
})

/* Exportamos el estado global de nuestra store como RootState */
export type RootState = ReturnType<typeof store.getState>
/* Exportamos el dispatch para acciones de nuestra store como AppDispatch */
export type AppDispatch = typeof store.dispatch
