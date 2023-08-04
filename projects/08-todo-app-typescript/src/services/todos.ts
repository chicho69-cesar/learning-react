import { type TodoList } from '../types'

interface Todo {
  id: string
  title: string
  completed: boolean
  order: number
}

export const fetchTodos = async (): Promise<Todo[]> => {
  /* Para usar variables de entorno en Vite, hay que usar la función import.meta.env.
  con ello accedemos a las env variables, aunque hay que tener en cuenta que aunque
  no publiquemos las .env en GitHub si hacemos deploy del proyecto estas .env van a
  estar disponibles en el navegador. ¡POR LO QUE NO ES SEGURO USARLAS AQUÍ! */
  const response = await fetch(import.meta.env.VITE_API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': import.meta.env.VITE_API_BIN_KEY,
    },
  })

  if (!response.ok) {
    console.log('Error fetching todos')
    return []
  }

  const { record: todos } = await response.json() as { record: Todo[] }
  return todos
}

export const updateTodos = async ({ todos }: { todos: TodoList }): Promise<boolean> => {
  const response = await fetch(import.meta.env.VITE_API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': import.meta.env.VITE_API_BIN_KEY,
    },
    body: JSON.stringify(todos)
  })

  return response.ok
}
