import {
  Outlet,
  NavLink,
  Form,
  useLoaderData,
  redirect,
  useNavigation,
  useSubmit,
} from 'react-router-dom'
import { createContact, getContacts } from '../contacts'
import { useEffect } from 'react'

/* La función loader es la función que se va a ejecutar cuando entremos a una ruta
y se utiliza para cargar información que se necesite para la ruta. */
export async function loader({ request }) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  const contacts = await getContacts(q)

  return { contacts, q }
}

/* La función action es la función que se va a ejecutar cuando se dispare una acción
en nuestra ruta, principalmente por eventos POST de Forms */
export async function action() {
  const contact = await createContact()
  return redirect(`/contacts/${contact.id}/edit`)
}

export default function Root() {
  const { contacts, q } = useLoaderData() // Obtenemos la información del loader
  const navigation = useNavigation() // Hook para manejar la navegación y sus propiedades
  const submit = useSubmit() // Hook para manejar el submit de Forms

  useEffect(() => {
    document.getElementById('q').value = q
  }, [q])

  const searching =
    navigation.location && 
    new URLSearchParams(navigation.location.search).has('q')

  return (
    <>
      <div id='sidebar'>
        <h1>Midu Contacts</h1>

        <div>
          {/* Form es un elemento especial para manejar acciones de los forms */}
          <Form id='search-form' role='search'>
            <input
              id='q'
              className={searching ? 'loading' : ''}
              aria-label='Search contacts'
              placeholder='Search'
              type='search'
              name='q'
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null

                /* Ejecutamos el submit de este form, cada que escribimos algo en 
                la barra de búsqueda. */
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                })
              }}
            />

            <div
              id='search-spinner'
              aria-hidden
              hidden={!searching}
            />

            <div
              className='sr-only'
              aria-live='polite'
            ></div>
          </Form>

          <Form method='post'>
            <button type='submit'>New</button>
          </Form>
        </div>

        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  {/* El elemento NavLink funciona igual que un Link solo que este
                  nos permite tener acceso a las propiedades de isActive y de 
                  isPending, cuando hacemos la navegación a otra ruta. */}
                  <NavLink 
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) => 
                      isActive 
                        ? 'active' 
                        : isPending 
                          ? 'pending' : ''
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}

                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>

      <div 
        id='detail'
        className={
          /* Los posibles estados de la navegación son: idle(no navegando), loading(cargando)
          y submitting(enviando) */
          navigation.state === "loading" ? "loading" : ""
        }
      >
        {/* El elemento Outlet nos permite renderizar la ruta hija de la ruta que
        renderiza este componente(Roo). */}
        <Outlet />
      </div>
    </>
  )
}
