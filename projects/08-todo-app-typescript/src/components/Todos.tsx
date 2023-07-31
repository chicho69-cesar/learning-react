import React, { useState } from 'react'
// import { useAutoAnimate } from '@formkit/auto-animate'

import { Todo } from './Todo'
import type { Todo as TodoType } from '../types.d.ts'

interface Props {
  todos: TodoType[]
  setCompleted: (id: string, completed: boolean) => void
  setTitle: (params: Omit<TodoType, 'completed'>) => void
  removeTodo: (id: string) => void
}

export const Todos: React.FC<Props> = ({
  removeTodo,
  setCompleted,
  setTitle, 
  todos,
}) => {
  const [isEditing, setIsEditing] = useState<string>('')
  // const [parent] = useAutoAnimate(/* optional config */)

  return (
    <ul className='todo-list'>
      {todos?.map((todo) => (
        <li
          key={todo.id}
          onDoubleClick={() => { setIsEditing(todo.id) }}
          className={`
            ${todo.completed ? 'completed' : ''}
            ${isEditing === todo.id ? 'editing' : ''}
          `}
        >
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            setCompleted={setCompleted}
            setTitle={setTitle}
            removeTodo={removeTodo}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </li>
      ))}
    </ul>
  )
}
