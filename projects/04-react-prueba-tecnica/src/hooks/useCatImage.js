import { useEffect, useState } from 'react'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

/* Un custom hook en react es una función la cual podemos utilizar para abstraer
la lógica de nuestro componente. En esta función a diferencia de las demás podemos
utilizar los hooks de React e incluso otros custom hooks, estos nos permiten utilizarlos
como si fueran una caja negra la cual se va a comportar como si estuviera en un
componente, vamos a poder generar un nuevo estado cada que lo usemos si es que usamos
un useState, vamos a poder disparar efectos, pero este nos debe de regresar algo,
comúnmente se suele regresar el resultado de una operación, que queremos desarrollar
en este custom hook, ademas de separar la implementación de algo y de esta forma
poder reutilizar el código, asi si decidimos después usar por ejemplo axios
en lugar de fetch solamente debemos de cambiar la implementación de este custom hook
y no de los lugares donde lo utilizamos. */
export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState()

  /* Recuperamos la imagen cada vez que mandamos a llamar tenemos
  un nuevo fact */
  useEffect(() => {
    if (!fact) return

    const threeFirstWords = fact.split(' ', 3).join(' ')

    fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(data => {
        const { url } = data
        setImageUrl(url)
      })
  }, [fact])

  return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}` }
}
