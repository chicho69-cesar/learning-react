import { useData } from './hooks/useData'
import type { TodoType } from './types/todos.d'
import { fetcherFromApi as fetcher } from './utils/fetchers'

export default function DependencyInversion() {
  const { data } = useData<TodoType[]>({ 
    key: '/todos', 
    fetcher, 
  })

  if (!data) return (
    <p>Loading ....</p>
  )

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>
          <span>{todo.id}</span>
          <span>{todo.title}</span>
        </li>
      ))}
    </ul>
  )
}
