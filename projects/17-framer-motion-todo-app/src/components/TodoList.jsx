import React from 'react'
import { Reorder } from 'framer-motion'

import TodoItem from './TodoItem'
import { getFilteredTodos } from '../utils/todos'

export default function TodoList ({ todos, visibilityFilter, setTodos }) {
  return (
    <>
      {/* El componente Reorder nos permite reordenar los elementos de un array
      y nos renderiza un elemento ul el cual se puede reordenar con drag and drop */}
      <Reorder.Group className='todo-list' axis='y' values={todos} onReorder={setTodos}>
        {getFilteredTodos(todos, visibilityFilter).map((todo, index) => (
          /* Elemento reordenable, renderiza un li */
          <Reorder.Item key={todo.id} value={todo}>
            <TodoItem index={index} todo={todo} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </>
  )
}
