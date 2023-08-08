import React from 'react'
import { motion } from 'framer-motion'

import TodoTextInput from './TodoTextInput'
import { useTodo } from '../hooks/useTodo'

export default function Header () {
  const { addTodo } = useTodo()

  return (
    <header className='header'>
      {/* Motion es una librería en la cual mediante el componente motion podemos
      usar todos los elementos html que pueden ser animables, y principalmente
      las props de initial y de animate aceptan las propiedades css de los
      elementos, propiedades las cuales son animables */}
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
