import { Provider } from 'jotai'

import { css } from '../../../../styled-system/css'
import TodoList from '../components/Todos/TodoList'

export default function TodosExample() {
  return (
    <div className={container}>
      <Provider>
        <h2 className={title}>Jotai Todo List</h2>

        <TodoList />
      </Provider>
    </div>
  )
}

const container = css({
  minH: '100vh',
  backgroundColor: 'slate.600',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

const title = css({
  width: '100%',
  textAlign: 'center',
  marginBottom: '1rem',
  fontSize: '3rem',
  fontWeight: 'bold',
  color: 'gray.100',
})
