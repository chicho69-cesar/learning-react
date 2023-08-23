import { gql } from '@apollo/client'

export const FIND_PERSON_QUERY = gql`
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

export const GET_PERSONS_QUERY = gql`
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
