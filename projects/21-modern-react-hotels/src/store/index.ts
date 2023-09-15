import { create } from 'zustand'
import type { FieldValues } from 'react-hook-form'

import type { Hotel, Reservation } from '../types.d'

interface Store {
  reservations: Reservation[]
  addReservation: (hotel: Hotel, dates: FieldValues) => void
}

/* Creamos un hook el cual sera el resultado de la función create, la cual nos regresara
un estado que tiene las propiedades establecidas por el tipo Store. La función set
que recibe como callback la función create nos permite modificar el estado. */
const useStore = create<Store>((set) => ({
  reservations: [],
  addReservation: (hotel: Hotel, dates: FieldValues) => {
    return set((state) => ({
      reservations: [...state.reservations, { hotel, dates }]
    }))
  }
}))

export default useStore
