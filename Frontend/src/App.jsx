import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import FutureScope from './pages/FutureScope';
import Home from './pages/Home';
import Explore from './pages/Explore';
import ArtifactDetail from './pages/ArtifactDetail';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FutureScope />} />
        <Route path="/legacy-home" element={
          <MainLayout>
            <Home />
          </MainLayout>
        } />
        <Route path="/explore" element={<MainLayout><Explore /></MainLayout>} />
        <Route path="/artifact/:id" element={<MainLayout><ArtifactDetail /></MainLayout>} />
        <Route path="/admin" element={<MainLayout><AdminDashboard /></MainLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
