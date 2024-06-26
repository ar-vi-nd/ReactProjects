import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import authService from '../../appwrite/auth'


const LogoutBtn = () => {

    const dispatch = useDispatch()

    const logoutHandler = ()=>{
        authService.logout().then((result)=>{ if(result){dispatch(logout())}}).catch(error=>console.log("error : ",error))
    }
  return (

   <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-500 rounded-full' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn