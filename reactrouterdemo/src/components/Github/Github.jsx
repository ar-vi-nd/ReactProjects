import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'

const Github = () => {
    // const [data,setData] = useState()
    // useEffect(()=>{
    // (async()=>{
    //         const response = await fetch("https://api.github.com/users/ar-vi-nd")
    //         const jsondata = await response.json()
    //         setData(jsondata)
    //     })()
        

    // },[])

    // console.log(data)

    const data = useLoaderData()

  return (
    <div className='text-center m-4 bg-gray-500 text-white p-4 text-3xl'>Github : {data?.followers}</div>
  )
}

const loadGithubInfo = async ()=>{
    const response = await  fetch("https://api.github.com/users/ar-vi-nd")
    const jsondata = await response.json()

    return jsondata
}

export default Github

export {loadGithubInfo}



// At first I was using useEffect to make a request on github then use the data to show my follewers 
// But there was a problem that it takes time to get the data so at first the page was blank for some time
// so instead of using useEffect i made a function to get data from github and exported it

// Now react router dom provides us the functionality to execute this function even before the component mounts
// And we can use that data using useLoaderData hook