import { useState } from 'react'
import './App.css'
import {Header,Footer} from "./components"
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'

function App() {

  return (
    <>
    <Router>

 <h1 className='text-3xl bg-orange-500'>React Router Demo</h1>
 <Header></Header>
 <Footer></Footer>
    </Router>
    </>
  )
}

export default App
