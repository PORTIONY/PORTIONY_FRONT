import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './features/Auth/Login';
import Signup from './features/Auth/Signup';
import Home from './features/Main/Home';
import MyPage from './features/MyPage/MyPage'; 
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // // ✅ 테스트용으로 로그인 상태 강제로 true로 만들기
  // useEffect(() => {
  //   setIsLoggedIn(true);
  // }, []);

  return (
    <div className="web-wrapper">
      <div className="web-container">
        <BrowserRouter>
          <Header />
          <Routes>
            {!isLoggedIn ? (
              <>
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/login" element={<Navigate to="/" />} />
                <Route path="/signup" element={<Navigate to="/" />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
