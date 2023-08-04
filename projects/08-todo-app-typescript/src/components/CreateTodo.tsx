import React, { useState } from 'react'

interface Props {
  saveTodo: (title: string) => void
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
  const [inputValue, setInputValue] = useState('')

  /* Cuando usamos TypeScript con React debemos de especificar el tipo de Evento
  que se ejecuta en una función y como genérico el elemento HTML que lanza dicho evento */
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && inputValue !== '') {
      saveTodo(inputValue)
      setInputValue('')
    }
  }

  return (
    <input
      type='text'
      className='new-todo'
      value={inputValue}
      onChange={(e) => { setInputValue(e.target.value) }}
      onKeyDown={handleKeyDown}
      placeholder='¿Qué quieres hacer?'
      autoFocus
    />
  )
}
