import { configureStore } from '@reduxjs/toolkit'
import { displayPageReducer } from './DisplayPage/DisplayPageSlice'

export const store = configureStore({
    reducer: {
        displayPageReducer
    }
})