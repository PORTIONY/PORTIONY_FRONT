import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage';
import GroupBuyNew from './pages/GroupBuyNew'
import GroupBuyDetail from './pages/GroupBuyDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="web-wrapper">
        <div className="web-container">
            <Header />
            <div className="scrollable-content">
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/group-buy/new" element={<GroupBuyNew />} />
                <Route path="/group-buy/:id" element={<GroupBuyDetail />} />
              </Routes>
            </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
