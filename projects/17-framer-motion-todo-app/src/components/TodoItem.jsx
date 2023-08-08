import classNames from 'classnames'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

import { useTodo } from '../hooks/useTodo'
import TodoTextInput from './TodoTextInput'

const variants = {
  hidden: {
    opacity: 0
  },
  visible: ({ delay }) => ({
    opacity: 1,
    transition: {
      duration: 1,
      delay
    }
  })
}

export default function TodoItem ({ index, todo }) {
  const [editing, setEditing] = useState(false)
  const { editTodo, completeTodo, deleteTodo } = useTodo()

  const handleDoubleClick = () => setEditing(true)

  const handleSave = (id, text) => {
    if (text.length === 0) {
      deleteTodo(id)
    } else {
      editTodo(id, text)
    }
    setEditing(false)
  }

  return (
    <motion.div
      className={classNames({
        completed: todo.completed,
        editing
      })}
      custom={{
        delay: (index + 1) * 0.1
      }}
      initial='hidden'
      animate='visible'
      exit='hidden'
      variants={variants}
      layoutId={todo.id}
    >
      {editing
        ? (
          <TodoTextInput
            text={todo.text}
            editing={editing}
            onSave={(text) => handleSave(todo.id, text)}
          />
          )
        : (
          <div className='view'>
            <input
              className='toggle'
              type='checkbox'
              checked={todo.completed}
              onChange={() => completeTodo(todo.id)}
            />

            <label onDoubleClick={handleDoubleClick}>
              {todo.text}
            </label>

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.5, cursor: 'pointer' }}
              type='button'
              className='destroy'
              onClick={() => deleteTodo(todo.id)}
            />
          </div>
          )}
    </motion.div>
  )
}
