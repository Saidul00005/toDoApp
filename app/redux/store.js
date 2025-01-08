import { configureStore } from "@reduxjs/toolkit"
import toDoReducer from "@/app/redux/slices/toDoSlice"
import userProfileReducer from "@/app/redux/slices/userProfileSlice"


export const store = configureStore({
  reducer: {
    toDos: toDoReducer,
    userProfile: userProfileReducer
  }
})
