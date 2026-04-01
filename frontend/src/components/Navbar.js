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
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/search')}
              className="flex items-center space-x-3 text-[#d84e55] hover:text-[#c23e44] transition-colors group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#d84e55] to-[#c23e44] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-transform transform group-hover:scale-105">
                <span className="text-white font-extrabold text-xl font-montserrat">rB</span>
              </div>
              <span className="font-extrabold text-2xl text-gray-900 tracking-tight group-hover:text-[#d84e55] transition-colors">redBus</span>
            </button>
          </div>


          {/* Navigation Items */}
          <nav className="hidden lg:flex items-center space-x-2">
            <button
              onClick={() => navigate('/search')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                isActivePath('/search')
                  ? 'text-[#d84e55] bg-red-50 shadow-sm'
                  : 'text-gray-600 hover:text-[#d84e55] hover:bg-gray-50'
              }`}
            >
              <MagnifyingGlassIcon className={`h-5 w-5 ${isActivePath('/search') ? 'text-[#d84e55]' : ''}`} />
              <span>Search Buses</span>
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                isActivePath('/dashboard')
                  ? 'text-[#d84e55] bg-red-50 shadow-sm'
                  : 'text-gray-600 hover:text-[#d84e55] hover:bg-gray-50'
              }`}
            >
              <TicketIcon className={`h-5 w-5 ${isActivePath('/dashboard') ? 'text-[#d84e55]' : ''}`} />
              <span>My Bookings</span>
            </button>
            <button
              onClick={() => navigate('/tracking')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                isActivePath('/tracking')
                  ? 'text-[#d84e55] bg-red-50 shadow-sm'
                  : 'text-gray-600 hover:text-[#d84e55] hover:bg-gray-50'
              }`}
            >
              <MapPinIcon className={`h-5 w-5 ${isActivePath('/tracking') ? 'text-[#d84e55]' : ''}`} />
              <span>Track Bus</span>
            </button>
          </nav>


          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
                  <UserIcon className="h-5 w-5 text-gray-500" />
                  <span className="font-bold text-gray-800">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2.5 bg-gradient-to-r from-[#d84e55] to-[#c23e44] text-white rounded-xl hover:from-[#c23e44] hover:to-[#a3222a] transition-all font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Sign In / Register
              </button>
            )}
          </div>


          {/* Mobile Menu Button - simplified signin */}
          <div className="md:hidden">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-gradient-to-r from-[#d84e55] to-[#c23e44] text-white rounded-xl font-bold tracking-wide shadow-sm"
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
