import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RatingPage from './pages/RatingPage';
import UserManagementPage from './pages/UserManagementPage';
import NotificationPage from './pages/NotificationPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RatingPage />} />
      <Route path="/user-management" element={<UserManagementPage />} />
      <Route path="/notification" element={<NotificationPage />} />
    </Routes>
  );
}

export default App;
