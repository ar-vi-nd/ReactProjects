import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements ,Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import {About, Contactus, Github, Home,User} from "./components"
import { loadGithubInfo } from './components/Github/Github.jsx'

// const router = createBrowserRouter([
//   {
//     path : "/",
//     element : <Layout/>,
//     children : [
//       {path:"",element: <Home/>},{path:"about",element: <About/>},{path:"contactus",element:<Contactus/>}
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contactus' element={<Contactus/>}/>
      <Route path='user/:userId' element={<User/>}/>

      {/* here loader takes a callback and executes it */}
      <Route loader = {loadGithubInfo} path='github' element={<Github/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
