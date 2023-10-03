import { useAtom } from 'jotai'
import type { PrimitiveAtom } from 'jotai'
import { a, useTransition } from '@react-spring/web'

import { css } from '../../../../../styled-system/css'
import { filteredAtom } from '../../store/todos'
import type { Todo } from '../../types/todos.d'
import TodoItem from './TodoItem'

type RemoveFn = (item: PrimitiveAtom<Todo>) => void
interface FilteredProps {
  remove: RemoveFn
}

export default function Filtered({ remove }: FilteredProps) {
  /* Resolvemos el atom de los filteredAtom, en el cual obtenemos el valor
  del atom, el cual es un PrimitiveAtom que aun necesita de ser resuelto */
  const [todos] = useAtom(filteredAtom)

  const transitions = useTransition(todos, {
    keys: (item) => item.toString(),
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 40 },
    leave: { opacity: 0, height: 0 },
  })

  return transitions((style, atom) => (
    <a.div className={item} style={style}>
      <TodoItem atom={atom} remove={remove} />
    </a.div>
  ))
}

const item = css({
  position: 'relative',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
  overflow: 'hidden',

  '& > span': {
    display: 'inline-block',
    width: '100%'
  }
})
