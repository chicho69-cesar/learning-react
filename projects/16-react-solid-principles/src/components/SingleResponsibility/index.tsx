import { useFetchTodos } from './hooks/useFetchTodos'

export default function SingleResponsibility() {
  const { todos, isFetching } = useFetchTodos()

  if (isFetching) {
    return <p>Loading...</p>
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span>{todo.id}</span>
          <span>{todo.title}</span>
        </li>
      ))}
    </ul>
  )
}
