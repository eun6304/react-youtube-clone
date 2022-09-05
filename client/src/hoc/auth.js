import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authUser } from '../_actions/user_action';

export default function(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(authUser())
      .then(response => {
        //  로그인 안한 상태
        if(!response.payload.isAuth) {
            navigate('/login')
        }else { // 로그인 한 상태
          if(!response.payload.isAdmin) {
            navigate('/')
          }else {
            navigate('/')
          }
        }
      })
    }, [])

    return (
      <SpecificComponent />
    )
  }

  return AuthenticationCheck

}

