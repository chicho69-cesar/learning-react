import { proxy } from 'valtio'
import type { Filter, Status, TodoProxyStore } from '../types/todos.d'

export const store = proxy<TodoProxyStore>({
  filter: 'all',
  todos: []
})

export const countdown = (index: number) => {
  const todo = store.todos[index]
  
  if (!todo) return
  if (todo.status !== 'pending' || store.todos[index].timeout) return

  if (todo.timeLeft < 1000) {
    todo.timeLeft = 0
    todo.status = 'overdue'

    return
  }

  store.todos[index].timeout = window.setTimeout(() => {
    todo.timeLeft -= 1000

    if (store.todos[index].timeout) {
      store.todos[index].timeout = undefined
    }

    countdown(index)
  }, 1000)
}

export const addTodo = (e: React.SyntheticEvent, reset: VoidFunction) => {
  e.preventDefault()

  const target = e.target as typeof e.target & {
    deadline: { value: Date }
    description: { value: string }
  }

  const deadline = target.deadline.value
  const description = target.description.value
  const now = Date.now()

  store.todos.push({
    description,
    status: 'pending',
    id: now,
    timeLeft: new Date(deadline).getTime() - now
  })

  reset()
  countdown(store.todos.length - 1)
}

export const removeTodo = (index: number) => {
  store.todos.splice(index, 1)
}

export const toggleDone = (index: number, currentStatus: Status) => {
  const nextStatus = currentStatus === 'pending' ? 'completed' : 'pending'
  store.todos[index].status = nextStatus

  if (nextStatus === 'pending') {
    if (store.todos[index]?.timeout) {
      clearTimeout(store.todos[index]?.timeout)
      store.todos[index].timeout = undefined
    }

    countdown(index)
  }
}

export const setFilter = (filter: Filter) => {
  store.filter = filter
}
