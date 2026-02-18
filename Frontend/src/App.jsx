import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import ArtifactDetail from './pages/ArtifactDetail';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/categories" element={<Explore />} />
          <Route path="/artifact/:id" element={<ArtifactDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about" element={<div className="pt-32 pb-20 text-center font-display text-4xl font-bold">About Coming Soon</div>} />
          <Route path="/login" element={<div className="pt-32 pb-20 text-center font-display text-4xl font-bold">Login Coming Soon</div>} />
          <Route path="/register" element={<div className="pt-32 pb-20 text-center font-display text-4xl font-bold">Register Coming Soon</div>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;



