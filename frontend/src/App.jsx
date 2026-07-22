import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import RatingPage from './pages/RatingPage';
import RatingDetailPage from './pages/RatingDetailPage';
import RoadSummaryPage from './pages/RoadSummaryPage';
import NotificationPage from './pages/NotificationPage';
import RolePermissionPage from './pages/RolePermissionPage';
import UserManagementPage from './pages/UserManagementPage';
import ClonePage from './pages/ClonePage';

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/" element={<RatingPage />} />
      <Route path="/rating/:roadId" element={<RoadSummaryPage />} />
      <Route path="/rating/:roadId/summary" element={<RoadSummaryPage />} />
      <Route path="/rating/:roadId/detail/:pointId" element={<RatingDetailPage />} />
      <Route path="/notification" element={<NotificationPage />} />
      <Route path="/role" element={<RolePermissionPage />} />
      <Route path="/user-management" element={<UserManagementPage />} />
      <Route path="/clone" element={<ClonePage />} />
    </Routes>
  );
}

export default App;
