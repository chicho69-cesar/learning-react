import { gql } from '@apollo/client'

export const FIND_PERSON_QUERY = gql`
  # Creamos una query con los parámetros que esta va a recibir y lo que regresa
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
  # Podemos hacer varias queries en una sola, y ademas renombrar los resultados
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
