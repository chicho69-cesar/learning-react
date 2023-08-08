import React from 'react'
import { motion } from 'framer-motion'

import TodoTextInput from './TodoTextInput'
import { useTodo } from '../hooks/useTodo'

export default function Header () {
  const { addTodo } = useTodo()

  return (
    <header className='header'>
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          delay: 0.2
        }}
      >
        Todos
      </motion.h1>

      <TodoTextInput
        newTodo
        onSave={addTodo}
        placeholder='What needs to be done?'
      />
    </header>
  )
}
