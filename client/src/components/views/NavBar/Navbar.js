import React from 'react'
import LeftMenu from './Sections/LeftMenu'
import RightMenu from './Sections/RightMenu'

function Navbar() {
  return (
    <div style = {{display : 'flex', justifyContent : 'space-between', margin : '0px 5rem auto'}}>
      <LeftMenu />
      <RightMenu />
    </div>
  )
}

export default Navbar
