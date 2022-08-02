import { configureStore } from '@reduxjs/toolkit'
import charactersReducer from './slice'

export default configureStore({
  reducer: {
    characters: charactersReducer
  }
})
