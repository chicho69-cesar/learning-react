import React, { useEffect, useRef, useState } from 'react'

interface Props {
  id: string
  title: string
  completed: boolean
  isEditing: string
  setCompleted: (id: string, completed: boolean) => void
  setTitle: (params: { id: string, title: string }) => void
  setIsEditing: (completed: string) => void
  removeTodo: (id: string) => void
}

export const Todo: React.FC<Props> = ({
  completed,
  id,
  isEditing,
  removeTodo,
  setCompleted,
  setIsEditing,
  setTitle,
  title,
}) => {
  const [editedTitle, setEditedTitle] = useState<string>(title)
  const inputEditTitle = useRef<HTMLInputElement>(null)

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      setEditedTitle(editedTitle.trim())

      if (editedTitle !== title) {
        setTitle({ id, title: editedTitle })
      }

      if (editedTitle === '') {
        removeTodo(id)
      }

      setIsEditing('')
    }

    if (e.key === 'Escape') {
      setEditedTitle(title)
      setIsEditing('')
    }
  }

  useEffect(() => {
    inputEditTitle.current?.focus()
  }, [isEditing])

  return (
    <>
      <div className='view'>
        <input
          type='checkbox'
          className='toggle'
          checked={completed}
          onChange={(e) => { setCompleted(id, e.target.checked) }}
        />

        <label>{title}</label>
        <button 
          className='destroy'
          onClick={() => { removeTodo(id) }}
        ></button>
      </div>

      <input
        type='text'
        className='edit'
        value={editedTitle}
        onChange={(e) => { setEditedTitle(e.target.value) }}
        onKeyDown={handleKeyDown}
        onBlur={() => { setIsEditing('') }}
        ref={inputEditTitle}
      />
    </>
  )
}
