import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import RatingPage from './pages/RatingPage';
import RoadSummaryPage from './pages/RoadSummaryPage';
import RatingDetailPage from './pages/RatingDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="rating" element={<RatingPage />} />
          <Route path="rating/:roadId/summary" element={<RoadSummaryPage />} />
          <Route path="rating/:roadId/detail/:pointId" element={<RatingDetailPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
