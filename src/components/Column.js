import React, { useEffect, useState } from 'react';
import Task from './Task';
import { useDispatch } from 'react-redux';
import { deletedTask, openModal, updatedTask } from "../store/slices/taskSlice";
import { deleteTask, updateTask } from '../services/taskService';
import { useDrop } from 'react-dnd';

const Column = ({ status, tasks }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(tasks.length);

  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      if (item.task) {
        const updateData = { ...item.task, status };
        updateTask(updateData._id, updateData).then(
          dispatch(updatedTask({ id: updateData._id, data: updateData }))
        );
      }
    },
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = tasks.findIndex(task => task._id === item.task._id);

      if (dragIndex === hoverIndex) {
        return;
      }

      moveTask(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const moveTask = () => {
    // Add logic for moving tasks if needed
  };

  useEffect(() => {
    setCount(tasks.length);
  }, [tasks]);

  const addTask = () => {
    const info = {
      modalMode: "create",
      modalOpen: true,
      currentTask: null,
    };
    dispatch(openModal(info));
  };

  const onDelete = async (id) => {
    await deleteTask(id);
    dispatch(deletedTask(id));
  };

  return (
    <div
      ref={ drop }
      className={ `border border-orange rounded-lg w-[24%] m-2 p-4 min-h-[84vh] flex flex-col transition-all duration-200 ${isOver ? "bg-orange/20 border-orange" : "bg-white"
        }` }
    >
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-lg font-bold text-black'>{ status }</h1>
        <h5 className='text-md text-t-white bg-b-black px-2 rounded'>{ count }</h5>
      </div>
      <div className='flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-l-white'>
        { tasks.map((task, index) => (
          <Task
            task={ task }
            index={ index }
            key={ task._id }
            onDelete={ onDelete }
            moveTask={ moveTask }
          />
        )) }
      </div>
      <button
        className='mt-4 bg-orange text-white py-2 px-4 rounded hover:bg-light-orange transition-colors duration-200'
        onClick={ addTask }
      >
        Add Task
      </button>
    </div>
  );
};

export default Column;
