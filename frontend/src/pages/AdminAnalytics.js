import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  ChartBarIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  BusIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    overview: {},
    bookings: [],
    revenue: [],
    busUtilization: [],
    topRoutes: []
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30days');
  
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const mockAnalytics = {
        overview: {
          totalRevenue: 156780,
          totalBookings: 2834,
          totalUsers: 1247,
          totalBuses: 45,
          revenueGrowth: 12.5,
          bookingGrowth: 8.3,
          userGrowth: 15.2,
          busUtilization: 78.5
        },
        bookings: [
          { date: '2024-03-01', bookings: 85, revenue: 4250 },
          { date: '2024-03-02', bookings: 92, revenue: 4600 },
          { date: '2024-03-03', bookings: 78, revenue: 3900 },
          { date: '2024-03-04', bookings: 103, revenue: 5150 },
          { date: '2024-03-05', bookings: 95, revenue: 4750 },
          { date: '2024-03-06', bookings: 88, revenue: 4400 },
          { date: '2024-03-07', bookings: 110, revenue: 5500 }
        ],
        revenue: [
          { month: 'Jan', revenue: 45000 },
          { month: 'Feb', revenue: 52000 },
          { month: 'Mar', revenue: 58000 }
        ],
        busUtilization: [
          { busNumber: 'BUS-1001', utilization: 92, route: 'NYC → LA' },
          { busNumber: 'BUS-2003', utilization: 85, route: 'Chicago → Houston' },
          { busNumber: 'BUS-3007', utilization: 78, route: 'Boston → DC' },
          { busNumber: 'BUS-4005', utilization: 71, route: 'Miami → Orlando' },
          { busNumber: 'BUS-5002', utilization: 68, route: 'Seattle → Portland' }
        ],
        topRoutes: [
          { route: 'New York → Los Angeles', bookings: 342, revenue: 17100 },
          { route: 'Chicago → Houston', bookings: 289, revenue: 14450 },
          { route: 'Boston → Washington DC', bookings: 267, revenue: 13350 },
          { route: 'Miami → Orlando', bookings: 234, revenue: 11700 },
          { route: 'Seattle → Portland', bookings: 198, revenue: 9900 }
        ]
      };
      
      setAnalytics(mockAnalytics);
      setLoading(false);
    }, 1500);
  }, [timeRange]);

  const handleBack = () => {
    navigate('/admin/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-1" />
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="1year">Last Year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${analytics.overview.totalRevenue.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{analytics.overview.revenueGrowth}%</span>
                </div>
              </div>
              <CurrencyDollarIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.totalBookings.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{analytics.overview.bookingGrowth}%</span>
                </div>
              </div>
              <CalendarIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.totalUsers.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{analytics.overview.userGrowth}%</span>
                </div>
              </div>
              <UserGroupIcon className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bus Utilization</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.overview.busUtilization}%</p>
                <div className="flex items-center mt-2">
                  <TrendingDownIcon className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600">-2.1%</span>
                </div>
              </div>
              <BusIcon className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Booking Trends */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Trends</h3>
            <div className="space-y-3">
              {analytics.bookings.map((booking, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{booking.date}</div>
                    <div className="text-xs text-gray-500">{booking.bookings} bookings</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">${booking.revenue}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
            <div className="space-y-3">
              {analytics.revenue.map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{month.month}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">${month.revenue.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bus Utilization */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bus Utilization</h3>
            <div className="space-y-3">
              {analytics.busUtilization.map((bus, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{bus.busNumber}</div>
                    <div className="text-xs text-gray-500">{bus.route}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${bus.utilization}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{bus.utilization}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Routes */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Routes</h3>
            <div className="space-y-3">
              {analytics.topRoutes.map((route, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{route.route}</div>
                    <div className="text-xs text-gray-500">{route.bookings} bookings</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">${route.revenue.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
