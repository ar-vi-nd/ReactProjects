import React from 'react'
import { useParams } from 'react-router-dom'

const User = () => {
    const {userId} = useParams()
  return (
    <div className='bg-gray-500 text-center text-3xl p-5 w-full'>User : {userId}</div>
  )
}

export default User