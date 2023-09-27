import { css } from '../../../styled-system/css'
import CreateTodoForm from './components/CreateTodoForm'
import Filters from './components/Filters'
import Todos from './components/Todos'

export default function TodoList() {
  return (
    <div className={todoListContainer}>
      <main>
        <h1 className={title}>
          Countdown To-do list{' '}
          <span role='img' aria-label='pen'>
            ✏️⏱️
          </span>
        </h1>

        <Filters />
        <CreateTodoForm />
        <Todos />
      </main>
    </div>
  )
}

const todoListContainer = css({
  width: '90%',
  maxWidth: '960px',
  margin: '2rem auto',
  fontSize: '1.5rem',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'no-wrap',
  justifyContent: 'space-between',
  alignItems: 'start',
  gap: '2rem',
})

const title = css({
  fontSize: '2rem',
  color: 'white',
  fontWeight: 'bold'
})
