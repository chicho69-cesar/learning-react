import { Form, useLoaderData } from 'react-router-dom'
import Favorite from '../components/Favorite'
import { getContact, updateContact } from '../contacts'

export async function loader({ params }) {
  const contact = await getContact(params.contactId)

  if (!contact) {
    /* Creamos un error en el loader para dirigirnos a la pagina errorElement */
    throw new Response('', {
      status: 404,
      statusText: 'Contact Not Found',
    })
  }

  return { contact }
}

export async function action({ request, params }) {
  let formData = await request.formData()

  return updateContact(params.contactId, {
    favorite: formData.get('favorite') === 'true',
  })
}

export default function Contact() {
  const { contact } = useLoaderData()

  return (
    <div id='contact'>
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}

          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target='_blank'
              href={`https://twitter.com/${contact.twitter}`} rel='noreferrer'
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          {/* Cuando especificamos la acción en el Form, esta se concatenara a la ruta
          y dispara la acción correspondiente en la ruta final, asi por ejemplo si estamos
          en la ruta /contact/:contactId y hacemos click en el botón Edit, se disparara
          la acción de la ruta /contact/:contactId/edit con el método GET */}
          <Form action='edit'>
            <button type='submit'>Edit</button>
          </Form>

          <Form
            method='post'
            action='destroy'
            onSubmit={(event) => {
              if (
                !confirm(
                  'Please confirm you want to delete this record.'
                )
              ) {
                event.preventDefault()
              }
            }}
          >
            <button type='submit'>Delete</button>
          </Form>
        </div>
      </div>
    </div>
  )
}
