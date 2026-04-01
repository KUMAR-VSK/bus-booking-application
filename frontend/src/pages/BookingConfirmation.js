import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBus } from '../context/BusContext';
import { useAuth } from '../context/AuthContext';
import { CheckCircleIcon, ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline';

const BookingConfirmation = () => {
  const [loading, setLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');
  
  const { selectedBus, selectedSeats, searchCriteria, setBooking } = useBus();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedBus || selectedSeats.length === 0) {
      navigate('/buses');
      return;
    }
  }, [selectedBus, selectedSeats, navigate]);

  const calculateTotalPrice = () => {
    const basePrice = selectedSeats.length * 10;
    const vipCharges = selectedSeats.length * 5; // Simplified VIP calculation
    const serviceFee = selectedSeats.length > 0 ? 2 : 0;
    return basePrice + vipCharges + serviceFee;
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    
    // Simulate booking API call
    setTimeout(() => {
      const newBookingId = 'BK' + Date.now().toString().slice(-8);
      setBookingId(newBookingId);
      
      const bookingData = {
        id: newBookingId,
        user: user,
        bus: selectedBus,
        seats: selectedSeats,
        searchCriteria: searchCriteria,
        totalPrice: calculateTotalPrice(),
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
      };
      
      setBooking(bookingData);
      setBookingConfirmed(true);
      setLoading(false);
    }, 2000);
  };

  const handleBackToSearch = () => {
    navigate('/search');
  };

  const handleViewDashboard = () => {
    navigate('/dashboard');
  };

  if (!selectedBus || selectedSeats.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!bookingConfirmed ? (
          <>
            {/* Header */}
            <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigate('/seat-selection')}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeftIcon className="h-5 w-5 mr-1" />
                    Back
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Booking Confirmation</h1>
                    <p className="text-gray-600">Review your booking details</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Journey Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Passenger Information */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Passenger Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <div className="text-gray-900">{user?.name || 'Guest User'}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="text-gray-900">{user?.email || 'guest@example.com'}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <div className="text-gray-900">+1 (555) 123-4567</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Number of Passengers</label>
                      <div className="text-gray-900">{selectedSeats.length}</div>
                    </div>
                  </div>
                </div>

                {/* Journey Details */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Journey Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <div className="text-sm text-gray-600">From</div>
                        <div className="font-semibold text-lg">{searchCriteria.source}</div>
                      </div>
                      <div className="text-gray-400">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">To</div>
                        <div className="font-semibold text-lg">{searchCriteria.destination}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Date</div>
                        <div className="font-medium">{searchCriteria.date}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Duration</div>
                        <div className="font-medium">{selectedBus.duration}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Departure</div>
                        <div className="font-medium">{selectedBus.departureTime}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Arrival</div>
                        <div className="font-medium">{selectedBus.arrivalTime}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bus & Seat Details */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Bus & Seat Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-gray-600">Operator</div>
                        <div className="font-medium">{selectedBus.operator}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Bus Type</div>
                        <div className="font-medium">{selectedBus.type}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600 mb-2">Selected Seats</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedSeats.map(seatNumber => (
                          <span
                            key={seatNumber}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                          >
                            {seatNumber}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Summary & Payment */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-6 sticky top-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Summary</h3>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Base Fare ({selectedSeats.length} seats)</span>
                      <span>${selectedSeats.length * 10}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">VIP Charges</span>
                      <span>${selectedSeats.length * 5}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Service Fee</span>
                      <span>$2</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${calculateTotalPrice()}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmBooking}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                  
                  <div className="mt-4 text-xs text-gray-500 text-center">
                    By confirming, you agree to our terms and conditions
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-green-50 px-6 py-8 text-center">
              <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-green-900 mb-2">Booking Confirmed!</h1>
              <p className="text-green-700">Your tickets have been successfully booked</p>
            </div>
            
            <div className="p-8">
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-600 mb-2">Booking ID</div>
                  <div className="text-2xl font-bold text-gray-900">{bookingId}</div>
                  <div className="text-sm text-gray-500 mt-1">Please save this for future reference</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <div className="text-gray-600 mb-1">Journey</div>
                    <div className="font-medium">
                      {searchCriteria.source} → {searchCriteria.destination}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Date</div>
                    <div className="font-medium">{searchCriteria.date}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Bus Operator</div>
                    <div className="font-medium">{selectedBus.operator}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Departure Time</div>
                    <div className="font-medium">{selectedBus.departureTime}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Seats</div>
                    <div className="font-medium">{selectedSeats.join(', ')}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Total Amount</div>
                    <div className="font-medium">${calculateTotalPrice()}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Please arrive at the boarding point 30 minutes before departure</li>
                  <li>• Carry a valid ID proof for verification</li>
                  <li>• Show your booking ID and ID proof at the boarding point</li>
                  <li>• Cancellation policy applies as per operator terms</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleViewDashboard}
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center justify-center"
                >
                  <HomeIcon className="h-5 w-5 mr-2" />
                  View Dashboard
                </button>
                <button
                  onClick={handleBackToSearch}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-md font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Book Another Ticket
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingConfirmation;
