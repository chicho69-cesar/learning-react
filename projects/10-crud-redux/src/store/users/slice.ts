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

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = window.crypto.randomUUID()
      state.push({ id, ...action.payload })
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
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

export default usersSlice.reducer

export const {
  addNewUser,
  deleteUserById,
  rollbackUser,
  updateUserById,
} = usersSlice.actions
