import './App.css'

import { useEffect, useMemo, useRef, useState } from 'react'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UsersList'

function App() {
	const [users, setUsers] = useState<User[]>([])
	const [showColors, setShowColors] = useState<boolean>(false)
	const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
	const [filterCountry, setFilterCountry] = useState<string | null>(null)

	// useRef -> para guardar un valor
  // que queremos que se comparta entre renderizados
  // pero que al cambiar, no vuelva a renderizar el componente
	const originalUsers = useRef<User[]>([])

	const toggleColors = () => {
		setShowColors(!showColors)
	}

	const toggleSortByCountry = () => {
		const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
		setSorting(newSortingValue)
	}

	const handleReset = () => {
		setUsers(originalUsers.current)
	}

	const handleDelete = (email: string) => {
		const filteredUsers = users.filter((user) => user.email !== email)
		setUsers(filteredUsers)
	}

	const handleChangeSort = (sort: SortBy) => {
		setSorting(sort)
	}

	useEffect(() => {
		fetch('https://randomuser.me/api?results=100')
			.then((res) => res.json())
			.then((data) => {
				setUsers(data.results as User[])
				originalUsers.current = data.results as User[]
			})
			.catch((err) => console.error(err))
	}, [])

	const filteredUsers = useMemo(() => {
    console.log('calculate filteredUsers')

		return filterCountry != null && filterCountry.length > 0
			? users.filter((user) => {
				return user.location.country
					.toLowerCase()
					.includes(filterCountry.toLowerCase())
			})
			: users
	}, [users, filterCountry])

	const sortedUsers = useMemo(() => {
		console.log('calculate sortedUsers')

		if (sorting === SortBy.NONE) return filteredUsers

		const compareProperties: Record<string, (user: User) => string> = {
			[SortBy.COUNTRY]: (user) => user.location.country,
			[SortBy.NAME]: (user) => user.name.first,
			[SortBy.LAST]: (user) => user.name.last,
		}

		return filteredUsers.toSorted((a, b) => {
			const extractProperty = compareProperties[sorting]
			return extractProperty(a).localeCompare(extractProperty(b))
		})
	}, [filteredUsers, sorting])

	/* const filteredUsers = (() => {
    console.log('calculate filteredUsers')
    return filterCountry != null && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  })() */

  /* const sortedUsers = (() => {
    console.log('calculate sortedUsers')

    return sortByCountry
      ? filteredUsers.toSorted(
        (a, b) => a.location.country.localeCompare(b.location.country)
      )
      : filteredUsers
  })() */

	return (
		<div className='App'>
			<h1>Prueba técnica</h1>

			<header>
				<button onClick={toggleColors}>
					Colorear filas
				</button>

				<button onClick={toggleSortByCountry}>
					{sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
				</button>

				<button onClick={handleReset}>
					Restablecer estado
				</button>

				<input
					type='text'
					placeholder='Filtrar por país'
					onChange={(e) => {
						setFilterCountry(e.target.value)
					}}
				/>
			</header>

			<main>
				<UsersList
					changeSorting={handleChangeSort}
					deleteUser={handleDelete}
					showColors={showColors}
					users={sortedUsers}
				/>
			</main>
		</div>
	)
}

export default App
