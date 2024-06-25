
import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from "react-redux"
import authService from './appwrite/auth'
// import {conf} from "./conf/conf"

import {appwriteUrl,appwriteProjectId,appwriteDatabaseId,appwriteCollectionId,appwriteBucketId} from "./conf/conf"
import { login, logout } from './store/authSlice'
import { Header , Footer } from './components'

import {Outlet} from "react-router-dom"

// import conf from "./conf/conf"
// cannot import like this as there is no default export

function App() {
// console.log(appwriteUrl,appwriteProjectId,appwriteDatabaseId,appwriteCollectionId,appwriteBucketId)
 
// console.log("conf : ",conf)

const [loading,setLoading] = useState(true)
const dispatch = useDispatch()

useEffect(()=>{
  authService.getCurrentUser()
  .then((userData)=>{
    if(userData)
      {dispatch(login({userData}))}
    else{
      dispatch(logout())
    }
}) .finally(
  ()=>{setLoading(false)}
)
},[])
//   return (
//     <>
//  <h1 className="text-3xl font-bold underline text-center p-4">
//       Blogshare with appwrite {import.meta.env.VITE_APPWRITE_URL}
      
//     </h1>
//     {/* <button className="p-4 rounded-md right-100 outline" onClick={()=>{console.log(a);a = a+2}}>{a}</button> */}
//     </>
//   )


return !loading?(<div className='min-h-screen text-center flex-wrap bg-gray-500'> 
{/* <Header></Header> */}
Todo <main>
  <Outlet/>
</main>
{/* <Footer></Footer> */}
</div>): null
}

export default App
