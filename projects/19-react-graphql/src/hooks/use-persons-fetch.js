import { useEffect, useState } from 'react'

export default function usePersons() {
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
