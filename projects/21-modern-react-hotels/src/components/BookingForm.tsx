import toast from 'react-hot-toast'
import { FieldValues, useForm } from 'react-hook-form'
import { Button, Input, Typography } from '@mui/material'

import useStore from '../store'
import type { Hotel } from '../types.d'

interface Props {
  hotel: Hotel
}

export default function BookingForm({ hotel }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const addReservation = useStore((state) => state.addReservation)

  const onSubmit = (data: FieldValues) => {
    addReservation(hotel, data)
    toast.success('Reservation added!')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type='date'
        {...register('startDate', { required: true })}
      />
      {errors.startDate && (
        <Typography style={{ color: 'red' }}>
          Start date is required
        </Typography>
      )}
      <br />

      <Input
        type='date'
        {...register('endDate', { required: true })}
      />
      {errors.endDate && (
        <Typography style={{ color: 'red' }}>
          End date is required
        </Typography>
      )}
      <br />
      <br />

      <Button variant='contained' type='submit'>
        Make the reservation
      </Button>
    </form>
  )
}
