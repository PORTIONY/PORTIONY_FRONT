import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css'; 

function App() {
  return (
    <div className="web-wrapper">
      <div className="web-container">
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
