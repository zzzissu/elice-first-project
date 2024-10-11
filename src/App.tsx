import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import CombinePage from './pages/CombinePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/CombinePage/*" element={<CombinePage />} />
    </Routes>
  );
};

export default App;
