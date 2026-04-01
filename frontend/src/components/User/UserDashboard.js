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
      <div className="page-container flex-center">
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="page-container page-shell min-h-screen">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="flex items-center space-x-6">
            <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleNewBooking}
              className="btn btn-primary px-6 py-3 text-base font-semibold"
            >
              Book New Ticket
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-secondary px-6 py-3 text-base font-semibold"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>


      <div className="page-content py-8">
        {/* User Info Card */}
        <div className="card mb-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-6 p-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-full p-4 shadow-lg">
              <UserIcon className="h-12 w-12 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user?.name || 'Guest User'}</h2>
              <p className="text-gray-600 mt-1">{user?.email || 'guest@example.com'}</p>
            </div>
          </div>
         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 pt-0">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center">
                <TicketIcon className="h-10 w-10 text-blue-600 mr-4" />
                <div>
                  <div className="text-3xl font-bold text-blue-900">
                    {bookings.filter(b => b.status === 'upcoming').length}
                  </div>
                  <div className="text-base text-blue-700 font-medium mt-1">Upcoming Trips</div>
                </div>
              </div>
            </div>
           
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center">
                <CalendarIcon className="h-10 w-10 text-green-600 mr-4" />
                <div>
                  <div className="text-3xl font-bold text-green-900">
                    {bookings.filter(b => b.status === 'completed').length}
                  </div>
                  <div className="text-base text-green-700 font-medium mt-1">Completed Trips</div>
                </div>
              </div>
            </div>
           
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center">
                <ClockIcon className="h-10 w-10 text-gray-600 mr-4" />
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    {bookings.length}
                  </div>
                  <div className="text-base text-gray-700 font-medium mt-1">Total Bookings</div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Bookings Section */}
        <div className="card rounded-2xl shadow-lg border border-gray-100">
          {/* Tabs */}
          <div className="border-b border-gray-200 bg-gray-50">
            <nav className="flex -mb-px px-8">
              {['upcoming', 'completed', 'cancelled'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 text-sm font-semibold border-b-2 capitalize transition-all ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {tab} ({bookings.filter(b => b.status === tab).length})
                </button>
              ))}
            </nav>
          </div>


          {/* Bookings List */}
          <div className="p-8">
            {filteredBookings.length === 0 ? (
              <div className="empty-state py-12">
                <TicketIcon className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                <p className="text-xl font-semibold text-gray-700 mb-2">No {activeTab} bookings found.</p>
                <p className="text-gray-500 mb-6">
                  {activeTab === 'upcoming' ? 'Book your first ticket to get started' : 'No bookings in this category'}
                </p>
                {activeTab === 'upcoming' && (
                  <button
                    onClick={handleNewBooking}
                    className="btn btn-primary px-6 py-3 text-base font-semibold"
                  >
                    Book your first ticket
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredBookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all bg-white">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{booking.busOperator}</h3>
                            <p className="text-sm text-gray-500 mt-1">{booking.busNumber} • Booking ID: {booking.id}</p>
                          </div>
                          <span className={`status-badge px-4 py-2 text-sm font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                            {getStatusText(booking.status)}
                          </span>
                        </div>
                       
                        <div className="flex flex-wrap gap-6 mb-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPinIcon className="h-5 w-5 mr-2 text-gray-400" />
                            <span className="font-medium">{booking.source} → {booking.destination}</span>
                          </div>
                          <div className="flex items-center">
                            <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" />
                            <span className="font-medium">{booking.date}</span>
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="h-5 w-5 mr-2 text-gray-400" />
                            <span className="font-medium">{booking.departureTime} - {booking.arrivalTime}</span>
                          </div>
                        </div>
                       
                        <div className="flex flex-wrap gap-3">
                          <span className="text-sm font-semibold text-gray-600">Seats:</span>
                          {booking.seats.map((seat, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full"
                            >
                              {seat}
                            </span>
                          ))}
                        </div>
                      </div>
                     
                      <div className="mt-6 lg:mt-0 lg:ml-8 text-center lg:text-right">
                        <div className="text-2xl font-bold text-gray-900">${booking.totalPrice}</div>
                        <div className="text-sm text-gray-500 mb-4">Total Amount</div>
                        {booking.status === 'upcoming' && (
                          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end">
                            <button
                              onClick={() => handleTrackBooking(booking.id)}
                              className="text-blue-600 hover:text-blue-500 font-semibold text-sm flex items-center justify-center px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                              <TruckIcon className="h-4 w-4 mr-2" />
                              Track
                            </button>
                            <button className="text-blue-600 hover:text-blue-500 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
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
