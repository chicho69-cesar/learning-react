import toast from 'react-hot-toast'
import { FieldValues, useForm } from 'react-hook-form'
import { Button, Input, Typography } from '@mui/material'

import useStore from '../store'
import type { Hotel } from '../types.d'

interface Props {
  hotel: Hotel
}

export default function BookingForm({ hotel }: Props) {
  /* Mediante react-hook-form podemos manipular un formulario mediante el hook
  useForm, el cual nos devuelve una función register para registrar elementos
  del formulario, handleSubmit para hacer el submit del form, y formState, en
  el cual podemos acceder al estado del formulario */
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  /* Mediante el hook useStore personalizado de zustand, podemos acceder a los
  valores y funciones del estado global */
  const addReservation = useStore((state) => state.addReservation)

  const onSubmit = (data: FieldValues) => {
    addReservation(hotel, data)
    toast.success('Reservation added!')
  }

  return (
    /* Hacemos submit del form, pasando le al handleSubmit la función submit que creamos */
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type='date'
        /* Registramos este campo en el formulario */
        {...register('startDate', { required: true })}
      />
      {/* Accedemos a los errores mediante el estado del formulario */}
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
