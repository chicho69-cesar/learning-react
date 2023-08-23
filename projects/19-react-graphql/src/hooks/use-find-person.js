import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'

import { FIND_PERSON_QUERY } from '../graphql/queries'

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
