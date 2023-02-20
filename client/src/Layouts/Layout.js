import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/views/NavBar/Navbar'

function Layout() {
  return (
    <div className='warp'>
      <div className='container'>
        <Navbar />
        <div className='contents_area'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
