import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  UserGroupIcon,
  TruckIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';


const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBuses: 0,
    totalBookings: 0,
    totalRevenue: 0,
    monthlyGrowth: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const { user, logout } = useAuth();
  const navigate = useNavigate();


  // Generate mock data
  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalUsers: 1247,
        totalBuses: 45,
        totalBookings: 2834,
        totalRevenue: 156780,
        monthlyGrowth: 12.5
      });
     
      setRecentActivity([
        {
          id: 1,
          type: 'user',
          message: 'New user registered: John Doe',
          time: '10 minutes ago',
          icon: UserGroupIcon
        },
        {
          id: 2,
          type: 'booking',
          message: 'Booking confirmed: BK2024031501',
          time: '25 minutes ago',
          icon: CalendarIcon
        },
        {
          id: 3,
          type: 'bus',
          message: 'New bus added: Express Lines - BUS-1050',
          time: '1 hour ago',
          icon: TruckIcon
        },
        {
          id: 4,
          type: 'revenue',
          message: 'Revenue milestone: $150K reached',
          time: '2 hours ago',
          icon: ArrowTrendingUpIcon
        }
      ]);
     
      setLoading(false);
    }, 1000);
  }, []);


  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  const handleManageUsers = () => {
    navigate('/admin/users');
  };


  const handleManageBuses = () => {
    navigate('/admin/buses');
  };


  const handleViewBookings = () => {
    navigate('/admin/bookings');
  };


  const handleViewAnalytics = () => {
    navigate('/admin/analytics');
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
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
              <p className="text-gray-600">System administration and management</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">System Status:</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Operational</span>
            </div>
          </div>
        </div>


        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3">
                <UserGroupIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Users</div>
              </div>
            </div>
          </div>


          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3">
                <TruckIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stats.totalBuses}</div>
                <div className="text-sm text-gray-600">Total Buses</div>
              </div>
            </div>
          </div>


          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3">
                <CalendarIcon className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{stats.totalBookings.toLocaleString()}</div>
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
                <div className="text-2xl font-bold text-gray-900">${(stats.totalRevenue / 1000).toFixed(1)}K</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
            </div>
          </div>


          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="bg-indigo-100 rounded-full p-3">
                <ArrowTrendingUpIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">+{stats.monthlyGrowth}%</div>
                <div className="text-sm text-gray-600">Monthly Growth</div>
              </div>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className={`rounded-full p-2 ${
                          activity.type === 'user' ? 'bg-blue-100' :
                          activity.type === 'booking' ? 'bg-green-100' :
                          activity.type === 'bus' ? 'bg-purple-100' :
                          'bg-yellow-100'
                        }`}>
                          <Icon className={`h-5 w-5 ${
                            activity.type === 'user' ? 'text-blue-600' :
                            activity.type === 'booking' ? 'text-green-600' :
                            activity.type === 'bus' ? 'text-purple-600' :
                            'text-yellow-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>


          {/* Admin Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleManageUsers}
                  className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <UserGroupIcon className="h-5 w-5 text-gray-600 mr-3" />
                    <span className="font-medium text-gray-900">Manage Users</span>
                  </div>
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>


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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AdminDashboard;
