import { useEffect } from 'react'
import { useQueryParams } from '../useQueryParams'

export default function SearchPage ({ routeParams }) {
  const params = useQueryParams()

  useEffect(() => {
    document.title = `Has buscado ${routeParams.query}`
    console.log(params)
  }, [routeParams, params])

  return (
    <h1>Has buscado {routeParams.query}</h1>
  )
}
