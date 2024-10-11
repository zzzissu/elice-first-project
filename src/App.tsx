import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CombinePage from './pages/CombinePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/sign" element={<SignUpPage />} />
      <Route path="/CombinePage/*" element={<CombinePage />} />
    </Routes>
  );
};

export default App;
