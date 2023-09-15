import { create } from 'zustand'
import type { FieldValues } from 'react-hook-form'

import type { Hotel, Reservation } from '../types.d'

interface Store {
  reservations: Reservation[]
  addReservation: (hotel: Hotel, dates: FieldValues) => void
}

const useStore = create<Store>((set) => ({
  reservations: [],
  addReservation: (hotel: Hotel, dates: FieldValues) => {
    return set((state) => ({
      reservations: [...state.reservations, { hotel, dates }]
    }))
  }
}))

export default useStore
