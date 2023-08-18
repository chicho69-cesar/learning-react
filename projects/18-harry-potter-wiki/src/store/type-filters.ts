import { atom } from 'recoil'
import { defaultTypeFilters } from '../constants'

export const typeFiltersState = atom({
  key: 'typeFiltersState',
  default: defaultTypeFilters,
})
