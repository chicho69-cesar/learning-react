import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const users = [
  {
    userName: 'midudev',
    name: 'Miguel Ángel Durán',
    isFollowing: true,
  },
  {
    userName: 'pheralb',
    name: 'Pablo H.',
    isFollowing: false,
  },
  {
    userName: 'chicho69_cesar',
    name: 'Cesar Villalobos Olmos',
    isFollowing: true,
  },
  {
    userName: 'TMChein',
    name: 'Tomas',
    isFollowing: false,
  },
]

export function App() {
  return (
    <section className='App'>
      {users.map(({ userName, name, isFollowing }) => (
        <TwitterFollowCard
          key={userName} /* Las keys deben de ser únicas y no cambiar porque sino 
          cada que se modifica el componente se va a generar un nuevo elemento */
          userName={userName}
          initialIsFollowing={isFollowing}
        >
          {name}
        </TwitterFollowCard>
      ))}
    </section>
  )
}
