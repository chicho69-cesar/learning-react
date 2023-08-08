import React from 'react'
import { motion } from 'framer-motion'

import Footer from './Footer'
import TodoList from './TodoList'
import { useTodo } from '../hooks/useTodo'
import { getCompletedCount } from '../utils/todos'

export default function MainSection () {
  const { state, completeAll, setTodos, clearCompleted } = useTodo()
  const { todos, visibilityFilter } = state

  const todosCount = todos.length
  const completedCount = getCompletedCount(todos)

  return (
    <motion.section layout className='main'>
      {!!todosCount && (
        <span>
          <input
            className='toggle-all'
            type='checkbox'
            defaultChecked={completedCount === todosCount}
          />
          <label onClick={completeAll} />
        </span>
      )}

      <TodoList
        todos={todos}
        visibilityFilter={visibilityFilter}
        setTodos={setTodos}
      />

      {!!todosCount && (
        <Footer
          completedCount={completedCount}
          activeCount={todosCount - completedCount}
          onClearCompleted={clearCompleted}
        />
      )}
    </motion.section>
  )
}
