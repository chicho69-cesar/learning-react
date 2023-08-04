import { setIsAddingUser } from '../store/ui/slice'
import { UserWithId } from '../store/users/slice'
import { useAppDispatch } from './store'

export function useUIActions () {
  const dispatch = useAppDispatch()

  const stablishIsAddingUser = (isAddingUser: boolean, user?: UserWithId) => {
    dispatch(setIsAddingUser({ isAddingUser, userToEdit: user }))
  }

  return {
    stablishIsAddingUser,
  }
}