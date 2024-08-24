import React, { useEffect, useRef, useState } from 'react'
import Task from './Task'
import { useDispatch } from 'react-redux'
import { deletedTask, openModal, updatedTask } from "../store/slices/taskSlice"
import { deleteTask, updateTask } from '../services/taskService'
import { useDrop } from 'react-dnd'

const Column = ({ status, tasks }) => {
  const dispatch = useDispatch();
  const [count,setCount] = useState(tasks.length)

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      if (item.task) {
        const updateData = { ...item.task, status }
        updateTask(updateData._id, updateData).then(
        dispatch(updatedTask({ id: updateData._id, data: updateData }))
        )
      }
    },
    hover(item,monitor){
      const dragIndex = item.index;
      const hoverIndex = tasks.findIndex(task => task._id === item.task._id);

      if (dragIndex === hoverIndex) {
        return;
      }

      moveTask(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    // canDrop: () => canMoveTask(),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      // canDrop: !!monitor.canDrop()
    })
  })

  // const moveTask =(dragIndex ,hoverIndex)=>{
  //   const newTasks = [...tasks];
  //   const [draggedTask] = newTasks.splice(dragIndex,1);
  //   console.log(draggedTask,'')
  //   newTasks.splice(hoverIndex, 0, draggedTask);
  //   setTasks(newTasks);
  // }

  const moveTask = ()=>{
    
  }

  useEffect(() => {
    setCount(tasks.length)
  }, [tasks])

  const addTask = () => {
    const info = {
      modalMode: "create",
      modalOpen: true,
      currentTask: null
    }
    dispatch(openModal(info))
  }

  const onDelete = async (id) => {
    await deleteTask(id);
    dispatch(deletedTask(id))
  }

  const onEdit = async (id, data) => {
    await updateTask(id, data);
    dispatch(updatedTask(id, data))
  }


  return (
    <div ref={drop} className={`border border-orange rounded-lg w-[24%] m-2 p-2  min-h-[84vh] flex flex-col ${isOver ? "bg-red-900" : ""}`}>
      <div className='flex'>
        <h1>{status}</h1>
        <h5 className='px-2'>{count}</h5>
      </div>
      <div className='flex-1 overflow-y-auto'>
        {tasks.map((task, index) => {
          return <Task task={task} index={index} key={task._id} onDelete={onDelete} moveTask={moveTask} />
        })}
      </div>

      <button className='bg-orange text-white w-full' onClick={addTask}>AddTask</button>
    </div>
  )
}

export default Column