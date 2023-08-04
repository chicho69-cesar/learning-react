import { configureStore, type Middleware } from '@reduxjs/toolkit'
import { toast } from 'sonner'

import usersReducer, { rollbackUser } from './users/slice'
import uiReducer from './ui/slice'

const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  // Previous state before the action
  // console.log(store.getState())

  next(action)

  // New state after the action
  // console.log(store.getState())

  window.localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
}

const syncWithDatabaseMiddleware: Middleware = (store) => (next) => (action) => {
  const { type, payload } = action
  const previousState = store.getState() as RootState

  next(action)

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

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
