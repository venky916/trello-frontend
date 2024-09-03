import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, updateTask } from '../services/taskService';
import { closeModal, createAddTask, updatedTask } from '../store/slices/taskSlice';
import Toast from './Toast';

const formatDateForInput = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
}

const TaskModal = () => {

    const dispatch = useDispatch();
    const { modalMode, modalOpen, currentTask } = useSelector(store => store.tasks)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('To-Do')
    const [priority, setPriority] = useState('Low')
    const [deadline, setDeadline] = useState(formatDateForInput(new Date()))
    const [loading, setLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);


    useEffect(() => {
        if (modalMode === 'edit' && currentTask) {
            setTitle(currentTask.title);
            setDescription(currentTask.description);
            setPriority(currentTask.priority);
            setStatus(currentTask.status);
            setDeadline(formatDateForInput(currentTask.deadline));
        } else {
            setStatus(currentTask.status);
        }
    }, [])
    
    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                setToastMessage(null);
            }, 3000); // Clear the toast after 3 seconds

            return () => clearTimeout(timer);
        }
    }, [toastMessage]);


    const handleStatusChange = (e) => {
        setStatus(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (modalMode === "edit") {
                const response = await updateTask(currentTask._id, {
                    ...currentTask,
                    title, description, priority, status, deadline
                });
                dispatch(updatedTask({ id: currentTask._id, data: response }));
                setToastMessage("Task Updated Successfully");
            } else {
                const response = await addTask({
                    title, description, priority, status, deadline
                });
                dispatch(createAddTask(response));
                setToastMessage("Task Added Successfully");
            }
            setLoading(false);
            handleClose();
        } catch (error) {
            setLoading(false);
            setToastMessage("Something went wrong. Please try again.");
        }
    };


    const handleClose = () => {
        dispatch(closeModal())
    }

    return (
    <>
        { toastMessage && <Toast message={ toastMessage } type="success" />}
        <div className='fixed top-0 bottom-0 right-0 left-0 bg-black/50 flex justify-center items-center'>
            <div className='bg-white w-[50%] flex flex-col justify-start m-4 p-8 rounded-lg shadow-lg'>
                <div className='flex justify-between items-center mb-4'>
                    <h1 className='text-2xl font-spaceGrotesk text-b-black'>
                        { modalMode === "edit" ? "Update Task" : "Create Task" }
                    </h1>
                    <button
                        onClick={ handleClose }
                        className='text-orange hover:text-light-orange transition duration-300'
                    >
                        Close
                    </button>
                </div>
                <form onSubmit={ handleSubmit } className='flex flex-col'>
                    <label htmlFor="title" className='text-b-black font-semibold mb-2'>Title</label>
                    <input
                        type="text"
                        id='title'
                        value={ title }
                        onChange={ e => setTitle(e.target.value) }
                        className='p-2 border border-b-black rounded mb-4'
                    />

                    <label htmlFor="desc" className='text-b-black font-semibold mb-2'>Description</label>
                    <textarea
                        id="desc"
                        value={ description }
                        onChange={ e => setDescription(e.target.value) }
                        className='p-2 border border-b-black rounded mb-4'
                    />

                    <div className='my-4'>
                        <h2 className='text-b-black font-semibold mb-2'>Status</h2>
                        <div className='flex flex-col space-y-2'>
                            <label className='flex items-center'>
                                <input
                                    type="radio"
                                    name="status"
                                    value="To-Do"
                                    onChange={ handleStatusChange }
                                    checked={ status === "To-Do" }
                                    className='mr-2'
                                />
                                To-Do
                            </label>

                            <label className='flex items-center'>
                                <input
                                    type="radio"
                                    name="status"
                                    value="In Progress"
                                    onChange={ handleStatusChange }
                                    checked={ status === "In Progress" }
                                    className='mr-2'
                                />
                                In Progress
                            </label>

                            <label className='flex items-center'>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Under Review"
                                    onChange={ handleStatusChange }
                                    checked={ status === "Under Review" }
                                    className='mr-2'
                                />
                                Under Review
                            </label>

                            <label className='flex items-center'>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Completed"
                                    onChange={ handleStatusChange }
                                    checked={ status === "Completed" }
                                    className='mr-2'
                                />
                                Completed
                            </label>
                        </div>
                    </div>

                    <label htmlFor="priority" className='text-b-black font-semibold mb-2'>Priority</label>
                    <select
                        id="priority"
                        value={ priority }
                        onChange={ e => setPriority(e.target.value) }
                        className='p-2 border border-b-black rounded mb-4'
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="Urgent">Urgent</option>
                    </select>

                    <label htmlFor="deadline" className='text-b-black font-semibold mb-2'>Deadline</label>
                    <input
                        type="date"
                        id="deadline"
                        value={ deadline }
                        onChange={ e => setDeadline(e.target.value) }
                        className='p-2 border border-b-black rounded mb-4'
                    />
                    <button
                        type='submit'
                        className={ `bg-orange text-white py-2 rounded ${!loading && "hover:bg-light-orange transition duration-300"}` }
                        disabled={ loading }
                    >
                        { loading ? (
                            <span className="flex items-center justify-center">
                                <div className='animate-spin rounded-full h-5 w-5 border-4 border-slate-400 border-t-white'></div>
                                Processing...
                            </span>
                        ) : (
                            modalMode === "edit" ? "Update" : "Create"
                        ) }
                    </button>

                </form>
            </div>
            </div>
        </>
    )
}

export default TaskModal;
