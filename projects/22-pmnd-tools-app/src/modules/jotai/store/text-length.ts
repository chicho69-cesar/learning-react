import { atom } from 'jotai'

/* Un atom nos ayuda para almacenar un valor en el estado global */
export const textAtom = atom('Hello')
/* Con atom también podemos crear compound properties, esto mediante el uso
del callback que recibe como parámetro get, mediante el cual podemos acceder
al valor de un atom y en base a los cambios en este cambiar la compound property */
export const textLenAtom = atom((get) => get(textAtom).length)
export const textUpperAtom = atom((get) => get(textAtom).toUpperCase())
