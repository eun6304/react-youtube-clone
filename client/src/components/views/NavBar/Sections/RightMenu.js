import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../../_actions/user_action'
import { flushSync } from 'react-dom';
import { useSelector } from 'react-redux';


const MenuItems =  [
  {
    label: <a href="/login">Signin</a>,
    key: 'mail'
  },
  {
    label: <a href="/register">Signup</a>,
    key: 'app'
  }
]

const AuthMenuItems =  [
  {
    label: <a>Logout</a>,
    key: 'logout'
  }
]

function RightMenu(props) {
  const user = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutHandler = event => {

    // logoutUser 라는 액션을 실행시킴
    dispatch(logoutUser())
    .then(response => {
      if (response.payload.success) {
        navigate("/login");
      } else {
        alert("로그아웃에 실패했습니다");
      }
    })
    
  }

  if(user.serverUserData && !user.serverUserData.isAuth) {
    return (
      <Menu mode={props.mode} items={MenuItems}></Menu>
    )
  } else {
    return (
      <Menu mode={props.mode} onClick={onLogoutHandler} items={AuthMenuItems}></Menu>
    )
  }


}

export default RightMenu