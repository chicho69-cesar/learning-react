import { randomUUID as uuid } from 'node:crypto'

import { GraphQLError } from 'graphql'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import axios from 'axios'

const typeDefinitions = `#graphql
  # This a comment - Enum types
  enum HasPhone {
    YES
    NO
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    id: ID!
    name: String!
    phone: String
    address: Address!
    check: Boolean
  }

  type Query {
    personCount: Int!
    allPersons(phone: HasPhone): [Person]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      street: String!
      city: String!
      phone: String
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
  }
`

const resolvers = {
  Query: {
    personCount: async () => {
      const { data: persons } = await axios.get('http://localhost:3000/persons')
      return persons.length
    },
    allPersons: async (root, args) => {
      const { data: persons } = await axios.get('http://localhost:3000/persons')
      if (!args.phone) return persons

      const byPhone = (person) => args.phone === 'YES'
        ? person.phone
        : !person.phone

      return persons.filter(byPhone)
    },
    findPerson: async (root, args) => {
      const { data: persons } = await axios.get('http://localhost:3000/persons')
      return persons.find((p) => p.name === args.name)
    }
  },
  Mutation: {
    addPerson: async (root, args) => {
      const { data: persons } = await axios.get('http://localhost:3000/persons')

      if (persons.find((p) => p.name === args.name)) {
        throw new GraphQLError('Person already exists', {
          extensions: {
            code: 'PERSON_ALREADY_EXISTS'
          }
        })
      }

      const person = { id: uuid(), ...args }
      await axios.post('http://localhost:3000/persons', person)

      return person
    },
    editNumber: async (root, args) => {
      const { data: persons } = await axios.get('http://localhost:3000/persons')

      const personIndex = persons.findIndex((p) => p.name === args.name)
      if (personIndex === -1) return null

      const person = persons[personIndex]
      const updatedPerson = { ...person, phone: args.phone }

      await axios.put(`http://localhost:3000/persons/${person.id}`, updatedPerson)

      return updatedPerson
    }
  },
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    },
    check: () => true
  }
}

const server = new ApolloServer({
  typeDefs: typeDefinitions,
  resolvers
})

const { url } = await startStandaloneServer(server)
console.log(`🚀 Server ready at ${url}`)
