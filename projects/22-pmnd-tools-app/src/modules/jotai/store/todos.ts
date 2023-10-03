import { atom } from 'jotai'
import type { PrimitiveAtom } from 'jotai'

import type { Todo, FilterType } from '../types/todos.d'

export const filterAtom = atom<FilterType>('all')
/* Creamos un atom con un PrimitiveAtom, el cual nos ayuda a poder hacer que el 
valor del atom cuando lo resolvamos con get, este resultado siga siendo un atom, 
lo cual es util para arreglos, ya que si lo resolvemos tendremos un atom de
un array, y cuando mapeamos el arreglo podemos resolver cada elemento que sera un atom */
export const todosAtom = atom<PrimitiveAtom<Todo>[]>([])

export const filteredAtom = atom<PrimitiveAtom<Todo>[]>((get) => {
  const filter = get(filterAtom)
  const todos = get(todosAtom)

  if (filter === 'all') return todos
  /* Resolvemos cada elemento como un atom */
  else if (filter === 'completed') return todos.filter((atom) => get(atom).completed)
  else return todos.filter((atom) => !get(atom).completed)
})
