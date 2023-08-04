import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE = [
	{
		id: "1",
		name: "Cesar Villalobos Olmos",
		email: "cesarvillalobosolmos.01@gmail.com",
		github: "chicho69-cesar",
	},
	{
		id: "2",
		name: "Leonardo",
		email: "leo@gmail.com",
		github: "leo",
	},
	{
		id: "3",
		name: "Miguel Angel Duran Garcia",
		email: "miduga@gmail.com",
		github: "midudev",
	},
]

export type UserId = string

export interface User {
  name: string
  email: string
  github: string
}

export interface UserWithId extends User {
  id: UserId
}

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem('__redux__state__')
  
  if (persistedState == null) {
    return DEFAULT_STATE
  }

  return JSON.parse(persistedState)['users'] as UserWithId[]
})()

/* Creamos un slice de Redux que nos permite manipular los usuarios. Donde el name
de la slice va a ser users, le pasamos el estado inicial y las acciones que nos van a
ayudar a manipular el estado de los usuarios. */
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    /* Con Redux a diferencia del context api, donde usamos reducer, podemos mutar el
    estado y este se actualizara correctamente gracias a la dependencia de immer en redux
    a diferencia del reducer que debíamos de regresar un nuevo estado en lugar de mutarlo */
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = window.crypto.randomUUID()
      state.push({ id, ...action.payload })
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      /* También podemos regresar un nuevo estado si no queremos mutarlo */
      return state.filter((user) => user.id !== id)
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.some((user) => user.id === action.payload.id)
      if (!isUserAlreadyDefined) {
        state.push(action.payload)
      }
    },
    updateUserById: (state, action: PayloadAction<UserWithId>) => {
      const index = state.findIndex((user) => user.id === action.payload.id)
      state[index] = structuredClone(action.payload)
    },
  },
})

/* Exportamos el reducer que nos permite manipular los usuarios. */
export default usersSlice.reducer

/* Exportamos las acciones que nos permiten manipular el estado de usuarios. */
export const {
  addNewUser,
  deleteUserById,
  rollbackUser,
  updateUserById,
} = usersSlice.actions
