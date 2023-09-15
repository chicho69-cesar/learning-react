import { create } from 'zustand'

const useStore = create<{
  reservations: { hotel: string; dates: string }[]
  addReservation: (hotel: string, dates: string) => void
}>((set) => ({
  reservations: [],
  addReservation: (hotel: string, dates: string) => {
    return set((state) => ({
      reservations: [...state.reservations, { hotel, dates }]
    }))
  }
}))

export default useStore
