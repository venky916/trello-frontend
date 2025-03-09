import React, { useEffect, useState } from 'react';
import Task from './Task';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, updatedTask } from '../store/slices/taskSlice';
import { updateTask } from '../services/taskService';
import { useDrop } from 'react-dnd';
import Shimmer from './Shimmer';

const Column = ({ status, colTasks, loading }) => {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState(colTasks);

  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => {
      if (item.task) {
        const updateData = { ...item.task, status };
        updateTask(updateData._id, updateData).then(
          dispatch(updatedTask({ id: updateData._id, data: updateData })),
        );
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  useEffect(() => {
    setTasks(colTasks);
  }, [tasks, colTasks]);

  const addTask = () => {
    const info = {
      modalMode: 'create',
      modalOpen: true,
      currentTask: { status: status },
    };
    dispatch(openModal(info));
  };

  return (
    <div
      ref={drop}
      className={`border border-orange rounded-lg m-2 p-4 min-h-[84vh] flex flex-col transition-all duration-200 ${
        isOver ? 'bg-orange/20 border-orange' : 'bg-white'
      }`}
    >
      {/* Column Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold text-black">{status}</h1>
        <h5 className="text-md text-t-white bg-b-black px-2 rounded">
          {tasks.length}
        </h5>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-orange scrollbar-track-l-white">
        {loading ? ( // Show Shimmer while loading
          <Shimmer />
        ) : tasks.length === 0 ? ( // Show message if no tasks
          <p className="text-gray-500 text-center">No tasks here</p>
        ) : (
          // Render tasks
          tasks.map((task, index) => (
            <Task task={task} index={index} key={task._id} />
          ))
        )}
      </div>

      {/* Add Task Button */}
      <button
        className="mt-4 bg-orange text-white py-2 px-4 rounded hover:bg-light-orange transition-colors duration-200"
        onClick={addTask}
      >
        Add Task
      </button>
    </div>
  );
};

export default Column;
