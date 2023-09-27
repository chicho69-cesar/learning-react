import { Fragment } from 'react'
import { useSnapshot } from 'valtio'

import { css } from '../../../../styled-system/css'
import type { Filter } from '../types/todos.d'
import { setFilter, store } from '../store/todos'

export default function Filters() {
  const snap = useSnapshot(store)
  const filterValues: Filter[] = ['all', 'completed', 'overdue', 'pending']

  return (
    <nav>
      {filterValues.map((filter) => (
        <Fragment key={filter}>
          <input
            name='filter'
            id={`filter-${filter}`}
            type='radio'
            value={filter}
            className={input}
            checked={snap.filter === filter}
            onChange={() => setFilter(filter)}
          />

          <label htmlFor={`filter-${filter}`} className={label}>
            {filter.toUpperCase()}
          </label>
        </Fragment>
      ))}
    </nav>
  )
}

const input = css({
  marginBottom: '32px',
})

const label = css({
  marginRight: '16px',
  marginLeft: '8px',
  fontSize: '1.2rem',
  color: 'gray.200',
  fontWeight: 'semibold',
  textTransform: 'capitalize'
})
