import { useEffect, useState } from 'react'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'

import { FIND_PERSON_QUERY, GET_PERSONS_QUERY } from '../graphql/queries'
import { ADD_PERSON_MUTATION, EDIT_PHONE_MUTATION } from '../graphql/mutations.js'

export function usePersons() {
  const [personCount, setPersonCount] = useState(0)
  const [persons, setPersons] = useState([])

  /* Cuando ejecutamos una query con ApolloClient, podemos ademas de enviar
  la query enviar un objeto de configuración, y este hook nos regresa un objeto
  con las propiedades loading, error, data, refetch, etc. */
  const { loading, error, data, refetch } = useQuery(GET_PERSONS_QUERY/* , {
    pollInterval: 2000, // pollInterval es el tiempo en ms en que se vuelve a ejecutar
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
  /* Una lazy query es una query que podremos ejecutar cuando necesitemos, esta regresa
  un arreglo, donde el primer elemento es la función que va a ejecutar la query y
  el segundo es el objeto resultado de la query, el cual tiene { data, error, etc. } */
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

export function useCreatePerson({ notifyError }) {
  /* Las mutaciones al ejecutarlas con el hook para mutaciones, el cual
  nos regresa un arreglo, donde el primer elemento es la función que va a ejecutar y
  el segundo es el objeto resultado de la mutación */
  const [addPerson] = useMutation(ADD_PERSON_MUTATION, {
    refetchQueries: [GET_PERSONS_QUERY], /* Re-ejecutamos las queries que necesitemos
    y que sabemos que sus datos cambiaron al realizar la mutación */
    onError: (error) => { // Error al ejecutar la mutación
      notifyError(error.graphQLErrors[0].message)
    }
  })

  return {
    addPerson
  }
}

export function useEditPersonPhone({ notifyError }) {
  /* Cuando usamos una mutación que en lugar de agregar nuevos datos, este edita
  los que ya están en cache, si es que la mutación regresa el id del elemento
  que modifico, no es necesario re-ejecutar las queries. */
  const [editPhone, result] = useMutation(EDIT_PHONE_MUTATION, {
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      notifyError('Persona no encontrada')
    }
  }, [notifyError, result])

  return {
    editPhone
  }
}
