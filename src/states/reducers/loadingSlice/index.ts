import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from 'states/store'

export type LoadingStateProps = {
  visible?: boolean
}

export const initialLoadingState: LoadingStateProps = {
  visible: false,
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialLoadingState,
  reducers: {
    setLoading: (state, action: PayloadAction<LoadingStateProps>) => ({
      ...state,
      ...action.payload,
    }),
  },
})

export const { setLoading } = loadingSlice.actions
export const selectLoadingState = (state: AppState) => state.loading

export default loadingSlice.reducer
