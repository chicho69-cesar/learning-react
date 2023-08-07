import { TODOS_API_URL } from '../constants/todos'

export const fetcherFromApi = async function<T>(): Promise<T> {
  const url = TODOS_API_URL
  const res = await fetch(url)
  return res.json()
}

export const fetcherFromLocalStorage = async function<T>(): Promise<T> {
  const todos = localStorage.getItem('todos')
  return todos ? JSON.parse(todos) : []
}

export const fetcherFromMocks = async function<T>(): Promise<T> {
  return [
    {
      id: 1,
      userId: 1,
      title: 'Todo 1',
      completed: false,
    },
    {
      id: 2,
      userId: 1,
      title: 'Todo 2',
      completed: true,
    },
  ] as T
}
