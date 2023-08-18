import { atom } from 'recoil'

export const typeFiltersState = atom({
  key: 'typeFiltersState',
  default: {
    all: true,
    wizards: false,
    muggles: false,
    'half-blob': false,
    'pure-blob':  false,
    alive: false,
  }
})
