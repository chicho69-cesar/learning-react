import Header from './components/Header'
import MainSection from './components/MainSection'
import { TodoProvider, todoReducer } from './context/todos'

const initialState = {
  todos: [
    {
      text: 'React Hooks',
      completed: false,
      id: 'b967afe24b23'
    },
    {
      text: 'Viva la comunidad de Midu uwu',
      completed: true,
      id: '43286487fhsdjasd'
    },
    {
      text: 'Hola Twitch!',
      completed: false,
      id: '54937fhajd'
    },
    {
      text: 'Context',
      completed: true,
      id: '43242341aaaaa'
    },
    {
      text: 'BUA BUA BUA BUA',
      completed: true,
      id: 'b967afe24a13'
    }
  ],
  visibilityFilter: 'All'
}

export default function App () {
  return (
    <TodoProvider initialState={initialState} reducer={todoReducer}>
      <div>
        <Header />
        <MainSection />
      </div>
    </TodoProvider>
  )
}
