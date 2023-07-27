import { useCallback, useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const previousSearch = useRef(search)

  /* El hook useCallback se usa para memorizar funciones, es prácticamente
  lo mismo que useMemo pero aplicado a funciones, esto debido a que no queremos
  que cuando el hook se vuelva a renderizar, la función se cree de nuevo,
  con esto la memorizamos y evitamos que los efectos que dependen de esta
  función se vuelvan a ejecutar cada que el hook cambia algo. */
  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search

      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  /* El hook de useMemo lo usamos para memorizar valores, este es muy usado
  cuando hacemos un calculo el cual no queremos que se este realizando cada vez
  que cambie el estado del hook, ya que cada vez que se vuelva a renderizar el
  hook, este calculo se volvería a realizar, pero al memorizarlo solo se va a 
  volver a hacer cuando el alguna de las dependencias del memo cambien */
  const sortedMovies = useMemo(() => {
    return sort 
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [movies, sort])

  return {
    movies: sortedMovies,
    loading,
    error,
    getMovies,
  }
}
