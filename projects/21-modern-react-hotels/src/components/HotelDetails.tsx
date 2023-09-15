import { useQuery } from '@tanstack/react-query'
import { useRoute } from 'wouter'
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'

import BookingForm from './BookingForm'
import type { Hotel } from '../types.d'

/* Creamos una función asíncrona para hacer el fetching de datos con React Query */
const fetchHotel = async (id: string): Promise<Hotel> => {
  const response = await fetch(`http://localhost:3001/hotels/${id}`)
	if (!response.ok) {
		throw new Error('Network response was not ok')
	}
  
	return response.json()
}

export default function HotelDetails() {
  /* El hook useRoute de wouter nos permite extraer el parámetro de la ruta, y 
  este nos devuelve un arreglo, donde le primer elemento es una función match
  y el objeto con los params de la ruta */
  const [, params] = useRoute('/hotel/:id')
  /* Obtenemos la data desde react query, el estado de carga y si hubo un error en el fetch */
  const {
    data: hotel,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['hotel', params?.id], // La query key es hotel y le asignamos el id de la ruta
    queryFn: () => fetchHotel(params!.id) // Hacemos el fetch en base a la ruta
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
