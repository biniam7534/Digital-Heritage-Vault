import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Placeholder routes for future expansion */}
          <Route path="/explorer" element={<div className="pt-32 pb-20 text-center font-display text-4xl font-bold">Explorer Coming Soon</div>} />
          <Route path="/collections" element={<div className="pt-32 pb-20 text-center font-display text-4xl font-bold">Collections Coming Soon</div>} />
          <Route path="/about" element={<div className="pt-32 pb-20 text-center font-display text-4xl font-bold">About Coming Soon</div>} />
          <Route path="/submit" element={<div className="pt-32 pb-20 text-center font-display text-4xl font-bold">Submission Vault Coming Soon</div>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
