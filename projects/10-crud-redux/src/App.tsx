import './App.css'

import { Toaster } from 'sonner'
import { ListOfUsers } from './components/ListOfUsers'
import { UserActions } from './components/UserActions'

function App () {
  return (
    <>
      <ListOfUsers />
      <UserActions />
      <Toaster richColors />
    </>
  )
}

export default App
