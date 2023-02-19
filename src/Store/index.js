import { configureStore } from '@reduxjs/toolkit'
import modalSliceReducer from './modal'

const store = configureStore({
    reducer: {
      counter: modalSliceReducer,
    },
  })

export default store
