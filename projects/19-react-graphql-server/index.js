import { randomUUID as uuid } from 'node:crypto'

import { GraphQLError } from 'graphql'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import axios from 'axios'

const typeDefinitions = `#graphql
  # This a comment - Enum types, los enums se reciben como strings
  enum HasPhone {
    YES
    NO
  }

  # Creamos un type en GraphQL
  type Address {
    street: String! # ! Es obligatorio
    city: String!
  }

  type Person {
    id: ID! # Es un identificador ÚNICO en GraphQL
    name: String!
    phone: String
    address: Address!
    check: Boolean
  }

  # Los types Query se usan para definir las queries de nuestro server
  type Query {
    personCount: Int! # Tipo de retorno de la query
    allPersons(phone: HasPhone): [Person]! # Query función
    findPerson(name: String!): Person
  }

  # Los types Mutation se usan para definir las mutaciones de nuestro server
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

/* Los resolvers son un objeto la cual tiene las propiedades que va a
resolver nuestro servidor, en este caso los type que definimos, principalmente
las queries y las mutaciones, pero también podemos manipular que va a regresar
un tipo especifico al hacer una query o una mutación */
const resolvers = {
  // Queries
  Query: {
    personCount: async () => {
      const { data: persons } = await axios.get('http://localhost:3000/persons')
      return persons.length
    },
    /* Todas las queries, mutaciones y tipos son funciones que regresan valores,
    estas funciones reciben dos parámetros, el primero es una instancia del
    tipo que estamos trabajando, en esta caso Query, en Mutation es un Mutation,
    en Person es un Person, etc. Y los args son los argumentos que reciben las funciones */
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
  // Mutaciones
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
  // Types [Person]: Manipulamos que es lo que regresa propiedades especificas de Person
  Person: {
    /* Aquí root nos permite acceder a cada tipo Person que se usa, asi cuando
    accedemos a un Person address va a regresar el tipo especificado aquí, en lugar
    del type Person */
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    },
    check: () => true
  }
}

/* Creamos una instancia de nuestro servidor de ApolloServer */
const server = new ApolloServer({
  typeDefs: typeDefinitions, // Definiciones de tipos
  resolvers // Resolvers
})

/* Inicializamos el servidor y nos regresa la url donde se ejecuta */
const { url } = await startStandaloneServer(server)
console.log(`🚀 Server ready at ${url}`)
