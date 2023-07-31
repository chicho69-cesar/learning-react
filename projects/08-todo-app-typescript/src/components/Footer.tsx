import React from 'react'
import { type FilterValue } from '../types'
import { Filters } from './Filters'

interface Props {
  handleFilterChange: (filter: FilterValue) => void
  onClearCompleted: () => void
  activeCount: number
  completedCount: number
  filterSelected: FilterValue
}

export const Footer: React.FC<Props> = ({
  activeCount,
  completedCount,
  filterSelected,
  handleFilterChange,
  onClearCompleted,
}) => {
  const singleActiveCount = activeCount === 1
  const activeTodoWord = singleActiveCount ? 'tarea' : 'tareas'

  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{activeCount}</strong> {activeTodoWord} pendiente{!singleActiveCount && 's'}
      </span>

      <Filters 
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
      />

      {completedCount > 0 && (
        <button
          className='clear-completed'
          onClick={onClearCompleted}
        >
          Borrar completados
        </button>
      )}
    </footer>
  )
}
