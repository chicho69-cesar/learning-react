import { create } from 'zustand'
import type { Hotel } from '../types.d'
import { FieldValues } from 'react-hook-form'

interface Store {
  reservations: { hotel: Hotel; dates: FieldValues }[]
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
