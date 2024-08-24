import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, updateTask } from '../services/taskService';
import { closeModal, createAddTask, updatedTask } from '../store/slices/taskSlice';

const formatDateForInput = (date)=>{
    const d = new Date(date);
    return d.toISOString().split('T')[0];
}

const TaskModal = () => {

    const dispatch = useDispatch();
    const {modalMode,modalOpen,currentTask} = useSelector(store=>store.tasks)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('To-Do')
    const [priority, setPriority] = useState('Low')
    const [deadline, setDeadline] = useState(formatDateForInput(new Date()))

    useEffect(()=>{
        if (modalMode === 'edit' && currentTask) {
            setTitle(currentTask.title);
            setDescription(currentTask.description);
            setPriority(currentTask.priority);
            setStatus(currentTask.status);
            setDeadline(formatDateForInput(currentTask.deadline));
        }
    },[])

    const handleStatusChange= (e)=>{
        setStatus(e.target.value)
    }

    const handleSubmit =async(e)=>{
        e.preventDefault();
        if(modalMode === "edit"){
            const response = await updateTask(currentTask._id,
                {
                    ...currentTask,
                    title, description, priority, status, deadline
                }
            )
            console.log(response)

            dispatch(updatedTask({id:currentTask._id,data:response}))

        }else{
            const response = await addTask({
                title, description, priority, status, deadline
            })
            dispatch(createAddTask(response))
        }
        
        handleClose();
    }

    const handleClose=()=>{
        dispatch(closeModal())
    }

    return (
        <div className='fixed top-0 bottom-0 right-0 left-0 bg-black/50  flex justify-center items-center'>
            <div className='bg-orange w-[50%] flex flex-col justify-start m-4 p-4'>
                <div className='flex justify-between items-center'>
                    <h1>{modalMode === "edit" ? "updateTask" :"CreateTask"}</h1>
                    <button onClick={handleClose}>close</button>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col'>
    
                    <label htmlFor="title">title</label>
                    <input type="text" id='title' value={title} onChange={e=>setTitle(e.target.value)} />

                    <label htmlFor="desc">description</label>
                    <textarea type="text" id="desc" value={description} onChange={e=>setDescription(e.target.value)} className=''/>
                    
                    <div className='my-2 bg-white p-2 border rounded w-full'>
                        <div className='my-2 bg-white px-2 border rounded w-full'>
                            <h1 className='text-center'>Status</h1>
                            <label className='block hover:border'>
                                <input type="radio" name="status" value="To-Do" onChange={handleStatusChange} checked={status === "To-Do"} /> To-Do
                            </label><br />

                            <label className='block hover:border'>
                                <input type="radio" name="status" value="In Progress" onChange={handleStatusChange} checked={status === "In Progress"} /> In Progress
                            </label><br />

                            <label className='block hover:border'>
                                <input type="radio" name="status" value="Under Review" onChange={handleStatusChange} checked={status === "Under Review"} /> Under Review
                            </label><br />

                            <label className='block hover:border'>
                                <input type="radio" name="status" value="Completed" onChange={handleStatusChange} checked={status === "Completed"} /> Completed
                            </label>
                        </div>
                    </div>
                    <select value={priority} onChange={e=>setPriority(e.target.value)} className='my-2 p-2 border rounded'>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="Urgent">Urgent</option>
                    </select>
                    <label htmlFor="">Deadline</label>
                    <input type="date" value={deadline} onChange={e=>setDeadline(e.target.value)}/>

                    <button type='submit'> {modalMode === "edit" ? "Update" : "Create"} </button>
                </form>
            </div>

        </div>
    )
}

export default TaskModal