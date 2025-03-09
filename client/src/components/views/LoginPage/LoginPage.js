
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Form, Input, Button } from 'antd';

function LoginPage() {
  // State 만들기 
  // 이메일과 비밀번호 State
  // 초기 설정은 빈 스트링 ""
  // 타이핑을 할때 OnChange 이벤트를 발생시켜서 State를 바꿔줘서 Value가 바뀜
  // 타이핑 -> OnChange -> on어쩌고Handelr -> set어쩌고 -> useState -> Value
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  // 쿠키 이용하기
  const [cookies, setCookie] = useCookies(['id']);

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

  const onSubmitHandler= values => {
    // event.preventDefault();
    // let body = {
    //   email : Email,
    //   password : Password
    // }
    const { email, password } = values;

    // loginUser 라는 액션을 실행시킴
    dispatch(loginUser({ email, password }))
    .then(response => {
      if(response.payload.loginSuccess) {
        // root 경로로 이동
        navigate('/')
        console.log(response.payload)
        window.localStorage.setItem('userId', response.payload.userId);
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
      <Form 
        onFinish={onSubmitHandler}  // Ant Design에서는 onSubmit 대신 onFinish 사용
        style={{ width: '300px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
        layout="vertical"
      >
        <Form.Item 
          label="Email" 
          name="email" 
          rules={[{ required: true, message: 'Please enter your email!' }]}
        >
          <Input type="email" value={Email} onChange={onEmailHandler} />
        </Form.Item>
        <Form.Item 
          label="Password" 
          name="password" 
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password value={Password} onChange={onPasswordHandler} />
        </Form.Item>
        <br />
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginPage
