import './App.css'

import { useEffect, useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

export default function App() {
  const { personCount, persons } = usePersons()

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>GraphQL + Apollo</h1>
      <h2>Numero de personas: {personCount}</h2>

      <div>
        <ul className='persons-list'>
          {persons.map((person) => (
            <li key={person.id}>
              <article className='person'>
                <h3>{person.name}</h3>
                <p>{person.phone ? person.phone : 'Sin teléfono'}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

function usePersons() {
  const [personCount, setPersonCount] = useState(0)
  const [persons, setPersons] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query {
          personCount
          persons: allPersons {
            name,
            id,
            phone
          }
        }`
      })
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setPersonCount(data.personCount)
        setPersons(data.persons)
      })
  }, [])

  return {
    personCount,
    persons,
  }
}
