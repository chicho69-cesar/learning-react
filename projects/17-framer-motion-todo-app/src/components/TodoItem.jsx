import classNames from 'classnames'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

import { useTodo } from '../hooks/useTodo'
import TodoTextInput from './TodoTextInput'

/* Las variantes nos ayudan a especificar las variaciones que va a tener en
animaciones y las propiedades css que van a cambiar en un componente al ser animado */
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
      /* Los estilos custom se usan cuando en las variants usamos una función para
      realizar las animaciones, en este caso se ejecuta la función visible y le
      pasamos la propiedad delay */
      custom={{
        delay: (index + 1) * 0.1
      }}
      initial='hidden' // Animación inicial de las variantes
      animate='visible' // Animación de las variantes
      exit='hidden' // Animación cuando se desmonta el componente
      variants={variants} // Especificamos las variants
      layoutId={todo.id} /* Especificamos el id del componente, principalmente
      cuando renderizamos varios componentes de este mismo componente */
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
              whileTap={{ scale: 0.9 }} // Al hacer click
              whileHover={{ scale: 1.5, cursor: 'pointer' }} // Al hacer hover
              type='button'
              className='destroy'
              onClick={() => deleteTodo(todo.id)}
            />
          </div>
          )}
    </motion.div>
  )
}
