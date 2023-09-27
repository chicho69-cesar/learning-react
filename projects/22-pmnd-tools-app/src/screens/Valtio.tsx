import TodoList from '../modules/valtio/TodoList'
import { css } from '../../styled-system/css'

export default function Valtio() {
  return (
    <div className={container}>
      <TodoList />
    </div>
  )
}

const container = css({
  minH: '100vh',
  backgroundColor: 'slate.600',
  display: 'flex',
  placeContent: 'center'
})
