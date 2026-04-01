import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  TruckIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  PlusIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';


const BusManagerDashboard = () => {
  const [stats, setStats] = useState({
    totalBuses: 0,
    activeBuses: 0,
    totalBookings: 0,
    todayRevenue: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const { user, logout } = useAuth();
  const navigate = useNavigate();


  // Generate mock data
  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalBuses: 12,
        activeBuses: 8,
        totalBookings: 156,
        todayRevenue: 3240
      });
     
      setRecentBookings([
        {
          id: 'BK2024031501',
          customerName: 'John Doe',
          busNumber: 'BUS-1001',
          route: 'NYC → LA',
          seats: ['1A', '1B'],
          amount: 85,
          status: 'confirmed',
          time: '2 hours ago'
        },
        {
          id: 'BK2024031502',
          customerName: 'Jane Smith',
          busNumber: 'BUS-2003',
          route: 'Chicago → Houston',
          seats: ['5C'],
          amount: 42,
          status: 'pending',
          time: '3 hours ago'
        },
        {
          id: 'BK2024031503',
          customerName: 'Bob Johnson',
          busNumber: 'BUS-3007',
          route: 'Boston → DC',
          seats: ['2D', '2E'],
          amount: 64,
          status: 'confirmed',
          time: '5 hours ago'
        }
      ]);
     
      setLoading(false);
    }, 1000);
  }, []);


  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  const handleAddBus = () => {
    navigate('/manager/add-bus');
  };


  const handleManageBuses = () => {
    navigate('/manager/buses');
  };


  const handleViewBookings = () => {
    navigate('/manager/bookings');
  };


  const handleViewAnalytics = () => {
    navigate('/manager/analytics');
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 page-shell">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Bus Manager Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Welcome back, {user?.name}!</h2>
              <p className="text-gray-600">Manage your buses and track bookings efficiently</p>
            </div>
            <button
              onClick={handleAddBus}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add New Bus
            </button>
          </div>
        </div>


        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3">
                <TruckIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stats.totalBuses}</div>
                <div className="text-sm text-gray-600">Total Buses</div>
              </div>
            </div>
          </div>


          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3">
                <ClockIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stats.activeBuses}</div>
                <div className="text-sm text-gray-600">Active Buses</div>
              </div>
            </div>
          </div>


          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3">
                <CalendarIcon className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stats.totalBookings}</div>
                <div className="text-sm text-gray-600">Total Bookings</div>
              </div>
            </div>
          </div>


          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-full p-3">
                <CurrencyDollarIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">${stats.todayRevenue}</div>
                <div className="text-sm text-gray-600">Today's Revenue</div>
              </div>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
                  <button
                    onClick={handleViewBookings}
                    className="text-blue-600 hover:text-blue-500 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{booking.customerName}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {booking.busNumber} • {booking.route} • {booking.seats.join(', ')}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{booking.time}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">${booking.amount}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>


          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleManageBuses}
                  className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <TruckIcon className="h-5 w-5 text-gray-600 mr-3" />
                    <span className="font-medium text-gray-900">Manage Buses</span>
                  </div>
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>


                <button
                  onClick={handleViewBookings}
                  className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 text-gray-600 mr-3" />
                    <span className="font-medium text-gray-900">View Bookings</span>
                  </div>
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>


                <button
                  onClick={handleViewAnalytics}
                  className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <ChartBarIcon className="h-5 w-5 text-gray-600 mr-3" />
                    <span className="font-medium text-gray-900">Analytics</span>
                  </div>
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>


                <button
                  onClick={handleAddBus}
                  className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <PlusIcon className="h-5 w-5 text-gray-600 mr-3" />
                    <span className="font-medium text-gray-900">Add New Bus</span>
                  </div>
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default BusManagerDashboard;

