import React from 'react'
import { TODO_FILTERS } from '../consts'
import { type FilterValue } from '../types'

const FILTERS_BUTTONS = {
  [TODO_FILTERS.ALL]: { literal: 'All', href: `?filter=${TODO_FILTERS.ALL}`},
  [TODO_FILTERS.ACTIVE]: { literal: 'Active', href: `?filter=${TODO_FILTERS.ACTIVE}`},
  [TODO_FILTERS.COMPLETED]: { literal: 'Completed', href: `?filter=${TODO_FILTERS.COMPLETED}`},
} as const

interface Props {
  handleFilterChange: (filter: FilterValue) => void
  filterSelected: typeof TODO_FILTERS[keyof typeof TODO_FILTERS]
}

export const Filters: React.FC<Props> = ({ handleFilterChange, filterSelected }) => {
  /* También podemos especificar el tipo de evento que queremos manejar en el parámetro
  (e | event) de la función, no solo el tipo de la función */
  const handleClick = (filter: FilterValue) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    handleFilterChange(filter)
  }

  return (
    <ul className='filters'>
      {Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
        const isSelected = filterSelected === key
        const className = isSelected ? 'selected' : ''

        return (
          <li key={key}>
            <a 
              href={href}
              className={className}
              onClick={handleClick(key as FilterValue)}
            >
              {literal}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
