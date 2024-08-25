import React, { useEffect, useState } from 'react'
import { LogIN, SignUP } from "../services/userService"
import { useDispatch } from 'react-redux'
import { addUser } from '../store/slices/userSlice'
import { useNavigate } from 'react-router-dom';
import useLocalstorage from '../hooks/useLocalStorage';

const AuthPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [getLocalStorageValue, setLocalStorage] = useLocalstorage("user");

  const [isLogin, setIsLogin] = useState(true)
  const [auth, setAuth] = useState(getLocalStorageValue)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (auth) {
      dispatch(addUser(auth))
      navigate('/')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    let response;
    if (isLogin) {
      const user = {
        email,
        password
      }
      response = await LogIN(user);
    } else {
      const user = {
        name,
        email,
        password
      }
      response = await SignUP(user);
    }
    setLocalStorage(response)
    dispatch(addUser(response))
    navigate('/')
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-b-black text-white font-manrope p-4'>
      <form className='bg-black p-6 rounded-lg shadow-md w-full max-w-md space-y-4'>
        {
          !isLogin && (
            <div className='flex flex-col'>
              <label htmlFor="username" className='text-t-white'>Name</label>
              <input
                type="text"
                id="username"
                value={ name }
                onChange={ e => setName(e.target.value) }
                className='p-2 bg-b-black border border-t-white rounded text-white'
              />
            </div>
          )
        }
        <div className='flex flex-col'>
          <label htmlFor="email" className='text-t-white'>Email</label>
          <input
            type="text"
            id='email'
            onChange={ e => setEmail(e.target.value) }
            value={ email }
            className='p-2 bg-b-black border border-t-white rounded text-white'
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="password" className='text-t-white'>Password</label>
          <input
            type="password"
            id='password'
            onChange={ e => setPassword(e.target.value) }
            value={ password }
            className='p-2 bg-b-black border border-t-white rounded text-white'
          />
        </div>
        <button
          onClick={ handleSubmit }
          className='w-full p-2 bg-orange rounded hover:bg-light-orange transition duration-300'>
          { isLogin ? "Login" : "Sign Up" }
        </button>
      </form>
      <button
        onClick={ () => setIsLogin(!isLogin) }
        className='mt-4 text-light-orange hover:text-orange transition duration-300'>
        { isLogin ? "Don't have an account? Sign up" : "Already have an account? Login" }
      </button>
    </div>
  )
}

export default AuthPage
