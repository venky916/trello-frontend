import React, { useEffect } from 'react'
import Column from '../components/Column'
import { fetchTasks } from '../services/taskService'
import { useDispatch, useSelector } from 'react-redux'
import { addTasks } from '../store/slices/taskSlice'
import TaskModal from '../components/TaskModal'
import { useNavigate } from 'react-router-dom'

const TodoPage = () => {

  const TYPES = ['To-Do', 'In Progress', 'Under Review', 'Completed']
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store =>store.user)

  const tasks = useSelector(store => store.tasks.tasks);
  const modal = useSelector(store => store.tasks.modalOpen)
  
  const getTasks = async () => {
    const tasks = await fetchTasks();;
    dispatch(addTasks(tasks))
  }

  useEffect(() => {
    if (!user.user) {
      navigate('/auth')
    }
    !tasks.length && getTasks()
  }, [tasks])

  return (
    <>
      <h1 className='text-center'>Todo's</h1>
      <div className='flex'>
        {
          TYPES.map((status, index) => {
            return <Column key={index} status={status} tasks={tasks.filter((task) => task.status === status)} />
          })
        }
      </div>
      {
        modal && <TaskModal />
      }
    </>
  )
}

export default TodoPage