import React from 'react'
import PropTypes from 'prop-types'
import FilterLink from './Link'

import { FILTER_TITLES } from '../constants'

export default function Footer ({ activeCount, completedCount, onClearCompleted }) {
  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{activeCount || 'No'}</strong>{' '}
        {activeCount === 1 ? 'item' : 'items'} left
      </span>

      <ul className='filters'>
        {FILTER_TITLES.map((filter) => (
          <li key={filter}>
            <FilterLink filter={filter}>{filter}</FilterLink>
          </li>
        ))}
      </ul>

      {!!completedCount && (
        <button
          type='button'
          className='clear-completed'
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  )
}

/* Utilizamos el paquete de prop-types para validar los tipos de las props
en un componente en React con JavaScript sin usar TypeScript */
Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired
}
