import { useAppSelector } from '../hooks/store'
import { CreateNewUser } from './CreateNewUser'
import { EditUser } from './EditUser'

export const UserActions = () => {
  const ui = useAppSelector((state) => state.ui)

  return (
    <>
      {ui.isAddingUser ? <CreateNewUser /> : <EditUser />}
    </>
  )
}
