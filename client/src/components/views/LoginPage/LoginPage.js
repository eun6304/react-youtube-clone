
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  // State 만들기 
  // 이메일과 비밀번호 State
  // 초기 설정은 빈 스트링 ""
  // 타이핑을 할때 OnChange 이벤트를 발생시켜서 State를 바꿔줘서 Value가 바뀜
  // 타이핑 -> OnChange -> on어쩌고Handelr -> set어쩌고 -> useState -> Value
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  // dispatch 사용하기
  const dispatch = useDispatch();

  // navigate 사용하기
  const navigate = useNavigate();

  const onEmailHandler= event => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler= event => {
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler= event => {
    event.preventDefault();
    let body = {
      email : Email,
      password : Password
    }
    // loginUser 라는 액션을 실행시킴
    dispatch(loginUser(body))
    .then(response => {
      if(response.payload.loginSuccess) {
        // root 경로로 이동
        navigate('/')
      } else {
        alert('로그인에 실패하였습니다.')
      }
    })
    
  }


  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <form style={{ display:'flex', flexDirection : 'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button type="submit">
            Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
