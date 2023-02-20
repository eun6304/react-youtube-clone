// Reducer
// (previousState, action) => nextState
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER
} from '../_actions/types'


export default function (state = {}, action) {
  // 각 타입마다 다른 조치 취하기
  // 현재 state는 비어있는 상태
  switch (action.type) {
    case LOGIN_USER:
      return {...state, serverRes: action.payload}
      break;

    case REGISTER_USER:
      return {...state, serverRes: action.payload}
      break;

    case AUTH_USER:
      return {...state, serverUserData: action.payload}
      break;
    
    case LOGOUT_USER:
      return {...state, serverUserData: action.payload}
      break;
  
    default:
      return state;
  }
}