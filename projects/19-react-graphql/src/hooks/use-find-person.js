import { useEffect, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

const FIND_PERSON_QUERY = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
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

export default function useFindPerson() {
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
