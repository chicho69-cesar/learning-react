import { useMutation } from '@apollo/client'

import { GET_PERSONS_QUERY } from '../graphql/queries.js'
import { ADD_PERSON_MUTATION } from '../graphql/mutations.js'

export default function useCreatePerson() {
  const [addPerson] = useMutation(ADD_PERSON_MUTATION, {
    refetchQueries: [GET_PERSONS_QUERY]
  })

  return {
    addPerson
  }
}
