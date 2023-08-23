import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { GET_PERSONS_QUERY } from '../graphql/queries'

export default function usePersons() {
  const [personCount, setPersonCount] = useState(0)
  const [persons, setPersons] = useState([])

  const { loading, error, data, refetch } = useQuery(GET_PERSONS_QUERY/* , {
    pollInterval: 2000,
  } */)

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
