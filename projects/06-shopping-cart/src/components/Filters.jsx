import './Filters.css'

import { useId } from 'react'
import { useFilters } from '../hooks/useFilters.js'

export function Filters () {
  const { filters, setFilters } = useFilters()

  /* El hook useId nos permite generar un identificador ÚNICO para un elemento del DOM
  esto lo que hace es que en base a como se van renderizando los componentes les va
  asignando un id de forma incremental, esto es muy util cuando usamos por ejemplo
  labels e inputs, ademas de que este hook función tanto en CSR y SSR */
  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  const handleChangeMinPrice = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: event.target.value,
    }))
  }

  const handleChangeCategory = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      category: event.target.value,
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor={minPriceFilterId}>
          Precio a partir de:
        </label>

        <input
          type='range'
          id={minPriceFilterId}
          min='0'
          max='1000'
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />

        <span>${filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Categoría</label>

        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value='all'>Todo</option>
          <option value='laptops'>Laptops</option>
          <option value='smartphones'>Celulares</option>
        </select>
      </div>
    </section>
  )
}
