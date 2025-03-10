import {configureStore} from '@reduxjs/toolkit'
import taskReducer from './slices/taskSlice';
import userReducer from './slices/userSlice';
import toastReducer from "./slices/toastSlice"

const store = configureStore({
    reducer : {
        tasks : taskReducer,
        user :userReducer,
        toast:toastReducer
    },
})

export default store;