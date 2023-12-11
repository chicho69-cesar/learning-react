import { useUsers } from '../hooks/use-users'

export default function Results() {
  const { users } = useUsers()
  
  return (
    <h3>
      Results: {users.length} users found.
    </h3>
  )
}
