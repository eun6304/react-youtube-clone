import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER
} from "./types"

export function loginUser(dataTosubmit) {
  const request = axios.post('/api/users/login', dataTosubmit)
    .then(response => response.data)
  // reducer에 넘겨줘야 한다. 
  // action은 { type : "", payload : ""} 형식으로
  return {
    type : LOGIN_USER,
    payload : request
  }
} 

export function registerUser(dataTosubmit) {
  const request = axios.post('/api/users/register', dataTosubmit)
    .then(response => response.data)
  return {
    type : REGISTER_USER,
    payload : request
  }
} 

export function authUser() {
  const request = axios.get('/api/users/auth')
    .then(response => response.data)
  return {
    type : AUTH_USER,
    payload : request
  }
}

export function logoutUser() {
  const request = axios.get(`/api/users/logout`)
    .then(response => response.data)
  return {
    type : LOGOUT_USER,
    payload : request
  }
};