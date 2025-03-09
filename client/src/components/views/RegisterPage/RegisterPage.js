import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

function RegisterPage() {
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Name, setName] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onEmailHandler= event => {
    setEmail(event.currentTarget.value)
  }

  const onNameHandler= event => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler= event => {
    setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler= event => {
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler= event => {
    event.preventDefault();
    if(Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }
    let body = {
      email : Email,
      name : Name,
      password : Password,

    }
    // loginUser 라는 액션을 실행시킴
    dispatch(registerUser(body))
    .then(response => {
      if(response.payload.success) {
        // root 경로로 이동
        navigate('/')
      } else {
        alert('회원가입에 실패하였습니다.')
      }
    })
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <Form
        onFinish={onSubmitHandler}
        style={{ width: '300px', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
        >
          <Input type="email" value={Email} onChange={onEmailHandler} />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input type="text" value={Name} onChange={onNameHandler} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password value={Password} onChange={onPasswordHandler} />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords do not match!');
              },
            }),
          ]}
        >
          <Input.Password value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            회원 가입
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RegisterPage
