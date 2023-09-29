import { atom } from 'jotai'

export const textAtom = atom('Hello')
export const textLenAtom = atom((get) => get(textAtom).length)
export const textUpperAtom = atom((get) => get(textAtom).toUpperCase())
