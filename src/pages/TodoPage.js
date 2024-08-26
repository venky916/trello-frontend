import React, { useEffect, useState } from 'react'
import Column from '../components/Column'
import { fetchTasks } from '../services/taskService'
import { useDispatch, useSelector } from 'react-redux'
import { addTasks } from '../store/slices/taskSlice'
import TaskModal from '../components/TaskModal'
import { useNavigate } from 'react-router-dom'
import Fuse from 'fuse.js' // Import Fuse.js

const TodoPage = () => {

  const TYPES = ['To-Do', 'In Progress', 'Under Review', 'Completed']
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user)
  const allTasks = useSelector(store => store.tasks.tasks);
  const modal = useSelector(store => store.tasks.modalOpen)
  const [search, setSearch] = useState('')
  const [tasks, setTasks] = useState(allTasks)

  const handleFilter = () => {
    if (search !== "") {
      const fuse = new Fuse(allTasks, {
        keys: ['title', 'description'], // Keys to search in
        threshold: 0.3, // Adjust the threshold for more or less fuzzy results
      });
      const results = fuse.search(search);
      setTasks(results.map(result => result.item));
    } else {
      setTasks(allTasks);
    }
  }

  const sortTasksByDeadline = () => {
    const sortedTasks = [...tasks].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    setTasks(sortedTasks)
  };

  const getTasks = async () => {
    const tasks = await fetchTasks();
    dispatch(addTasks(tasks))
    setTasks(tasks)
  }

  useEffect(() => {
    if (!user.user) {
      navigate('/auth');
    }
    if (!allTasks.length) {
      getTasks();
    }
    setTasks(allTasks)
  }, [allTasks, navigate, user.user, dispatch]);
  return (
    <>
      {/* Header */ }
      <div className='relative'>
        <h1 className='absolute left-1/2 transform -translate-x-1/2 top-4 text-xl font-bold text-black font-spaceGrotesk'>Todo's</h1>
        <div className='absolute right-4 top-4 flex items-center space-x-2'>
          <input
            type="text"
            placeholder="Search tasks..."
            className='border border-gray-300 p-2 rounded'
            value={ search }
            onChange={ e => setSearch(e.target.value) }
          />
          <button className='bg-orange text-white px-4 py-2 rounded hover:bg-light-orange transition duration-300' onClick={ handleFilter }>
            Search
          </button>
          <button className='bg-light-orange text-b-black px-4 py-2 rounded-lg hover:bg-orange transition duration-300' onClick={ sortTasksByDeadline }>Sort by deadline</button>
        </div>
      </div>

      {/* Columns */ }
      <div className='flex space-x-4 p-4 pt-16'>
        {
          TYPES.map((status, index) => (
            <Column
              key={ index }
              status={ status }
              colTasks={ tasks.filter((task) => task.status === status) }
              className='flex-1 bg-l-white p-4 rounded-lg shadow-md'
            />
          ))
        }
      </div>

      {/* Task Modal */ }
      {
        modal && <TaskModal className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center' />
      }
    </>
  )
}

export default TodoPage
