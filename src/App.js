import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './features/Auth/Login';
import SignUp from './features/Auth/SignUp';
import Home from './features/Main/Home';
import MyPage from './features/MyPage/MyPage';
import Chat from './features/Chats/Chat';
import GroupBuyNew from './features/GroupBuy/GroupBuyNew';
import GroupBuyDetail from './features/GroupBuy/GroupBuyDetail';
import GroupBuyEdit from './features/GroupBuy/GroupBuyEdit';
import Community from './features/Community/Community';
import ChatTest from './features/Chats/ChatTest';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //테스트용 로그인 강제 true
  // useEffect(() => {
  //  setIsLoggedIn(true);
  // }, []);

  return (
    <div className="web-wrapper">
      <div className="web-container">
        <BrowserRouter>
          <Header isLoggedIn={isLoggedIn}/>
          <div className="scrollable-content">
            <Routes>
              {/* 회원/비회원 구분이 필요한 페이지 */}
              <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <SignUp />} />
              <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
              {/* 로그인 안 하면 메인 못 들어감 */}
              <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
              <Route path="/mypage" element={isLoggedIn ? <MyPage /> : <Navigate to="/login" />} />
              <Route path="/chat" element={isLoggedIn ? <Chat /> : <Navigate to="/login" />} />
              <Route path="/community" element={isLoggedIn ? <Community /> : <Navigate to="/login" />} />

              {/* 공구 상세/생성/채팅(로그인 여부 무관) */}
              <Route path="/chat" element={<Chat />} />
              <Route path="/group-buy/new" element={<GroupBuyNew />} />
              <Route path="/group-buy/:id" element={<GroupBuyDetail />} />
              <Route path="/group-buy/:id/edit" element={<GroupBuyEdit />} />

              {/* ✅ 테스트용 채팅 라우트 */}
              <Route path="/chat-test" element={<ChatTest />} />

              {/* 기타 잘못된 경로 */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
