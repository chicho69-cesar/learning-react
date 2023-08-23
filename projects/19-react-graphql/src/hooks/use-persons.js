import { useEffect, useState } from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'

import { FIND_PERSON_QUERY, GET_PERSONS_QUERY } from '../graphql/queries'
import { ADD_PERSON_MUTATION } from '../graphql/mutations.js'

export function usePersons() {
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

export function useFindPerson() {
  const [activePerson, setActivePerson] = useState(null)
  const [findPersonByName, result] = useLazyQuery(FIND_PERSON_QUERY)

  useEffect(() => {
    if (result.data) {
      setActivePerson(result.data.findPerson)
    }
  }, [result])

  const showPerson = (name) => {
    findPersonByName({ variables: { nameToSearch: name } })
  }

  return {
    activePerson,
    setActivePerson,
    showPerson,
  }
}

export function useCreatePerson() {
  const [addPerson] = useMutation(ADD_PERSON_MUTATION, {
    refetchQueries: [GET_PERSONS_QUERY]
  })

  return {
    addPerson
  }
}
