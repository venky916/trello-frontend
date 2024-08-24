import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../store/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import useLocalstorage from '../hooks/useLocalStorage';

const Header = () => {
  const user = useSelector(store=>store.user.user)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { clearLocalStorage } = useLocalStorage("user")

  const handleLogout = ()=>{
    dispatch(removeUser());
    clearLocalStorage();
    navigate('/auth');
  }

  return (
    <div className='flex justify-between items-center bg-black text-white'>
      <img src={logo} alt='default' />
      <h1>hello {user?user.name :"user"}</h1>
      {
        user ? <button onClick={handleLogout}>logout</button> : <button>login</button> 
      }
    </div>
  )
}

export default Header