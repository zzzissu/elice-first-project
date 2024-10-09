import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes> 
  );
};

export default App;
