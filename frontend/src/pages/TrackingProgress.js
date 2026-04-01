import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  MapPinIcon,
  ClockIcon,
  PhoneIcon,
  UserIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  TruckIcon,
  WifiIcon,
  BoltIcon,
  CpuChipIcon,
  HomeIcon,
  SignalIcon
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
            estimatedArrival: '2 hours 30 minutes',
            weather: 'Partly Cloudy, 72°F'
          },
          milestones: [
            {
              id: 1,
              title: 'Bus Departed',
              location: 'New York Bus Terminal',
              time: '08:00 AM',
              status: 'completed',
              description: 'Bus departed on time from New York',
              distance: '0 miles'
            },
            {
              id: 2,
              title: 'En Route - Pennsylvania',
              location: 'Harrisburg, PA',
              time: '10:30 AM',
              status: 'completed',
              description: 'Bus passed through Pennsylvania',
              distance: '200 miles'
            },
            {
              id: 3,
              title: 'En Route - Ohio',
              location: 'Columbus, OH',
              time: '01:15 PM',
              status: 'completed',
              description: 'Bus crossed Ohio state line',
              distance: '500 miles'
            },
            {
              id: 4,
              title: 'Current Location',
              location: 'Chicago, IL',
              time: '03:30 PM',
              status: 'current',
              description: 'Bus is currently in Chicago',
              distance: '800 miles'
            },
            {
              id: 5,
              title: 'Estimated Arrival',
              location: 'Los Angeles Bus Terminal',
              time: '06:00 PM',
              status: 'pending',
              description: 'Estimated arrival at destination',
              distance: '2800 miles'
            }
          ],
          busDetails: {
            type: 'Luxury Coach',
            amenities: [
              { name: 'WiFi', icon: WifiIcon, available: true },
              { name: 'AC', icon: BoltIcon, available: true },
              { name: 'Charging Ports', icon: BoltIcon, available: true },
              { name: 'Entertainment', icon: CpuChipIcon, available: true },
              { name: 'Restroom', icon: HomeIcon, available: true }
            ],
            speed: '65 mph',
            nextStop: 'Des Moines, IA',
            nextStopDistance: '150 miles',
            nextStopETA: '45 minutes'
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
        return <CheckCircleIcon className="h-6 w-6 text-green-600" />;
      case 'current':
        return <div className="relative">
          <TruckIcon className="h-6 w-6 text-blue-600 animate-pulse" />
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-blue-600 rounded-full animate-ping"></div>
        </div>;
      case 'pending':
        return <div className="h-6 w-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
          <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
        </div>;
      default:
        return <div className="h-6 w-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
          <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
        </div>;
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
    <div className="min-h-screen bg-gray-50 page-shell" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif' }}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-md hover:bg-gray-100"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Track Your Journey</h1>
                <p className="text-sm text-gray-600">Real-time bus tracking and updates</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        {!booking && (
          <div className="card mb-6" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
            <h2 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Enter Booking ID</h2>
            <div className="flex space-x-4" style={{ display: 'flex', gap: '1rem' }}>
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter your booking ID (e.g., BK2024031501)"
                className="form-input flex-1"
                style={{ flex: 1 }}
              />
              <button
                onClick={handleSearch}
                className="btn btn-primary"
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  background: '#3b82f6',
                  color: 'white',
                  fontWeight: '500',
                  cursor: 'pointer',
                  border: 'none',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease-in-out'
                }}
              >
                Track
              </button>
            </div>
          </div>
        )}


        {booking && trackingData && (
          <>
            {/* Booking Summary */}
            <div className="card mb-6" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div className="flex items-center justify-between mb-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h2 className="text-lg font-semibold text-gray-900" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>Booking Details</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium" style={{ padding: '0.25rem 0.75rem', backgroundColor: '#dbeafe', color: '#1e40af', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '500' }}>
                  {booking.id}
                </span>
              </div>
             
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#6b7280' }}>Route</div>
                  <div className="font-medium" style={{ fontWeight: '500' }}>{booking.source} → {booking.destination}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#6b7280' }}>Bus Operator</div>
                  <div className="font-medium" style={{ fontWeight: '500' }}>{booking.busOperator}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#6b7280' }}>Seat Numbers</div>
                  <div className="font-medium" style={{ fontWeight: '500' }}>{booking.seats.join(', ')}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#6b7280' }}>Driver</div>
                  <div className="font-medium" style={{ fontWeight: '500' }}>{booking.driverName}</div>
                </div>
              </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {/* Live Tracking */}
              <div className="lg:col-span-2" style={{ gridColumn: 'span 2 / span 2' }}>
                <div className="card" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Live Tracking</h3>
                 
                  {/* Progress Bar */}
                  <div className="mb-6" style={{ marginBottom: '1.5rem' }}>
                    <div className="flex justify-between text-sm text-gray-600 mb-2" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                      <span>Route Progress</span>
                      <span className="font-medium" style={{ fontWeight: '500' }}>{booking.progress}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3" style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '0.375rem', height: '0.75rem' }}>
                      <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${booking.progress}%`, backgroundColor: '#3b82f6', height: '0.75rem', borderRadius: '0.375rem', transition: 'all 0.5s ease' }}
                      ></div>
                    </div>
                  </div>


                  {/* Current Location */}
                  <div className="bg-blue-50 rounded-lg p-4 mb-6" style={{ backgroundColor: '#eff6ff', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem' }}>
                    <div className="flex items-center justify-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div className="text-sm text-blue-600 font-medium mb-1" style={{ fontSize: '0.875rem', color: '#2563eb', fontWeight: '500', marginBottom: '0.25rem' }}>Current Location</div>
                        <div className="text-lg font-semibold text-blue-900 mb-1" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e3a8a', marginBottom: '0.25rem' }}>
                          {trackingData.currentLocation.city}, {trackingData.currentLocation.state}
                        </div>
                        <div className="text-sm text-blue-700 mb-1" style={{ fontSize: '0.875rem', color: '#1e40af', marginBottom: '0.25rem' }}>
                          Estimated arrival: {trackingData.currentLocation.estimatedArrival}
                        </div>
                        <div className="text-xs text-blue-600" style={{ fontSize: '0.75rem', color: '#2563eb' }}>
                          Weather: {trackingData.currentLocation.weather}
                        </div>
                      </div>
                      <div className="relative">
                        <MapPinIcon className="h-12 w-12 text-blue-600" style={{ width: '3rem', height: '3rem', color: '#2563eb' }} />
                        <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
                      </div>
                    </div>
                  </div>


                  {/* Journey Milestones */}
                  <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h4 className="font-medium text-gray-900" style={{ fontWeight: '500', color: '#111827' }}>Journey Milestones</h4>
                    {trackingData.milestones.map((milestone, index) => (
                      <div key={milestone.id} className="flex items-start space-x-3" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <div className="flex-shrink-0 mt-1">
                          {getStatusIcon(milestone.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h5 className={`font-medium ${getStatusColor(milestone.status)}`} style={{ fontWeight: '500' }}>
                              {milestone.title}
                            </h5>
                            <span className="text-sm text-gray-500" style={{ fontSize: '0.875rem', color: '#6b7280' }}>{milestone.time}</span>
                          </div>
                          <p className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#4b5563' }}>{milestone.location}</p>
                          <p className="text-xs text-gray-500 mt-1" style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>{milestone.description}</p>
                          {milestone.distance && (
                            <p className="text-xs text-gray-400 mt-1" style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>Distance: {milestone.distance}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>


              {/* Bus Information */}
              <div className="lg:col-span-1" style={{ gridColumn: 'span 1 / span 1' }}>
                <div className="card" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Bus Information</h3>
                 
                  <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#6b7280' }}>Bus Number</div>
                      <div className="font-medium" style={{ fontWeight: '500' }}>{booking.busNumber}</div>
                    </div>
                   
                    <div>
                      <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#6b7280' }}>Bus Type</div>
                      <div className="font-medium" style={{ fontWeight: '500' }}>{trackingData.busDetails.type}</div>
                    </div>
                   
                    <div>
                      <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#6b7280' }}>Current Speed</div>
                      <div className="font-medium flex items-center" style={{ fontWeight: '500', display: 'flex', alignItems: 'center' }}>
                        <SignalIcon className="h-4 w-4 mr-1 text-green-600" style={{ width: '1rem', height: '1rem', marginRight: '0.25rem', color: '#16a34a' }} />
                        {trackingData.busDetails.speed}
                      </div>
                    </div>
                   
                    <div>
                      <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#6b7280' }}>Next Stop</div>
                      <div className="font-medium" style={{ fontWeight: '500' }}>{trackingData.busDetails.nextStop}</div>
                      <div className="text-xs text-gray-500 mt-1" style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                        {trackingData.busDetails.nextStopDistance} • {trackingData.busDetails.nextStopETA}
                      </div>
                    </div>


                    <div>
                      <div className="text-sm text-gray-600 mb-3" style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.75rem' }}>Amenities</div>
                      <div className="grid grid-cols-2 gap-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                        {trackingData.busDetails.amenities.map((amenity, index) => {
                          const Icon = amenity.icon;
                          return (
                            <div
                              key={index}
                              className={`flex items-center space-x-2 p-2 rounded-lg text-xs ${
                                amenity.available
                                  ? 'bg-green-50 text-green-700'
                                  : 'bg-gray-100 text-gray-400'
                              }`}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem',
                                borderRadius: '0.5rem',
                                fontSize: '0.75rem',
                                backgroundColor: amenity.available ? '#f0fdf4' : '#f3f4f6',
                                color: amenity.available ? '#15803d' : '#9ca3af'
                              }}
                            >
                              <Icon className="h-4 w-4" style={{ width: '1rem', height: '1rem' }} />
                              <span>{amenity.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>


                  {/* Driver Contact */}
                  <div className="mt-6 pt-6 border-t border-gray-200" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
                    <h4 className="font-medium text-gray-900 mb-3" style={{ fontWeight: '500', color: '#111827', marginBottom: '0.75rem' }}>Driver Contact</h4>
                    <div className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div className="flex items-center text-sm" style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>
                        <UserIcon className="h-4 w-4 text-gray-400 mr-2" style={{ width: '1rem', height: '1rem', color: '#9ca3af', marginRight: '0.5rem' }} />
                        <span>{booking.driverName}</span>
                      </div>
                      <div className="flex items-center text-sm" style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>
                        <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" style={{ width: '1rem', height: '1rem', color: '#9ca3af', marginRight: '0.5rem' }} />
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





