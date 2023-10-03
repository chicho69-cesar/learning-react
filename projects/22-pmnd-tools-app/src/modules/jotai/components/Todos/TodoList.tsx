import { atom, useSetAtom } from 'jotai'
import type { PrimitiveAtom } from 'jotai'

import { css } from '../../../../../styled-system/css'
import { todosAtom } from '../../store/todos'
import type { Todo } from '../../types/todos.d'
import Filter from './Filter'
import Filtered from './Filtered'

type RemoveFn = (item: PrimitiveAtom<Todo>) => void

export default function TodoList() {
  /* Obtenemos la función set de todosAtom para cambiar el valor del atom, 
  el cual debe de ser un PrimitiveAtom */
  const setTodos = useSetAtom(todosAtom)

  const remove: RemoveFn = (todo) => {
    setTodos((prev) => prev.filter((item) => item !== todo))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const title = formData.get('title') as string

    /* Cuando hacemos un set de un nuevo valor del atom, debemos de usar
    la función atom de jotai para que el valor sea en efecto un PrimitiveAtom
    le pasamos el tipo que va a resolver el atom y el valor de este */
    setTodos((prev) => [
      ...prev,
      atom<Todo>({ title, completed: false })
    ])

    form.reset()
  }

  return (
    <form onSubmit={handleSubmit} className={form}>
      <Filter />

      <input
        type='text'
        name='title'
        placeholder='Add todo...'
        className={input}
      />

      <Filtered remove={remove} />
    </form>
  )
}

const form = css({
  width: '1/3',
})

const input = css({
  width: '100%',
  border: 'none',
  padding: '0.5rem 1rem',
  rounded: 'md',
  shadow: 'md',

  '&:focus': {
    outline: 'none'
  }
})
