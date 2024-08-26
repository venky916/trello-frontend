import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../store/slices/taskSlice';
import { useDrag } from 'react-dnd';
import { formatDate } from '../utils/constants';
import { deleteTask } from '../services/taskService';
import { deletedTask } from '../store/slices/taskSlice';
import Shimmer from './Shimmer';
const Task = ({ task, index }) => {
  const { title, description, priority, deadline } = task;
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { index, task },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const onDelete = async (id) => {
    await deleteTask(id);
    dispatch(deletedTask(id));
  };

  const handleUpdate = () => {
    const info = {
      modalMode: 'edit',
      modalOpen: true,
      currentTask: task,
    };
    dispatch(openModal(info));
  };

  return (
    <div
      ref={ drag }
      className={ `bg-b-black text-l-white m-2 p-4 border rounded-lg flex flex-col justify-start transition-transform duration-200 ${isDragging ? 'transform scale-95' : ''}` }
    >
      <h1 className='text-white font-bold text-xl mb-2'>Title: { title }</h1>
      { description && (
        <div className='overflow-hidden'>
          <p
            className={ `mb-2 ${isExpanded ? '' : 'line-clamp-2'} whitespace-normal cursor-pointer break-words` }
            onClick={ () => setIsExpanded(!isExpanded) }
          >
            Description: { description }
          </p>
        </div>
      ) }
      <h6 className='text-light-orange mb-2'>Priority: { priority }</h6>
      <h4 className='text-red-600 mb-4'>Deadline: { formatDate(deadline) }</h4>
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
  );
};

export default Task;
