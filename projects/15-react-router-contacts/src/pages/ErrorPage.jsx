import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  /* El hook useRouteError nos permite acceder al error de la navegación especificado
  por la ruta que tiene a esta pagina como errorElement */
  const error = useRouteError()
  console.log(error)

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>

      <p>
        <i>{error.status} | {error.statusText || error.message}</i>
      </p>
    </div>
  )
}
