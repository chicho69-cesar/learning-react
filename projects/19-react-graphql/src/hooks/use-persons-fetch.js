import { useEffect, useState } from 'react'

export default function usePersons() {
  const [personCount, setPersonCount] = useState(0)
  const [persons, setPersons] = useState([])

  /* Cuando trabajamos con GraphQL, sino queremos usar un cliente como
  ApolloClient, podemos usar el método fetch de la API fetch. Mandando
  las operaciones que deseamos en el body de la petición la cual debe ser POST. */
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
