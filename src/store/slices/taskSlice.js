import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name : "tasks",
    initialState : {
        tasks : [],
        modalMode : "create",
        modalOpen :false,
        currentTask : null
    },
    reducers : {
        openModal : (state,action)=>{
            state.modalOpen = action.payload.modalOpen
            state.modalMode = action.payload.modalMode
            state.currentTask = action.payload.currentTask
        },
        closeModal : (state)=>{
            state.modalMode = "create"
            state.currentTask = null
            state.modalOpen = false
        },
        addTasks: (state,action)=>{
            state.tasks = action.payload
        },
        createAddTask : (state,action)=>{
            state.tasks = [...state.tasks, action.payload]
        },
        deletedTask : (state,action)=>{
            state.tasks = state.tasks.filter(task=>task._id !==action.payload)
        },
        updatedTask : (state,action)=>{
            const {id,data} = action.payload;
            state.tasks = state.tasks.filter(task=>task._id !==id)
            state.tasks.push(data)
        }
    }

})

export const { addTasks, openModal, createAddTask, closeModal, deletedTask, updatedTask } = taskSlice.actions;
export default taskSlice.reducer;