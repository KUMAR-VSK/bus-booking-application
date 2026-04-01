import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  MagnifyingGlassIcon, 
  TicketIcon, 
  UserIcon,
  ArrowRightOnRectangleIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/search')}
              className="flex items-center space-x-3 text-blue-600 hover:text-blue-700 transition-colors group"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-white font-bold text-lg">TB</span>
              </div>
              <span className="font-bold text-2xl text-gray-900 group-hover:text-blue-700 transition-colors">TamilBus</span>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center space-x-2">
            <button
              onClick={() => navigate('/search')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActivePath('/search')
                  ? 'text-blue-600 bg-blue-50 shadow-sm'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
              <span>Search Buses</span>
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActivePath('/dashboard')
                  ? 'text-blue-600 bg-blue-50 shadow-sm'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <TicketIcon className="h-5 w-5" />
              <span>My Bookings</span>
            </button>
            <button
              onClick={() => navigate('/tracking')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActivePath('/tracking')
                  ? 'text-blue-600 bg-blue-50 shadow-sm'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <MapPinIcon className="h-5 w-5" />
              <span>Track Bus</span>
            </button>
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-xl">
                  <UserIcon className="h-5 w-5 text-gray-600" />
                  <span className="font-semibold text-gray-900">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold shadow-md hover:shadow-lg"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold text-sm"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
