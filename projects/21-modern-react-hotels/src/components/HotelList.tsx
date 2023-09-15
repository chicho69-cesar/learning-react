import { useQuery } from '@tanstack/react-query'
import { Link } from 'wouter'
import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material'

import type { Hotel } from '../types.d'

const fetchHotels = async (): Promise<Hotel[]> => {
  const response = await fetch('http://localhost:3001/hotels')
  if (!response.ok) {
    throw new Error('Something went wrong')
  }

  return response.json()
}

export default function HotelList() {
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
          <Link key={hotel.id} href={`/hotel/${hotel.id}`}>
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

