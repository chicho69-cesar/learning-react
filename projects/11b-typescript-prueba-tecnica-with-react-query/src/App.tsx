import './App.css'

import { useMemo, useState } from 'react'

import Results from './components/Results'
import UsersList from './components/UsersList'
import { useUsers } from './hooks/use-users'
import { SortBy, type User } from './types.d'

function App() {
  /* Obtenemos toda la informacion de la query que hacemos con el custom hook
  useUsers, el cual interiormente hace uso de react-query para hacer fetch */
  const { isLoading, isError, users, hasNextPage, refetch, fetchNextPage } = useUsers()

  const [showColors, setShowColors] = useState(false)
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const handleToggleColors = () => {
    setShowColors(!showColors)
  }

  const handleToggleSortByCountry = () => {
    const newSortingValue = sortBy === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSortBy(newSortingValue)
  }

  const handleReset = () => {
    void refetch()
  }

  /* const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  } */

  const handleChangeSort = (sort: SortBy) => {
    setSortBy(sort)
  }

  const filteredUsers = useMemo(() => {
    return filterCountry != null && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country
          .toLowerCase()
          .includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if (sortBy === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sortBy]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sortBy])

  return (
    <div className='App'>
      <h1>Prueba Técnica</h1>
      <Results />

      <header>
        <button onClick={handleToggleColors}>
          Colorful rows
        </button>

        <button onClick={handleToggleSortByCountry}>
          {sortBy === SortBy.COUNTRY ? 'Reset sort' : 'Sort by country'}
        </button>

        <button onClick={handleReset}>
          Reset state
        </button>

        <input
          type="text"
          placeholder='Filter by country'
          onChange={(e) => setFilterCountry(e.target.value)}
        />
      </header>

      <main>
        {users.length > 0 && (
          <UsersList
            changeSorting={handleChangeSort}
            deleteUser={/* handleDelete */ () => { console.log('Hola') }}
            showColors={showColors}
            users={sortedUsers}
          />
        )}

        {isLoading && <p>Cargando...</p>}
        {isError && <p>Error al cargar los usuarios</p>}
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}

        {!isLoading && !isError && hasNextPage === true && (
          <button onClick={() => { void fetchNextPage() }}>
            Cargar más resultados
          </button>
        )}

        {!isLoading && !isError && hasNextPage === false && (
          <p>No hay más resultados</p>
        )}
      </main>
    </div>
  )
}

export default App
