import { gql } from '@apollo/client'

/* Creamos una mutación usando la sintaxis de GraphQL con gql de ApolloClient */
export const ADD_PERSON_MUTATION = gql`
  # Creamos la mutación que recibe los parámetros deseados
  mutation($name: String!, $phone: String!, $street: String!, $city: String!) {
    # Nombramos la mutación y los parámetros que recibe y retorna
    addPerson(
      name: $name, 
      phone: $phone,
      street: $street, 
      city: $city
    ) {
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

export const EDIT_PHONE_MUTATION = gql`
  mutation($name: String!, $phone: String!) {
    editNumber(
      name: $name, 
      phone: $phone
    ) {
      id
      name
      phone
      address {
        city
        street
      }
    }
  }
`
