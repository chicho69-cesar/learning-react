import { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'

const GET_PERSONS_QUERY = gql`
  query getPersonsData {
    personCount
    persons: allPersons {
      name
      id
      phone
      address {
        city
        street
      }
    }
  }
`

export default function usePersons() {
  const [personCount, setPersonCount] = useState(0)
  const [persons, setPersons] = useState([])

  const { loading, error, data, refetch } = useQuery(GET_PERSONS_QUERY)

  useEffect(() => {
    if (data) {
      setPersonCount(data.personCount)
      setPersons(data.persons)
    }
  }, [data])

  return {
    error,
    loading,
    personCount,
    persons,
    refetch,
  }
}
