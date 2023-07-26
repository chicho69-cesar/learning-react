import './App.css'

import { useEffect, useState } from 'react'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export const App = () => {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(response => response.json())
      .then(data => setFact(data.fact))
  }, [])

  useEffect(() => {
    if (!fact) return

    const threeFirstWords = fact
      .split(' ')
      .slice(0, 3)
      .join(' ')

    fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(data => {
        const { url } = data
        setImageUrl(url)
      })
  }, [fact])

  return (
    <main>
      <h1>App de gatitos</h1>

      <section>
        {fact && (
          <h3>{fact}</h3>
        )}

        {imageUrl && (
          <img
            src={`${CAT_PREFIX_IMAGE_URL}/${imageUrl}`}
            alt={`Image extracted from the cat API: ${imageUrl}`}
          />
        )}
      </section>
    </main>
  )
}
