import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

const MenuItems =  [
  {
    label: <Link to="/">Home</Link>,
    key: 'mail'
  },
  {
    label: <Link to="/favorite">favorite</Link>,
    key: 'favorite'
  },
  {
    label: <Link to="/video/upload">upload</Link>,
    key: 'upload'
  },
  {
    label: <Link to="/video/subscribed">subscribed</Link>,
    key: 'subscribed'
  }
]

function LeftMenu(props) {
  return (
    <Menu 
      mode={props.mode}
      theme="dark"
      className="menu-style"
      items={MenuItems}
    />
  )
}

export default LeftMenu