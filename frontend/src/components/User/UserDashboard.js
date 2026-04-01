import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useBus } from '../../context/BusContext';
import { 
  TicketIcon, 
  UserIcon, 
  ArrowRightOnRectangleIcon,
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { user, logout } = useAuth();
  const { bookingDetails } = useBus();
  const navigate = useNavigate();

  // Generate mock booking data
  const generateMockBookings = () => {
    const mockBookings = [
      {
        id: 'BK2024031501',
        busOperator: 'Express Lines',
        busNumber: 'BUS-1001',
        source: 'New York',
        destination: 'Los Angeles',
        date: '2024-03-20',
        departureTime: '08:00',
        arrivalTime: '16:00',
        seats: ['1A', '1B'],
        totalPrice: 85,
        status: 'upcoming',
        bookingDate: '2024-03-15'
      },
      {
        id: 'BK2024031001',
        busOperator: 'Swift Transit',
        busNumber: 'BUS-2003',
        source: 'Chicago',
        destination: 'Houston',
        date: '2024-03-10',
        departureTime: '14:30',
        arrivalTime: '22:30',
        seats: ['5C'],
        totalPrice: 42,
        status: 'completed',
        bookingDate: '2024-03-08'
      },
      {
        id: 'BK2024030501',
        busOperator: 'Comfort Coaches',
        busNumber: 'BUS-3007',
        source: 'Boston',
        destination: 'Washington DC',
        date: '2024-03-05',
        departureTime: '09:15',
        arrivalTime: '13:45',
        seats: ['2D', '2E', '2F'],
        totalPrice: 96,
        status: 'cancelled',
        bookingDate: '2024-03-01'
      }
    ];

    // Add the latest booking if it exists
    if (bookingDetails) {
      mockBookings.unshift({
        ...bookingDetails,
        status: 'upcoming'
      });
    }

    return mockBookings;
  };

  useEffect(() => {
    // Simulate loading bookings
    setTimeout(() => {
      setBookings(generateMockBookings());
      setLoading(false);
    }, 1000);
  }, [bookingDetails]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleTrackBooking = (bookingId) => {
    navigate(`/tracking?bookingId=${bookingId}`);
  };

  const handleNewBooking = () => {
    navigate('/search');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming':
        return 'Upcoming';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'upcoming') return booking.status === 'upcoming';
    if (activeTab === 'completed') return booking.status === 'completed';
    if (activeTab === 'cancelled') return booking.status === 'cancelled';
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleNewBooking}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Book New Ticket
              </button>
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
        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 rounded-full p-3">
              <UserIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user?.name || 'Guest User'}</h2>
              <p className="text-gray-600">{user?.email || 'guest@example.com'}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center">
                <TicketIcon className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-blue-900">
                    {bookings.filter(b => b.status === 'upcoming').length}
                  </div>
                  <div className="text-sm text-blue-700">Upcoming Trips</div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center">
                <CalendarIcon className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-green-900">
                    {bookings.filter(b => b.status === 'completed').length}
                  </div>
                  <div className="text-sm text-green-700">Completed Trips</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center">
                <ClockIcon className="h-8 w-8 text-gray-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {bookings.length}
                  </div>
                  <div className="text-sm text-gray-700">Total Bookings</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['upcoming', 'completed', 'cancelled'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 text-sm font-medium border-b-2 capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab} ({bookings.filter(b => b.status === tab).length})
                </button>
              ))}
            </nav>
          </div>

          {/* Bookings List */}
          <div className="p-6">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-8">
                <TicketIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No {activeTab} bookings found.</p>
                {activeTab === 'upcoming' && (
                  <button
                    onClick={handleNewBooking}
                    className="mt-4 text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Book your first ticket
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{booking.busOperator}</h3>
                            <p className="text-sm text-gray-500">{booking.busNumber} • Booking ID: {booking.id}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {getStatusText(booking.status)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-6 mb-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            {booking.source} → {booking.destination}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {booking.date}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {booking.departureTime} - {booking.arrivalTime}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <span className="text-sm text-gray-600">Seats:</span>
                          {booking.seats.map((seat, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                            >
                              {seat}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4 lg:mt-0 lg:ml-6 text-center lg:text-right">
                        <div className="text-lg font-bold text-gray-900">${booking.totalPrice}</div>
                        <div className="text-sm text-gray-500 mb-2">Total Amount</div>
                        {booking.status === 'upcoming' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleTrackBooking(booking.id)}
                              className="text-blue-600 hover:text-blue-500 text-sm font-medium flex items-center"
                            >
                              <TruckIcon className="h-4 w-4 mr-1" />
                              Track
                            </button>
                            <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                              View Details
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
