import axios from 'axios'
import type { TodoType } from '../types/todos'

export async function fetchTodos() {
  try {
    const res = await axios.get<TodoType[]>('https://jsonplaceholder.typicode.com/todos')
    return res.data
  } catch (err) {
    if ((err as { code: number }).code === 404) {
      throw new Error('Not Found')
    }

    console.error(err)
    return []
  }
}