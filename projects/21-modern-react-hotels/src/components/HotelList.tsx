import { useQuery } from '@tanstack/react-query'
import { Link } from 'wouter'
import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material'

import type { Hotel } from '../types.d'

/* Creamos una función asíncrona que se encargará de hacer la petición a la API
y la usaremos con React Query */
const fetchHotels = async (): Promise<Hotel[]> => {
  const response = await fetch('http://localhost:3001/hotels')
  if (!response.ok) {
    throw new Error('Something went wrong')
  }

  return response.json()
}

export default function HotelList() {
  /* Hacemos la petición mediante React Query, usando una key y una función que llevara
  a cabo el fetching de datos */
  const {
    data: hotels,
    isLoading,
    error,
  } = useQuery({ queryKey: ['hotels'], queryFn: fetchHotels })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching hotels</div>
  }

  return (
    <>
      <Typography variant='h4' component='h2'>
        Booking App
      </Typography>
      ;
      <Stack spacing={2}>
        {hotels?.map((hotel) => (
          <Link key={hotel.id} href={`/hotel/${hotel.id}`}> {/* Usamos el Link de wouter */}
            <Card sx={{ maxWidth: 345, backgroundColor: '#e8e8e8' }}>
              <CardMedia
                sx={{ height: 140 }}
                image={hotel.image}
                title={hotel.name}
              />

              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {hotel.name}
                </Typography>

                <Typography variant='body2' color='text.secondary'>
                  {hotel.description}
                </Typography>
              </CardContent>

              <CardActions>
                <Button size='small'>See details</Button>
              </CardActions>
            </Card>
          </Link>
        ))}
      </Stack>
    </>
  )
}
