import React, { useEffect, useState } from 'react';
import Column from '../components/Column';
import { fetchTasks } from '../services/taskService';
import { useDispatch, useSelector } from 'react-redux';
import { addTasks } from '../store/slices/taskSlice';
import TaskModal from '../components/TaskModal';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js'; // Import Fuse.js
import Toast from '../components/Toast';

const TodoPage = () => {
  const TYPES = ['To-Do', 'In Progress', 'Under Review', 'Completed'];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLocal = JSON.parse(localStorage.getItem('user'));
  const user = useSelector(store =>store.user.user)
  const allTasks = useSelector((store) => store.tasks.tasks);
  const modal = useSelector((store) => store.tasks.modalOpen);
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState(allTasks);
  const [loading, setLoading] = useState(false);

  const handleFilter = () => {
    if (search !== '') {
      const fuse = new Fuse(allTasks, {
        keys: ['title', 'description'], // Keys to search in
        threshold: 0.3, // Adjust the threshold for more or less fuzzy results
      });
      const results = fuse.search(search);
      setTasks(results.map((result) => result.item));
    } else {
      setTasks(allTasks);
    }
  };

  const sortTasksByDeadline = () => {
    const sortedTasks = [...tasks].sort(
      (a, b) => new Date(a.deadline) - new Date(b.deadline),
    );
    setTasks(sortedTasks);
  };

  const getTasks = async () => {
    setLoading(true);
    try {
      const token  = user?.token || userLocal?.token
      const tasks = await fetchTasks(token);
      dispatch(addTasks(tasks));
      setTasks(tasks); // Update local state
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !userLocal) {
      navigate('/auth');
    } else {
      getTasks(); // Fetch tasks only if the user is logged in
    }
  },  [navigate, dispatch]); // Remove allTasks from dependencies

  useEffect(() => {
    setTasks(allTasks); // Sync local tasks with Redux tasks
  }, [allTasks]); // Update local tasks when allTasks changes

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center p-2 bg-white shadow-md ">
        {/* Title */}
        <h1 className="text-xl font-bold text-black font-spaceGrotesk mx-auto">
          Todo's
        </h1>

        {/* Search and Sort Buttons */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search tasks..."
            className="border border-gray-300 p-2 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-orange text-white px-4 py-2 rounded-md hover:bg-light-orange hover:text-black transition duration-300"
            onClick={handleFilter}
          >
            Search
          </button>
          <button
            className="bg-light-orange text-b-black px-4 py-2 rounded-lg hover:bg-orange hover:text-white transition duration-300 text-sm sm:text-base"
            onClick={sortTasksByDeadline}
          >
            Sort by deadline
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {TYPES.map((status, index) => (
          <Column
            key={index}
            status={status}
            colTasks={tasks.filter((task) => task.status === status)}
            loading={loading} // Pass the loading state
            className="bg-l-white p-4 rounded-lg shadow-md"
          />
        ))}
      </div>

      {/* Task Modal */}
      {modal && (
        <TaskModal className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" />
      )}

      <Toast />
    </>
  );
};

export default TodoPage;
