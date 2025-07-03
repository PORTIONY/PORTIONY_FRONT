import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './features/Auth/Login';
import SignUp from './features/Auth/SignUp';
import Home from './features/Main/Home';
import MyPage from './features/MyPage/MyPage';
import Chat from './features/Chats/Chat';
import GroupBuyNew from './features/GroupBuyNew';
import GroupBuyDetail from './features/GroupBuyDetail';
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
          <div className="scrollable-content">
            <Routes>
              {/* 로그인 안 했을 때 라우팅 */}
              {!isLoggedIn ? (
                <>
                  <Route path="/signup" element={<SignUp />} />
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

              {/* 로그인 여부와 상관 없이 접근 가능한 라우트 */}
              <Route path="/chat" element={<Chat />} />

              {/* 공구 신규 생성, 상세 */}
              <Route path="/group-buy/new" element={<GroupBuyNew />} />
              <Route path="/group-buy/:id" element={<GroupBuyDetail />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
