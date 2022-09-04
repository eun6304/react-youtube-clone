import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth"

function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);

  return (
    // Routes 자식으로는 Route만 가능하고 element를 통해 컴포넌트를 줘야한다.
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<AuthLandingPage />} />
          <Route exact path="/login" element={<AuthLoginPage />} />
          <Route exact path="/register" element={<AuthRegisterPage />} />
        </Routes>
    </BrowserRouter>
  );
}



export default App;
