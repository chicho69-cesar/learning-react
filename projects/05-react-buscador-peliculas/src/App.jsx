import './App.css'

import { useState, useRef } from 'react'

import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function App() {
  const { movies } = useMovies()

  /* El hook de React useRef nos permite crear referencias mutables la cual
  persiste durante todo el ciclo de vida de nuestros componentes, y es muy util
  para guardar cualquier valor que se pueda mutar como un identificador, un elemento
  del DOM, un contador, etc. Y cada que vez que su valor cambia no vuelve a renderizar
  el componente a diferencia del useState, este cada que el componente se vuelve
  a renderizar esta referencia no cambia su valor */
  const queryRef = useRef(null)
  const [, setError] = useState(null)

  /* Esta es una forma de manejar un formulario de una forma no controlada, es decir,
  empleando mas el DOM que React para manejar el formulario */
  const handleSubmit = (event) => { // Recibimos el evento
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
  }

  return (
    <div>
      <header>
        <h1>Buscador de películas</h1>

        <form className='form' onSubmit={handleSubmit}>
          <input
            type='text'
            name='query'
            ref={queryRef}
            placeholder='Avengers, Star Wars, The Matrix...'
          />

          <button type='submit'>Buscar</button>
        </form>
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
