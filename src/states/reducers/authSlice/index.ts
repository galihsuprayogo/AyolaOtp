import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthProps } from 'interfaces'
import type { AppState } from 'states/store'

const initialAuthState: AuthProps = {
  email: undefined,
  username: undefined,
  password: undefined,
  token: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthProps>) => ({
      ...state,
      ...action.payload,
    }),
    destroyAuth: (state) => ({
      ...state,
      token: undefined,
    }),
    clearAuth: (state) => initialAuthState,
  },
})

export const { setAuth, clearAuth, destroyAuth } = authSlice.actions
export const selectAuthState = (state: AppState) => state.auth

export default authSlice.reducer
