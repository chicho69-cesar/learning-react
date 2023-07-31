/* En TypeScript cuando utilizamos después de la creación de un objeto 'as const'
le estamos especificando a TypeScript que al objeto que estamos creando no se le 
podrán modificar los valores de sus propiedades, y estas serán readonly */
export const TODO_FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
} as const

export const KEY_CODES = {
  ENTER: 13,
  ESCAPE: 27
} as const
