import type { FieldValues } from 'react-hook-form'

export interface Hotel {
  description: string
  id:          number
  image:       string
  name:        string
}

export interface Reservation {
  hotel: Hotel
  dates: FieldValues
}
