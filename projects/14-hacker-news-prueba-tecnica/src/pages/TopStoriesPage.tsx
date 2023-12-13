import { useEffect, useRef } from 'react'
// import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'

import { getTopStories } from '../services/hacker-news'
import Story from '../components/Story'

export default function TopStoriesPage() {
  // const { data } = useSWR('stories', () => getTopStories(1, 10))
  /* useSWRInfinite nos brinda la capacidad de activar varias solicitudes con un hook.
  Este hook acepta una función que devuelve la key de la solicitud, una función 
  fetcher y las opciones. Devuelve los mismos valores que useSWR, incluidos dos
  valores adicionales, el tamaño de la pagina y un set para el tamaño de la pagina,
  como si fuera un estado de React.  */
  const { data, isLoading, setSize } = useSWRInfinite(
    /* Esta función regresa la key que usa para cachear los resultados, acepta
    el index y la data de la pagina previa. */
    (index) => `stories/${index + 1}`,
    /* Función fetcher, recibe la key de cada pagina */
    (key) => {
      const [, page] = key.split('/')
      return getTopStories(Number(page), 10)
    }
  )

  const chivatoEl = useRef<HTMLSpanElement>(null)
  const stories = data?.flat()

  useEffect(() => {
    document.title = 'Hacker News - Prueba Técnica USA de Frontend'
  }, [])

  useEffect(() => {
    /* Usamos intersection observer para determinar el final del scroll y
    aumentar el tamaño de la paginación en uno, para que swr infinite cargue una pagina
    más de la data. */
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        setSize((prevSize) => prevSize + 1)
      }
    }, { /* Cuando el observer este a 100 px */
      rootMargin: '100px'
    })

    if (chivatoEl.current == null) {
      return
    }

    /* Observamos el chivatoEl */
    observer.observe(chivatoEl.current)

    /* Dejamos de observar lo que se este observando al desmontar el componente */
    return () => {
      observer.disconnect()
    }
  }, [isLoading, setSize])

  return (
    <>
      <ul style={{ listStyle: 'none' }}>
        {stories?.map((id: number, index: number) => (
          <li key={id}>
            <Story id={id} index={index} />
          </li>
        ))}
      </ul>

      {/* Le agregamos la referencia a este elemento para ser el elemento que sera
      observado, justamente al final de las stories. */}
      {!isLoading && <span ref={chivatoEl}>.</span>}

      {/* <button onClick={() => { setSize(size + 1) }}>
        Load more
      </button> */}
    </>
  )
}
