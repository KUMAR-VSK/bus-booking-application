import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import BusSearch from './components/BusSearch';
import SeatSelection from './components/SeatSelection';
import UserDashboard from './components/User/UserDashboard';
import BusManagerDashboard from './components/BusManager/BusManagerDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
             
            {/* User Routes */}
            <Route path="/search" element={<BusSearch />} />
            <Route path="/bus-details/:busId" element={<SeatSelection />} />
            <Route path="/seat-selection/:busId" element={<SeatSelection />} />
            <Route path="/dashboard" element={<UserDashboard />} />
             
            {/* Bus Manager Routes */}
            <Route path="/manager/dashboard" element={<BusManagerDashboard />} />
             
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
             
            <Route path="/" element={<Navigate to="/search" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;





