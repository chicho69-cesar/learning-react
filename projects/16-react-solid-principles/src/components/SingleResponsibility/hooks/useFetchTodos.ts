import { useState, useEffect } from 'react'
import { fetchTodos } from '../services/todos'
import type { TodoType } from '../types/todos'

export function useFetchTodos() {
  const [todos, setTodos] = useState<TodoType[]>([])
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    fetchTodos()
      .then((todos) => setTodos(todos))
      .finally(() => setIsFetching(false))
  }, [])

  return {
    todos,
    isFetching,
  }
}
