import { useAtom } from 'jotai'

import { css } from '../../../../../styled-system/css'
import { filterAtom } from '../../store/todos'
import type { FilterType } from '../../types/todos.d'

export default function Filter() {
  /* Resolvemos el atom filterAtom y obtenemos tanto valor como set */
  const [filter, setFilter] = useAtom(filterAtom)

  return (
    <div className={filtersContainer}>
      <label className={filterLabel}>
        <input
          type='radio'
          name='filter'
          className={filterInput}
          value='all'
          checked={filter === 'all'}
          onChange={(e) => setFilter(e.target.value as FilterType)}
        />
        All
      </label>

      <label className={filterLabel}>
        <input
          type='radio'
          name='filter'
          className={filterInput}
          value='completed'
          checked={filter === 'completed'}
          onChange={(e) => setFilter(e.target.value as FilterType)}
        />
        Completed
      </label>

      <label className={filterLabel}>
        <input
          type='radio'
          name='filter'
          className={filterInput}
          value='uncompleted'
          checked={filter === 'uncompleted'}
          onChange={(e) => setFilter(e.target.value as FilterType)}
        />
        Uncompleted
      </label>
    </div>
  )
}

const filtersContainer = css({
  width: 'full',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  marginBottom: '1rem',
})

const filterLabel = css({
  fontSize: '1.125rem',
  color: 'slate.900',
  fontWeight: 'bold'
})

const filterInput = css({
  marginRight: '0.25rem',
  accentColor: 'slate.900',
  cursor: 'pointer'
})
