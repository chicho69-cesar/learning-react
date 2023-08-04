import { User, UserId, UserWithId, addNewUser, deleteUserById, updateUserById } from '../store/users/slice';
import { useAppDispatch } from './store'

/* Redefinimos las acciones que vamos a utilizar para trabajar con el estado en este
custom hook ya que esto nos va a permitir que si llegamos a cambiar el gestor de estado
solamente cambiar la funcionalidad de las acciones en este hook y no tener que buscar
en toda la aplicación el uso de los dispatches directos de redux */
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
