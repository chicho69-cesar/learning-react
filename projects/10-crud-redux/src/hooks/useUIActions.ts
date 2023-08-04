import { setIsAddingUser } from '../store/ui/slice'
import { UserWithId } from '../store/users/slice'
import { useAppDispatch } from './store'

export function useUIActions () {
  const dispatch = useAppDispatch() // Usamos nuestro hook para hacer dispatch

  const stablishIsAddingUser = (isAddingUser: boolean, user?: UserWithId) => {
    /* Hacemos dispatch de la acción que establecemos en el slice, para cambiar
    el estado de isAddingUser */
    dispatch(setIsAddingUser({ isAddingUser, userToEdit: user }))
  }

  return {
    stablishIsAddingUser,
  }
}
