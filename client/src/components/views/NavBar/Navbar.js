import React from 'react'
import LeftMenu from './Sections/LeftMenu'
import RightMenu from './Sections/RightMenu'

function Navbar() {
  const mode = "horizontal"; // 수평 메뉴로 설정
  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0 5rem', height: '60px', background: '#001529'
    }}>
      <LeftMenu mode={mode} />
      <RightMenu mode={mode} />
    </nav>
  )
}

export default Navbar
