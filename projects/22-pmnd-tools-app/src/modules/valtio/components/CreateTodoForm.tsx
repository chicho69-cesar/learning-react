import { useEffect, useRef } from 'react'

import { css } from '../../../../styled-system/css'
import { addTodo } from '../store/todos'

export default function CreateTodoForm() {
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (formRef.current) {
      formRef.current.deadline.value = getDefaultDate()
    }
  }, [])

  const getDefaultDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 1)
    return date.toISOString().substring(0, 11) + '12:00'
  }

  const reset = () => {
    if (formRef.current) {
      formRef.current.reset()
      formRef.current.deadline.value = getDefaultDate()
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={(e) => addTodo(e, reset)}
    >
      <div className={inputGroup}>
        <label className={label}>Todo</label>
        <input
          type='text'
          name='description'
          placeholder='Add a new todo'
          autoComplete='off'
          minLength={2}
          className={input}
        />
      </div>

      <div className={inputGroup}>
        <label className={label}>Deadline</label>
        <input
          type='datetime-local'
          name='deadline'
          className={input}
        />
      </div>

      <button type='submit' className={add}>
        Add new
      </button>
    </form>
  )
}

const inputGroup = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  flexWrap: 'nowrap',
})

const input = css({
  width: '100%',
  padding: '8px',
  outline: 'none',
  rounded: 'md',
  marginBottom: '16px',
})

const label = css({
  marginRight: '16px',
  textTransform: 'capitalize',
  color: 'gray.100'
})

const add = css({
  width: '100%',
  backgroundColor: 'slate.800',
  padding: '4px',
  color: 'white',
  marginY: '16px',
  shadow: 'md',
  rounded: 'md',
  cursor: 'pointer',
})
