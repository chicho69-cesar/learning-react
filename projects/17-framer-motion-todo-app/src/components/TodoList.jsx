import React from 'react'
import { Reorder } from 'framer-motion'

import TodoItem from './TodoItem'
import { getFilteredTodos } from '../utils/todos'

export default function TodoList ({ todos, visibilityFilter, setTodos }) {
  return (
    <>
      <Reorder.Group className='todo-list' axis='y' values={todos} onReorder={setTodos}>
        {getFilteredTodos(todos, visibilityFilter).map((todo, index) => (
          <Reorder.Item key={todo.id} value={todo}>
            <TodoItem index={index} todo={todo} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </>
  )
}
