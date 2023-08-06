import { useFetcher } from 'react-router-dom'

export default function Favorite({ contact }) {
  /* El hook useFetcher lo usamos cuando queremos realizar una acción que no genere
  una navegación, es decir, realizar una mutación de la data, comunicarnos con los
  loaders y con los actions si generar una navegación. */
  const fetcher = useFetcher()

  let favorite = contact.favorite
  if (fetcher.formData) { // Cuando se hace post del form esta variable pasa a tener estado
    /* Obtenemos la información del formData enviado a traves de una mutación con un 
    fetcher.Form */
    favorite = fetcher.formData.get('favorite') === 'true'
  }

  return (
    /* Generamos un formulario para hacer mutaciones, en este caso generaría
    un Form en el que al hacer post no hace navegación pero si genera la acción */
    <fetcher.Form method='post'>
      <button
        name='favorite'
        value={favorite ? 'false' : 'true'}
        aria-label={
          favorite
            ? 'Remove from favorites'
            : 'Add to favorites'
        }
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  )
}
