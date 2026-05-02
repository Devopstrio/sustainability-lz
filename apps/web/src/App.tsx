import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import SustainabilityDashboard from './pages/SustainabilityDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400 max-w-md mx-auto">The sustainability intelligence engine is currently computing lifecycle carbon footprints and optimizing landing zone resource placement. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<SustainabilityDashboard />} />
          <Route path="/carbon" element={<Placeholder name="Carbon Intelligence Engine" />} />
          <Route path="/compute" element={<Placeholder name="Compute Optimization Hub" />} />
          <Route path="/storage" element={<Placeholder name="Storage Lifecycle & Efficiency" />} />
          <Route path="/networking" element={<Placeholder name="Green Networking & Data Transfer" />} />
          <Route path="/governance" element={<Placeholder name="Landing Zone Policy Enforcement" />} />
          <Route path="/resources" element={<Placeholder name="Sustainability Resource Explorer" />} />
          <Route path="/reports" element={<Placeholder name="ESG & Compliance Reporting" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
