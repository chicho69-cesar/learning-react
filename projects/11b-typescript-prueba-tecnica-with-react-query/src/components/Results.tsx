import { useUsers } from '../hooks/use-users'

export default function Results() {
  /* React Query nos permite mantener un estado asíncrono, debido a que cuando hacemos
  uso de la data que esta regresa en la query, como hace caching de los resultados cada
  que haces uso de la query con la misma key nos va a regresar los mismos datos,
  y si esta data cambia le notifica a todos los subscribers que usaron esa query para
  que tengan la nueva información */
  const { users } = useUsers()
  
  return (
    <h3>
      Results: {users.length} users found.
    </h3>
  )
}
