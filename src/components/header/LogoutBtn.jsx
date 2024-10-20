import React from 'react'
import { useDispatch } from 'react-redux'
import { authService } from '../../appwrite/auth';
import { logout } from '../../import';
function LogoutBtn() {
    const dispatch = useDispatch();
  return (
    <button
        onClick={()=>{
            authService.logOut()
            .then(()=> dispatch(logout()))
         className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        }}
    >Logout</button>
  )
}

export default LogoutBtn