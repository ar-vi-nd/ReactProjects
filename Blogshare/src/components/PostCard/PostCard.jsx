import React, { useEffect } from 'react'
import appwriteService from '../../appwrite/config'
import { Link, useNavigate } from 'react-router-dom'


// here featured image is actually the url of the image stored in the bucket ie database, so to access that image we made a method "getfilepreview in appwrite service "

const PostCard = ({$id,title,featuredImage}) => {
  const navigate = useNavigate()


  return (
    <div className='w-full bg-gray-100 rounded-xl p-4' onClick={()=>{navigate(`/post/${$id}`)}}>

    <div className='w-full justify-center mb-4'>
        <img src= {appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl'/>
    </div>

    <h2 className="text-xl font-bold">{title}</h2>
    </div>
  )
}

export default PostCard