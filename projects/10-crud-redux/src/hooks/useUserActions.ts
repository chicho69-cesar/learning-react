import { User, UserId, UserWithId, addNewUser, deleteUserById, updateUserById } from '../store/users/slice';
import { useAppDispatch } from './store'

export function useUserActions () {
  const dispatch = useAppDispatch()

  const addUser = ({ name, email, github }: User) => {
    dispatch(addNewUser({ name, email, github }))
  }

  const removeUser = (userId: UserId) => {
    dispatch(deleteUserById(userId))
  }

  const editUser = (user: UserWithId) => {
    dispatch(updateUserById(user))
  }

  return {
    addUser,
    removeUser,
    editUser,
  }
}
