import { type Action, combineReducers, configureStore, type ThunkAction } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
  type Storage,
} from 'redux-persist'
import { authSlice, loadingSlice } from 'states/reducers'

import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value)
    return Promise.resolve(true)
  },
  getItem: (key) => {
    const value = storage.getString(key)
    return Promise.resolve(value)
  },
  removeItem: (key) => {
    storage.delete(key)
    return Promise.resolve()
  },
}

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
}

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [loadingSlice.name]: loadingSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: true,
  })

export const store = makeStore()
export const persistor = persistStore(store)
export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>
