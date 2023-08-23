import { gql } from '@apollo/client'

export const ADD_PERSON_MUTATION = gql`
  mutation($name: String!, $phone: String!, $street: String!, $city: String!) {
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
