import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './slices/postsSlice'
import authReducer from './slices/authSlice'
import filterSlice from './slices/filterSlice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    filter: filterSlice
  },
})