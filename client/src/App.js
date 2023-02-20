import React , { Suspense }from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import VideoUploadPage from "./components/views/VideoUploadPgae/VideoUploadPage";
import VideoDetailPage from "./components/views/VideoDetailPage/VideoDetailPage";
import SubscribedPage from "./components/views/SubscribedPage/SubscribedPage";
import { CookiesProvider } from 'react-cookie';

import Auth from "./hoc/auth"
import Layout from "./Layouts/Layout";

function App() {
  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthVideoUploadPage = Auth(VideoUploadPage, true);
  const AuthVideoDetailPage = Auth(VideoDetailPage, null);
  const AuthSubscribedPage = Auth(SubscribedPage, true);


  return (
    // Routes 자식으로는 Route만 가능하고 element를 통해 컴포넌트를 줘야한다.
      <Suspense fallback={(<div>Loading...</div>)}>
      <div style={{ minHeight : 'calc(100vh - 80px)' }}>
        <CookiesProvider>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Layout />}>
                <Route exact path="/" element={<AuthLandingPage />} />
                <Route exact path="/login" element={<AuthLoginPage />} />
                <Route exact path="/register" element={<AuthRegisterPage />} />
                <Route exact path="/video/upload" element={<AuthVideoUploadPage />} />
                <Route exact path="/video/:videoId" element={<AuthVideoDetailPage />} />
                <Route exact path="/video/subscribed" element={<AuthSubscribedPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CookiesProvider>
      </div>
    </Suspense>
    
   
  );
}



export default App;
