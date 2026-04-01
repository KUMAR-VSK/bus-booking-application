import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBus } from '../context/BusContext';
import { useAuth } from '../context/AuthContext';
import { CheckCircleIcon, ArrowLeftIcon, HomeIcon, XMarkIcon } from '@heroicons/react/24/outline';

const BookingConfirmation = () => {
  const [loading, setLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');
  
  const { selectedBus, selectedSeats, searchCriteria, setBooking, clearSelection } = useBus();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedBus || selectedSeats.length === 0) {
      navigate('/buses');
      return;
    }
  }, [selectedBus, selectedSeats, navigate]);

  const calculateTotalPrice = () => {
    const basePrice = selectedSeats.length * 299;
    const vipCharges = selectedSeats.length * 150; // Simplified VIP calculation
    const serviceFee = selectedSeats.length > 0 ? 50 : 0;
    return basePrice + vipCharges + serviceFee;
  };

  const handleProceedToPayment = () => {
    navigate('/payment');
  };

  const handleCancelBooking = () => {
    // Clear selected data and go back to search
    clearSelection();
    navigate('/search');
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
    <div className="page-container page-shell" style={{ minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif' }}>
      <div className="page-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {!bookingConfirmed ? (
          <>
            {/* Header */}
            <div className="card mb-6" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
              <div className="flex-between" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="flex items-center space-x-4" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button
                    onClick={() => navigate('/seat-selection')}
                    className="btn btn-secondary"
                    style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #d1d5db', background: '#f9fafb', color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" style={{ marginRight: '0.5rem' }} />
                    Back
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900" style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827', margin: '0 0 0.5rem 0' }}>Booking Confirmation</h1>
                    <p className="text-gray-600" style={{ color: '#6b7280', margin: '0' }}>Review your booking details</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {/* Journey Details */}
              <div className="lg:col-span-2 space-y-6" style={{ gridColumn: 'span 2 / span 2', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Passenger Information */}
                <div className="card" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Passenger Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label className="form-label">Name</label>
                      <div className="text-gray-900" style={{ color: '#111827', fontWeight: '500' }}>{user?.name || 'Guest User'}</div>
                    </div>
                    <div>
                      <label className="form-label">Email</label>
                      <div className="text-gray-900" style={{ color: '#111827', fontWeight: '500' }}>{user?.email || 'guest@example.com'}</div>
                    </div>
                    <div>
                      <label className="form-label">Phone</label>
                      <div className="text-gray-900" style={{ color: '#111827', fontWeight: '500' }}>+1 (555) 123-4567</div>
                    </div>
                    <div>
                      <label className="form-label">Number of Passengers</label>
                      <div className="text-gray-900" style={{ color: '#111827', fontWeight: '500' }}>{selectedSeats.length}</div>
                    </div>
                  </div>
                </div>

                {/* Journey Details */}
                <div className="card" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Journey Details</h3>
                  <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="flex justify-between items-center pb-4 border-b" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                      <div>
                        <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#6b7280' }}>From</div>
                        <div className="font-semibold text-lg" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>{searchCriteria.source}</div>
                      </div>
                      <div className="text-gray-400" style={{ color: '#9ca3af' }}>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#6b7280' }}>To</div>
                        <div className="font-semibold text-lg" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>{searchCriteria.destination}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                      <div>
                        <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#6b7280' }}>Date</div>
                        <div className="font-medium" style={{ fontWeight: '500' }}>{searchCriteria.date}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#6b7280' }}>Duration</div>
                        <div className="font-medium" style={{ fontWeight: '500' }}>{selectedBus.duration || '8 hours'}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#6b7280' }}>Departure</div>
                        <div className="font-medium" style={{ fontWeight: '500' }}>{selectedBus.departureTime}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#6b7280' }}>Arrival</div>
                        <div className="font-medium" style={{ fontWeight: '500' }}>{selectedBus.arrivalTime}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bus & Seat Details */}
                <div className="card" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem' }}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Bus & Seat Details</h3>
                  <div className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#6b7280' }}>Operator</div>
                        <div className="font-medium" style={{ fontWeight: '500' }}>{selectedBus.operator}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600" style={{ fontSize: '0.875rem', color: '#6b7280' }}>Bus Type</div>
                        <div className="font-medium" style={{ fontWeight: '500' }}>{selectedBus.type}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600 mb-2" style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Selected Seats</div>
                      <div className="flex flex-wrap gap-2" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {selectedSeats.map(seatNumber => (
                          <span
                            key={seatNumber}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                            style={{ padding: '0.25rem 0.75rem', backgroundColor: '#dbeafe', color: '#1e40af', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '500' }}
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
              <div className="lg:col-span-1" style={{ gridColumn: 'span 1 / span 1' }}>
                <div className="card sticky top-6" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '1.5rem', position: 'sticky', top: '1.5rem' }}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Price Summary</h3>
                  
                  <div className="space-y-2 mb-6" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <div className="flex justify-between text-sm" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <span className="text-gray-600" style={{ color: '#6b7280' }}>Base Fare ({selectedSeats.length} seats)</span>
                      <span>₹{selectedSeats.length * 299}</span>
                    </div>
                    <div className="flex justify-between text-sm" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <span className="text-gray-600" style={{ color: '#6b7280' }}>VIP Charges</span>
                      <span>₹{selectedSeats.length * 150}</span>
                    </div>
                    <div className="flex justify-between text-sm" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                      <span className="text-gray-600" style={{ color: '#6b7280' }}>Service Fee</span>
                      <span>₹50</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold text-lg" style={{ borderTop: '1px solid #e5e7eb', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '1.125rem' }}>
                      <span>Total</span>
                      <span>₹{calculateTotalPrice()}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleProceedToPayment}
                      className="btn btn-primary btn-full"
                      style={{ 
                        width: '100%', 
                        padding: '0.875rem 1.5rem', 
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
                      Proceed to Payment
                    </button>
                    
                    <button
                      onClick={handleCancelBooking}
                      className="btn btn-secondary btn-full"
                      style={{ 
                        width: '100%', 
                        padding: '0.875rem 1.5rem', 
                        borderRadius: '8px', 
                        background: '#f3f4f6', 
                        color: '#dc2626', 
                        fontWeight: '500', 
                        cursor: 'pointer',
                        border: '1px solid #d1d5db',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s ease-in-out'
                      }}
                    >
                      <XMarkIcon className="h-5 w-5 mr-2" style={{ marginRight: '0.5rem' }} />
                      Cancel Booking
                    </button>
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-500 text-center" style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#6b7280', textAlign: 'center' }}>
                    By confirming, you agree to our terms and conditions
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="card" style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
            <div className="bg-green-50 px-6 py-8 text-center" style={{ backgroundColor: '#f0fdf4', padding: '2rem', textAlign: 'center' }}>
              <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto mb-4" style={{ width: '4rem', height: '4rem', color: '#16a34a', margin: '0 auto 1rem auto' }} />
              <h1 className="text-3xl font-bold text-green-900 mb-2" style={{ fontSize: '1.875rem', fontWeight: '700', color: '#14532d', marginBottom: '0.5rem' }}>Booking Confirmed!</h1>
              <p className="text-green-700" style={{ color: '#15803d' }}>Your tickets have been successfully booked</p>
            </div>
            
            <div className="p-8" style={{ padding: '2rem' }}>
              <div className="bg-gray-50 rounded-lg p-6 mb-6" style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="text-center mb-6" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div className="text-sm text-gray-600 mb-2" style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Booking ID</div>
                  <div className="text-2xl font-bold text-gray-900" style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>{bookingId}</div>
                  <div className="text-sm text-gray-500 mt-1" style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Please save this for future reference</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', fontSize: '0.875rem' }}>
                  <div>
                    <div className="text-gray-600 mb-1" style={{ color: '#6b7280', marginBottom: '0.25rem' }}>Journey</div>
                    <div className="font-medium" style={{ fontWeight: '500' }}>
                      {searchCriteria.source} → {searchCriteria.destination}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1" style={{ color: '#6b7280', marginBottom: '0.25rem' }}>Date</div>
                    <div className="font-medium" style={{ fontWeight: '500' }}>{searchCriteria.date}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1" style={{ color: '#6b7280', marginBottom: '0.25rem' }}>Bus Operator</div>
                    <div className="font-medium" style={{ fontWeight: '500' }}>{selectedBus.operator}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1" style={{ color: '#6b7280', marginBottom: '0.25rem' }}>Departure Time</div>
                    <div className="font-medium" style={{ fontWeight: '500' }}>{selectedBus.departureTime}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1" style={{ color: '#6b7280', marginBottom: '0.25rem' }}>Seats</div>
                    <div className="font-medium" style={{ fontWeight: '500' }}>{selectedSeats.join(', ')}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1" style={{ color: '#6b7280', marginBottom: '0.25rem' }}>Total Amount</div>
                    <div className="font-medium text-green-600" style={{ fontWeight: '500', color: '#16a34a' }}>₹{calculateTotalPrice()}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6" style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
                <h3 className="font-semibold text-blue-900 mb-2" style={{ fontWeight: '600', color: '#1e3a8a', marginBottom: '0.5rem' }}>Important Information</h3>
                <ul className="text-sm text-blue-800 space-y-1" style={{ fontSize: '0.875rem', color: '#1e40af', listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '0.25rem' }}>• Please arrive at the boarding point 30 minutes before departure</li>
                  <li style={{ marginBottom: '0.25rem' }}>• Carry a valid ID proof for verification</li>
                  <li style={{ marginBottom: '0.25rem' }}>• Show your booking ID and ID proof at the boarding point</li>
                  <li style={{ marginBottom: '0.25rem' }}>• Cancellation policy applies as per operator terms</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button
                  onClick={handleViewDashboard}
                  className="btn btn-primary"
                  style={{ 
                    padding: '0.875rem 1.5rem', 
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
                  <HomeIcon className="h-5 w-5 mr-2" style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                  View Dashboard
                </button>
                <button
                  onClick={handleBackToSearch}
                  className="btn btn-secondary"
                  style={{ 
                    padding: '0.875rem 1.5rem', 
                    borderRadius: '8px', 
                    background: '#f3f4f6', 
                    color: '#374151', 
                    fontWeight: '500', 
                    cursor: 'pointer',
                    border: '1px solid #d1d5db',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease-in-out'
                  }}
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
