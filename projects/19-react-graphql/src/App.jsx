import { Toaster, toast } from 'sonner'

import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { usePersons } from './hooks/use-persons'

export default function App() {
  const {
    personCount,
    persons,
    loading,
    error,
    refetch,
  } = usePersons()

  return (
    <>
      <h1>GraphQL + Apollo</h1>
      <h2>Numero de personas: {personCount}</h2>

      <button onClick={() => refetch()}>
        Volver a cargar personas
      </button>

      <div>
        {loading && <p>Cargando personas...</p>}
        {error && <p>Error al cargar personas...</p>}

        {persons.length > 0 && (
          <Persons persons={persons} />
        )}
      </div>

      <PersonForm notifyError={(error) => toast.error(error)} />
      <Toaster richColors />
    </>
  )
}
