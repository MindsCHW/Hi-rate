import React, { useState } from 'react';
import RatingPage from './pages/RatingPage';
import RolePermissionPage from './pages/RolePermissionPage';

function App() {
  const [activeTab, setActiveTab] = useState('Role');

  return (
    <>
      {activeTab === 'Rating' && <RatingPage activeTab={activeTab} setActiveTab={setActiveTab} />}
      {activeTab === 'Role' && <RolePermissionPage activeTab={activeTab} setActiveTab={setActiveTab} />}
      {/* Default to RatingPage if tab not found for now */}
      {activeTab !== 'Rating' && activeTab !== 'Role' && <RatingPage activeTab={activeTab} setActiveTab={setActiveTab} />}
    </>
  );
}

export default App;
