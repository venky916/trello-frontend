import {configureStore} from '@reduxjs/toolkit'
import taskReducer from './slices/taskSlice';
import userReducer from './slices/userSlice'

const store = configureStore({
    reducer : {
        tasks : taskReducer,
        user :userReducer
    },
})

export default store;