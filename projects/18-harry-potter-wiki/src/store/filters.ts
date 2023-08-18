import { atom } from 'recoil'
import { defaultFilters } from '../constants'

export const filtersState = atom({
  key: 'filtersState',
  default: defaultFilters,
})
