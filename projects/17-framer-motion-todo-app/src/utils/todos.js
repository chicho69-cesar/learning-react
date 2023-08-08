export function getFilteredTodos (todos, visibilityFilter) {
  switch (visibilityFilter) {
    case 'All': {
      return todos
    }

    case 'Completed': {
      return todos.filter((todo) => todo.completed)
    }

    case 'Active': {
      return todos.filter((todo) => !todo.completed)
    }

    default: {
      throw new Error(`Unknown filter: ${visibilityFilter}`)
    }
  }
}

export function getCompletedCount (todos) {
  return todos.reduce((count, todo) => {
    return todo.completed ? count + 1 : count
  }, 0)
}
