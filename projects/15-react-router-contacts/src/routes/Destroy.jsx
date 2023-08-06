import { redirect } from 'react-router-dom'
import { deleteContact } from '../contacts'

/* Cuando creamos una acción en un componente de Route pero sin componente JSX
es porque es una ruta en la cual solo nos va a servir para hacer el handle de una
acción y no para renderizar un elemento */
export async function action({ params }) {
  await deleteContact(params.contactId)
  return redirect('/')
}
