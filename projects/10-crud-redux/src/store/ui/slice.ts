import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { UserWithId } from '../users/slice'

export interface UIState {
  isAddingUser: boolean
  userToEdit?: UserWithId
}

const initialState: UIState = {
  isAddingUser: true
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsAddingUser: (state, action: PayloadAction<UIState>) => {
      const { isAddingUser, userToEdit } = action.payload
      state.isAddingUser = isAddingUser
      state.userToEdit = !isAddingUser ? userToEdit : undefined
    }
  },
})

export default uiSlice.reducer

export const { setIsAddingUser } = uiSlice.actions
