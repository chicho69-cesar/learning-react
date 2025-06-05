import { Box, Container, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import Character from '../components/Character'
import CharacterSkeleton from '../components/CharacterSkeleton'

const fakePromise = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 3000)
  })

export default function Skeleton() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      await fakePromise()

      const res = await fetch('https://rickandmortyapi.com/api/character/')
      const data = await res.json()
      
      setData(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth='xs'>
      <Typography
        variant='h3'
        component='h1'
        textAlign='center'
        my={3}
      >
        Rick and Morty
      </Typography>

      <Box sx={{ display: 'grid', gap: 2, maxWidth: 250, mx: 'auto' }}>
        {loading
          ? Array.from(new Array(3)).map((_, index) => (
              <CharacterSkeleton key={index} />
            ))
          : data.results.map((character) => (
              <Character
                key={character.id}
                data={character}
              />
            ))}
      </Box>
    </Container>
  )
}
