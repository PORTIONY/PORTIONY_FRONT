import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './features/Auth/Login';
import SignUp from './features/Auth/SignUp';
import Home from './features/Main/Home'; 
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="web-wrapper">
      <div className="web-container">
        <BrowserRouter>
          <Header />
          <Routes>
            {!isLoggedIn ? (
              <>
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Navigate to="/" />} />
                <Route path="/signup" element={<Navigate to="/" />} />
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