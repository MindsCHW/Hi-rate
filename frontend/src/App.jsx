import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RatingPage from './pages/RatingPage';
import RolePermissionPage from './pages/RolePermissionPage';
import RoadSummaryPage from './pages/RoadSummaryPage';
import RatingDetailPage from './pages/RatingDetailPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/rating" element={<RatingPage />} />
      <Route path="/role" element={<RolePermissionPage />} />
      <Route path="/rating/:roadId" element={<RoadSummaryPage />} />
      <Route path="/rating/:roadId/detail/:detailId" element={<RatingDetailPage />} />
    </Routes>
  );
}

export default App;
