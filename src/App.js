import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './features/Auth/Login';
import Home from './features/Main/Home'; // 예시 홈 페이지
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="web-wrapper">
      <div className="web-container">
        <BrowserRouter>
          <Header />
          <Routes>
            {/* 로그인 안 한 상태면 무조건 로그인 페이지로 이동 */}
            {!isLoggedIn ? (
              <>
                <Route path="*" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Navigate to="/" />} />
               
              </>
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
