import { configureStore } from "@reduxjs/toolkit"
import toDoReducer from "@/app/redux/slices/toDoSlice"

export const store = configureStore({
  reducer: {
    todos: toDoReducer,
  }
})
