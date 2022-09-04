import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { createStore } from 'redux';
import Reducer from './_reducers'

// 다운받은 미들웨어를 스토어 생성할때 사용할 수 있게 세팅
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider // Provider : 리액트 앱에 store 를 손쉽게 연동 할 수 있도록 도와주는 컴포넌트
    store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__() // 구글 Redux Extension 사용하게 하는 옵션
    )}  
  >
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
