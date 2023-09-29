import { useAtom } from 'jotai'
import type { PrimitiveAtom } from 'jotai'

import { css } from '../../../../../styled-system/css'
import type { Todo } from '../../types/todos.d'

type RemoveFn = (item: PrimitiveAtom<Todo>) => void
interface TodoItemProps {
  atom: PrimitiveAtom<Todo>
  remove: RemoveFn
}

export default function TodoItem({ atom, remove }: TodoItemProps) {
  const [item, setItem] = useAtom(atom)

  const toggleCompleted = () => {
    setItem((prev) => ({ ...prev, completed: !prev.completed }))
  }

  return (
    <>
      <input
        type='checkbox'
        className={input}
        checked={item.completed}
        onChange={toggleCompleted}
      />

      <span
        style={{
          textDecoration: item.completed ? 'line-through' : ''
        }}
        className={span}
      >
        {item.title}
      </span>

      <div
        className={icon}
        onClick={() => remove(atom)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 384 512"
        >
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
        </svg>
      </div>
    </>
  )
}

const input = css({
  accentColor: 'slate.900',
})

const span = css({
  fontSize: '1.125rem',
  color: 'slate.900',
  fontWeight: 'semibold'
})

const icon = css({
  padding: '0.25rem',
  backgroundColor: 'white',
  cursor: 'pointer',
  rounded: 'sm',
  shadow: 'sm'
})
