import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  MapPinIcon, 
  ClockIcon, 
  PhoneIcon, 
  UserIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

const TrackingProgress = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const [booking, setBooking] = useState(null);
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState(bookingId || '');
  
  const navigate = useNavigate();

  // Generate mock tracking data
  useEffect(() => {
    if (bookingId) {
      setTimeout(() => {
        const mockBooking = {
          id: bookingId,
          customerName: 'John Doe',
          busOperator: 'Express Lines',
          busNumber: 'BUS-1001',
          source: 'New York',
          destination: 'Los Angeles',
          departureTime: '08:00',
          arrivalTime: '16:00',
          seats: ['1A', '1B'],
          status: 'in_transit',
          driverName: 'Michael Johnson',
          driverPhone: '+1 (555) 123-4567',
          currentLocation: 'Chicago, IL',
          progress: 65
        };

        const mockTracking = {
          currentLocation: {
            lat: 41.8781,
            lng: -87.6298,
            city: 'Chicago',
            state: 'IL',
            estimatedArrival: '2 hours 30 minutes'
          },
          milestones: [
            {
              id: 1,
              title: 'Bus Departed',
              location: 'New York Bus Terminal',
              time: '08:00 AM',
              status: 'completed',
              description: 'Bus departed on time from New York'
            },
            {
              id: 2,
              title: 'En Route - Pennsylvania',
              location: 'Harrisburg, PA',
              time: '10:30 AM',
              status: 'completed',
              description: 'Bus passed through Pennsylvania'
            },
            {
              id: 3,
              title: 'En Route - Ohio',
              location: 'Columbus, OH',
              time: '01:15 PM',
              status: 'completed',
              description: 'Bus crossed Ohio state line'
            },
            {
              id: 4,
              title: 'Current Location',
              location: 'Chicago, IL',
              time: '03:30 PM',
              status: 'current',
              description: 'Bus is currently in Chicago'
            },
            {
              id: 5,
              title: 'Estimated Arrival',
              location: 'Los Angeles Bus Terminal',
              time: '06:00 PM',
              status: 'pending',
              description: 'Estimated arrival at destination'
            }
          ],
          busDetails: {
            type: 'Luxury Coach',
            amenities: ['WiFi', 'AC', 'Charging Ports', 'Restroom', 'Entertainment'],
            speed: '65 mph',
            nextStop: 'Des Moines, IA'
          }
        };

        setBooking(mockBooking);
        setTrackingData(mockTracking);
        setLoading(false);
      }, 1500);
    } else {
      setLoading(false);
    }
  }, [bookingId]);

  const handleSearch = () => {
    if (searchId.trim()) {
      navigate(`/tracking?bookingId=${searchId}`);
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'current':
        return <TruckIcon className="h-5 w-5 text-blue-600 animate-pulse" />;
      case 'pending':
        return <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />;
      default:
        return <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'current':
        return 'text-blue-600';
      case 'pending':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Tracking your booking...</p>
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
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Track Your Journey</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        {!booking && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Enter Booking ID</h2>
            <div className="flex space-x-4">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter your booking ID (e.g., BK2024031501)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Track
              </button>
            </div>
          </div>
        )}

        {booking && trackingData && (
          <>
            {/* Booking Summary */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Booking Details</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {booking.id}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Route</div>
                  <div className="font-medium">{booking.source} → {booking.destination}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Bus Operator</div>
                  <div className="font-medium">{booking.busOperator}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Seat Numbers</div>
                  <div className="font-medium">{booking.seats.join(', ')}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Driver</div>
                  <div className="font-medium">{booking.driverName}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Live Tracking */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Tracking</h3>
                  
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Route Progress</span>
                      <span>{booking.progress}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${booking.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Current Location */}
                  <div className="bg-blue-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-blue-600 font-medium">Current Location</div>
                        <div className="text-lg font-semibold text-blue-900">
                          {trackingData.currentLocation.city}, {trackingData.currentLocation.state}
                        </div>
                        <div className="text-sm text-blue-700">
                          Estimated arrival: {trackingData.currentLocation.estimatedArrival}
                        </div>
                      </div>
                      <MapPinIcon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>

                  {/* Journey Milestones */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Journey Milestones</h4>
                    {trackingData.milestones.map((milestone, index) => (
                      <div key={milestone.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getStatusIcon(milestone.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className={`font-medium ${getStatusColor(milestone.status)}`}>
                              {milestone.title}
                            </h5>
                            <span className="text-sm text-gray-500">{milestone.time}</span>
                          </div>
                          <p className="text-sm text-gray-600">{milestone.location}</p>
                          <p className="text-xs text-gray-500 mt-1">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bus Information */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Bus Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-600">Bus Number</div>
                      <div className="font-medium">{booking.busNumber}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600">Bus Type</div>
                      <div className="font-medium">{trackingData.busDetails.type}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600">Current Speed</div>
                      <div className="font-medium">{trackingData.busDetails.speed}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600">Next Stop</div>
                      <div className="font-medium">{trackingData.busDetails.nextStop}</div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-600 mb-2">Amenities</div>
                      <div className="flex flex-wrap gap-2">
                        {trackingData.busDetails.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Driver Contact */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Driver Contact</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span>{booking.driverName}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span>{booking.driverPhone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrackingProgress;
