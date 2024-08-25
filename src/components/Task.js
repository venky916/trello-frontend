import React from 'react'
import { useDispatch } from 'react-redux'
import { openModal } from '../store/slices/taskSlice';
import { useDrag } from 'react-dnd';

const Task = ({ task, index, onDelete,moveTask }) => {
  const { title, description, priority, deadline } = task;
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { index, task },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const handleUpdate = () => {
    const info = {
      modalMode: "edit",
      modalOpen: true,
      currentTask: task
    }
    dispatch(openModal(info))
  }

  return (
    <div
      ref={ drag }
      className={ `bg-b-black text-l-white m-2 p-4 border rounded-lg flex flex-col justify-start transition-transform duration-200 ${isDragging ? 'transform scale-95' : ''}` }
    >
      <h1 className='text-white font-bold text-xl mb-2'>Title: { title }</h1>
      { description && <p className='text-t-white mb-2'>Description: { description }</p> }
      <h6 className='text-light-orange mb-2'>Priority: { priority }</h6>
      <h4 className='text-t-white mb-4'>Deadline: { formatDate(deadline) }</h4>
      <div className='flex justify-between mt-2'>
        <button
          onClick={ handleUpdate }
          className='bg-orange px-4 py-1 rounded hover:bg-light-orange transition duration-300'
        >
          Edit
        </button>
        <button
          onClick={ () => onDelete(task._id) }
          className='bg-red-600 px-4 py-1 rounded hover:bg-red-500 transition duration-300'
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Task
