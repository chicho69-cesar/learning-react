import './App.css'

import { useCallback, useRef, useState } from 'react'
import debounce from 'just-debounce-it'

import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

function App() {
  /* El hook de React useRef nos permite crear referencias mutables la cual
  persiste durante todo el ciclo de vida de nuestros componentes, y es muy util
  para guardar cualquier valor que se pueda mutar como un identificador, un elemento
  del DOM, un contador, etc. Y cada que vez que su valor cambia no vuelve a renderizar
  el componente a diferencia del useState, este cada que el componente se vuelve
  a renderizar esta referencia no cambia su valor */
  const queryRef = useRef(null)
  // const [, setError] = useState(null)

  /* Esta es una forma de manejar un formulario de una forma no controlada, es decir,
  empleando mas el DOM que React para manejar el formulario */
  /* const handleSubmit = (event) => { // Recibimos el evento
    event.preventDefault()

    // Extraemos los valores del formulario 
    const { query } = Object.fromEntries(
      // Creamos un FormData con los datos del formulario
      new window.FormData(event.target)
    )

    console.log({ query })

    if (query === '') {
      setError('No ingresaste nada en la búsqueda inténtalo de nuevo')
    }
  } */

  const [sort, setSort] = useState(false)

  const { search, error, updateSearch } = useSearch()
  const { movies, loading, error: moviesError, getMovies } = useMovies({ search, sort })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetMovies = useCallback(
    /* Aquí debounce es una función la cual va a ejecutar la función que recibe
    como callback una vez que pasen los 300 milisegundos después de que los
    parámetros ya no cambien, es decir, una vez que search ya no cambia y pasan 300 ms
    se va a ejecutar el callback */
    debounce(search => {
      console.log(`Search: ${search}`)
      getMovies({ search })
    }, 300)
    , [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>

        <form className='form' onSubmit={handleSubmit}>
          <input
            type='text'
            name='query'
            ref={queryRef}
            value={search}
            onChange={handleChange}
            placeholder='Avengers, Star Wars, The Matrix...'
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}
          />

          <input
            type='checkbox'
            checked={sort}
            onChange={handleSort}
          />

          <button type='submit'>Buscar</button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {loading ? (
          <p>Cargando...</p>
        ) : moviesError ? (
          <p>Hubo un error al cargar las películas</p>
        ) : (
          <Movies movies={movies} />
        )}
      </main>
    </div>
  )
}

export default App
