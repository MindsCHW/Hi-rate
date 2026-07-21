import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RatingPage from './pages/RatingPage';
import UserManagementPage from './pages/UserManagementPage';
import NotificationPage from './pages/NotificationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RatingPage />} />
        <Route path="/user-management" element={<UserManagementPage />} />
        <Route path="/notification" element={<NotificationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
