import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';

function AllPosts() {
    const userData = useSelector((state)=>(state.auth.userData))
    const [posts, setPosts] = useState([])
    useEffect(() => {
        console.log(userData)
    appwriteService.getPosts(userData?.$id).then((posts) => {
        if (posts) {
            console.log(posts)
            setPosts(posts.documents)
        }
    })},[userData])

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.length==0?<div className='p-2 w-1/4'>No Posts Yet.</div>:posts.map((post) => (
                    <div key={post?.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts