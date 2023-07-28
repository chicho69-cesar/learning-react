import { useContext } from 'react'
import { FiltersContext } from '../context/filters'

export function useFilters () {
  /* El hook useContext nos permite acceder al valor que tenemos registrado
  en el contexto, y tal como se maneja con el estado, cada que cambia el valor
  de este contexto, los componentes y los hooks accederán a este nuevo valor y
  se volverán a renderizar. */
  const { filters, setFilters } = useContext(FiltersContext)

  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        product.price >= filters.minPrice && 
        (
          filters.category === 'all' || 
          product.category === filters.category
        )
      )
    })
  }

  return { filters, setFilters, filterProducts }
}
