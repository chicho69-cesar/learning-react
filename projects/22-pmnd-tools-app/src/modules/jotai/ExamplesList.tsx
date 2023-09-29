import { Link } from 'wouter'

import { css } from '../../../styled-system/css'

export default function ExamplesList() {
  return (
    <div className={container}>
      <h2 className={title}>Jotai Examples</h2>

      <div className={exampleList}>
        <Link href='/jotai/text-length' className={link}>
          <h3>Text length example</h3>
          <p>Cuenta la longitud y muestra el texto en mayúsculas.</p>
        </Link>

        <Link href='/jotai/todos' className={link}>
          <h3>Todos example</h3>
          <p>
            Recuerda tu lista de tareas por escribirlas en este app, 
            marca las tareas completadas si has terminado la tarea, 
            y cambia entre Completadas y No Completadas para 
            ver el estado de tu tarea.
          </p>
        </Link>

        <Link href='/jotai/hacker-news' className={link}>
          <h3>Hacker news example</h3>
          <p>Demostrar un articulo de noticias con Jotai, pulsa next para ver mas artículos.</p>
        </Link>
      </div>
    </div>
  )
}

const container = css({
  width: '80%',
  margin: '0 auto',
})

const title = css({
  fontSize: '2rem',
  fontWeight: 'extrabold',
  color: 'white',
  marginBottom: '1rem',
})

const exampleList = css({
  display: 'grid',
  gap: '2rem',
  gridTemplateColumns: 'repeat(3, 1fr)',
})

const link = css({
  position: 'relative',
  padding: '1rem',
  rounded: 'md',
  shadow: 'md',
  backgroundColor: 'slate.800',
  overflow: 'hidden',
  transition: 'all 0.2s ease-in-out',

  '& h3': {
    fontSize: '1.25rem',
    color: 'white',
    fontWeight: 'semibold',
  },

  '& p': {
    marginTop: '0.5rem',
    color: 'gray.300',
    fontSize: '1rem',
  },

  '&:hover': {
    backgroundColor: 'gray.100'
  },

  '&:hover h3, &:hover p': {
    color: 'slate.800',
  },
})
