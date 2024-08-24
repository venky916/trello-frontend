import React from 'react'
import { useDispatch } from 'react-redux'
import { openModal } from '../store/slices/taskSlice';
import { useDrag } from 'react-dnd';

const Task = ({task,index ,onDelete ,moveTask}) => {
  const {title,description,priority,deadline} = task
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item : {index,task},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const formatDate = (dateString)=>{
    const options = {year : "numeric" ,month :"long" ,day :"numeric"};
    return new Date(dateString).toLocaleDateString(undefined,options);
  }

  const handleUpdate =()=>{
    const info = {
      modalMode:"edit",
      modalOpen :true,
    currentTask : task}
    dispatch(openModal(info))
  }

  return (
    <div ref={drag} className='bg-b-black text-l-white m-2 p-2 text-wrap border rounded-lg flex flex-col justify-start'>
      <h1 className='text-white'>title: {title}</h1>
      {description && <p >description : {description}</p>}
      <h6>priority : {priority}</h6>
      <h4>deadline : {formatDate(deadline)}</h4>
      <div className='flex justify-between my-2 '>
        <button onClick={()=>handleUpdate()}>edit</button>
        <button onClick={()=>onDelete(task._id)}>delete</button>
      </div>
    </div>
  )
}

export default Task