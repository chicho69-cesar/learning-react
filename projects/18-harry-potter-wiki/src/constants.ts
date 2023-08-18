import type { FiltersType, TypeFiltersType } from './types/types.d'

export const API_BASE_URL = 'https://hp-api.onrender.com/api'
export const HOUSES = ['House', 'Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin']
export const GENDERS = ['Genre', 'male', 'female', 'neutral']

export const defaultTypeFilters: TypeFiltersType = {
  all: true,
  wizards: false,
  muggles: false,
  'half-blob': false,
  'pure-blob': false,
  alive: false,
}

export const defaultFilters: FiltersType = {
  house: 'House',
  genre: 'Genre',
}

export const typeFiltersKeys = Object.keys(defaultTypeFilters) as Array<keyof TypeFiltersType>
