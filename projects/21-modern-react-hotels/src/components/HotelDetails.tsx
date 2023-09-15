import { useQuery } from '@tanstack/react-query'
import { useRoute } from 'wouter'
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'

import BookingForm from './BookingForm'
import type { Hotel } from '../types.d'

const fetchHotel = async (id: string): Promise<Hotel> => {
  const response = await fetch(`http://localhost:3001/hotels/${id}`)
	if (!response.ok) {
		throw new Error('Network response was not ok')
	}
  
	return response.json()
}

export default function HotelDetails() {
  const [, params] = useRoute('/hotel/:id')
  const {
    data: hotel,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['hotel', params?.id],
    queryFn: () => fetchHotel(params!.id)
  })

  if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error fetching Hotel!</div>
	}

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: '#e8e8e8' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={hotel!.image}
        title={hotel!.name}
      />

      <CardContent>
				<Typography gutterBottom variant='h5' component='div'>
					{hotel!.name}
				</Typography>

				<Typography variant='body2' color='text.secondary'>
					{hotel!.description}
				</Typography>
			</CardContent>

			<CardActions>
				<BookingForm hotel={hotel!} />
			</CardActions>
    </Card>
  )
}
