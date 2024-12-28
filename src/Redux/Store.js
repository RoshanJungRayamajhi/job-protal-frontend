import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice.js"
import jobSlice from "./jobSlice.js"
import companySlice from "./companySlice.js"

import { createRoot } from 'react-dom/client'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import applicationSlice from "./applicationSlice.js"


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  auth:authSlice,
  job:jobSlice, 
  company:companySlice,
  application: applicationSlice
})


const persistedReducer = persistReducer(persistConfig, rootReducer)


export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

})
