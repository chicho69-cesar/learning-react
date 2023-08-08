import { useContext } from 'react'
import { TodoContext } from '../context/todos'

export function useTodo () {
  const [state, dispatch] = useContext(TodoContext)

  const addTodo = (text) => {
    if (text.length !== 0) {
      dispatch({
        type: 'ADD_TODO',
        payload: { text }
      })
    }
  }

  const editTodo = (id, text) =>
    dispatch({
      type: 'EDIT_TODO',
      payload: {
        id,
        text
      }
    })

  const deleteTodo = (id, text) =>
    dispatch({
      type: 'DELETE_TODO',
      payload: {
        id,
        text
      }
    })

  const completeTodo = (id, text) =>
    dispatch({
      type: 'COMPLETE_TODO',
      payload: {
        id,
        text
      }
    })

  const completeAll = () =>
    dispatch({
      type: 'COMPLETE_ALL'
    })

  const clearCompleted = () =>
    dispatch({
      type: 'CLEAR_COMPLETED'
    })

  const setVisibility = (filter) =>
    dispatch({
      type: 'SET_VISIBILITY',
      payload: {
        visibilityFilter: filter
      }
    })

  const setTodos = (todos) =>
    dispatch({
      type: 'SET_TODOS',
      payload: {
        todos
      }
    })

  return {
    state,
    addTodo,
    editTodo,
    deleteTodo,
    completeAll,
    clearCompleted,
    completeTodo,
    setVisibility,
    setTodos
  }
}
