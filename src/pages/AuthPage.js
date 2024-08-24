import React, { useEffect, useState } from 'react'
import { LogIN, SignUP } from "../services/userService"
import { useDispatch } from 'react-redux'
import { addUser }  from '../store/slices/userSlice'
import { useNavigate } from 'react-router-dom';
import useLocalstorage from '../hooks/useLocalStorage';

const AuthPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [getLocalStorageValue ,setLocalStorage] = useLocalstorage("user");

  const [isLogin, setIsLogin] = useState(true)
  const [auth,setAuth] = useState(getLocalStorageValue)
  const [name,setName] = useState('')
  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')

useEffect(()=>{
  if(auth) {
    dispatch(addUser(auth))
    navigate('/')
  }
},[auth])

  const handleSubmit = async(e)=>{
    e.preventDefault()
    let response;
    if(isLogin){
      const user = {
        email,
        password
      }
      response = await LogIN(user);
    }else{
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
    <div className='flex flex-col flex-1 justify-center items-center m-5 p-4'>

    <form className=''>
      {
        !isLogin && <div className='flex gap-2'>
          <label htmlFor="username">name</label>
          <input type="text" id="username" value={name} onChange={e => setName(e.target.value)} />
        </div>
      }
        <div className='flex gap-2'>
          <label htmlFor="email"> Email</label>
          <input type="text" id='email' onChange={e => setEmail(e.target.value)} value={email} />
        </div>
        <div className='flex gap-2'>
          <label htmlFor="password">Password</label>
          <input type="password" id='password' onChange={e => setPassword(e.target.value)} value={password} />
        </div>
        <button onClick={handleSubmit}>{isLogin ? "Login" : "signup"}</button>

      </form>
      <button onClick={()=>setIsLogin(!isLogin)}>
        {isLogin ? 'Don\'t have an account? Sign up' : 'Already have an account? Login'}
        </button>
      </div>
  )
}

export default AuthPage