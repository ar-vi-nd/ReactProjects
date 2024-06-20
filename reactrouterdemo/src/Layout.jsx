import React from 'react'

import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <Header></Header>
        <Outlet/>
        <Footer></Footer>
    </div>
  )
}

export default Layout