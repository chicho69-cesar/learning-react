import { atom } from 'recoil'

export const filtersState = atom({
  key: 'filtersState',
  default: {
    house: 'House',
    genre: 'Genre',
  }
})
