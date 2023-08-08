import { useReducer } from 'react'
import { TodoContext } from '.'

export function TodoProvider ({ children, reducer, initialState }) {
  return (
    <TodoContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </TodoContext.Provider>
  )
}
