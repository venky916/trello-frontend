import React from 'react'
import logo from '../assets/logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../store/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import useLocalstorage from '../hooks/useLocalStorage';

const Header = () => {
  const user = useSelector(store => store.user.user)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [, , clearLocalStorage] = useLocalstorage("user")

  const handleLogout = () => {
    dispatch(removeUser());
    clearLocalStorage();
    navigate('/auth');
  }

  return (
    <header className='flex justify-between items-center bg-black text-white p-4 shadow-md font-spaceGrotesk'>
      <img src={ logo } alt='Logo' className='h-10' />
      <h1 className='text-lg'>
        Hello, { user ? user.name : "User" }
      </h1>
      {
        user ?
          <button
            onClick={ handleLogout }
            className='bg-orange px-4 py-2 rounded hover:bg-light-orange transition duration-300'>
            Logout
          </button>
          :
          <button
            onClick={ () => navigate('/auth') }
            className='bg-orange px-4 py-2 rounded hover:bg-light-orange transition duration-300'>
            Login
          </button>
      }
    </header>
  )
}

export default Header
