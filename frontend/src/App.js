import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BusProvider } from './context/BusContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import BusSearch from './pages/BusSearch';
import BusList from './components/BusList';
import SeatSelection from './pages/SeatSelection';
import BookingConfirmation from './pages/BookingConfirmation';
import Payment from './pages/Payment';
import TrackingProgress from './pages/TrackingProgress';
import BusManagement from './pages/BusManagement';
import AdminAnalytics from './pages/AdminAnalytics';
import UserDashboard from './components/User/UserDashboard';
import BusManagerDashboard from './components/BusManager/BusManagerDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <BusProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              
              {/* User Routes */}
              <Route path="/search" element={<BusSearch />} />
              <Route path="/buses" element={<BusList />} />
              <Route path="/seat-selection" element={<SeatSelection />} />
              <Route path="/booking-confirmation" element={<BookingConfirmation />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/tracking" element={<TrackingProgress />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              
              {/* Bus Manager Routes */}
              <Route path="/manager/dashboard" element={<BusManagerDashboard />} />
              <Route path="/manager/buses" element={<BusManagement />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </Router>
      </BusProvider>
    </AuthProvider>
  );
}

export default App;
