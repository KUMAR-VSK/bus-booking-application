import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBus } from '../context/BusContext';
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline';

const SeatSelection = () => {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { selectedBus, selectedSeats, toggleSeat } = useBus();
  const navigate = useNavigate();

  // Generate mock seat layout
  const generateSeatLayout = () => {
    const seatLayout = [];
    const totalRows = 10;
    const seatsPerRow = 8;
    
    for (let row = 1; row <= totalRows; row++) {
      for (let col = 1; col <= seatsPerRow; col++) {
        const seatNumber = `${row}${String.fromCharCode(64 + col)}`;
        const isBooked = Math.random() < 0.3; // 30% chance of being booked
        const isVIP = row <= 2; // First 2 rows are VIP
        
        seatLayout.push({
          number: seatNumber,
          row: row,
          column: col,
          isBooked: isBooked,
          isVIP: isVIP,
          price: isVIP ? 15 : 10
        });
      }
    }
    
    return seatLayout;
  };

  useEffect(() => {
    if (!selectedBus) {
      navigate('/buses');
      return;
    }
    
    // Simulate loading seat layout
    setTimeout(() => {
      setSeats(generateSeatLayout());
      setLoading(false);
    }, 1000);
  }, [selectedBus, navigate]);

  const handleSeatClick = (seat) => {
    if (seat.isBooked) return;
    
    toggleSeat(seat.number);
  };

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seatNumber) => {
      const seat = seats.find(s => s.number === seatNumber);
      return total + (seat ? seat.price : 0);
    }, 0);
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      setError('Please select at least one seat');
      return;
    }
    
    setError('');
    navigate('/booking-confirmation');
  };

  const handleBack = () => {
    navigate('/buses');
  };

  const getSeatClass = (seat) => {
    if (seat.isBooked) return 'seat booked';
    if (selectedSeats.includes(seat.number)) return 'seat selected';
    if (seat.isVIP) return 'seat vip available';
    return 'seat available';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading seat layout...</p>
        </div>
      </div>
    );
  }

  if (!selectedBus) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-1" />
                Back
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Select Seats</h1>
                <p className="text-gray-600">
                  {selectedBus.operator} • {selectedBus.busNumber}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Seat Layout */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Bus Front Indicator */}
              <div className="mb-6">
                <div className="bg-gray-200 rounded-t-lg p-4 text-center">
                  <div className="text-sm font-medium text-gray-600">FRONT</div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mb-6 justify-center">
                <div className="flex items-center">
                  <div className="seat available w-6 h-6 mr-2"></div>
                  <span className="text-sm text-gray-600">Available</span>
                </div>
                <div className="flex items-center">
                  <div className="seat selected w-6 h-6 mr-2"></div>
                  <span className="text-sm text-gray-600">Selected</span>
                </div>
                <div className="flex items-center">
                  <div className="seat booked w-6 h-6 mr-2"></div>
                  <span className="text-sm text-gray-600">Booked</span>
                </div>
                <div className="flex items-center">
                  <div className="seat vip available w-6 h-6 mr-2"></div>
                  <span className="text-sm text-gray-600">VIP</span>
                </div>
              </div>

              {/* Seat Grid */}
              <div className="seat-grid">
                {seats.map((seat) => (
                  <button
                    key={seat.number}
                    onClick={() => handleSeatClick(seat)}
                    disabled={seat.isBooked}
                    className={getSeatClass(seat)}
                    title={`Seat ${seat.number} ${seat.isVIP ? '(VIP)' : ''} - $${seat.price}`}
                  >
                    {seat.number}
                  </button>
                ))}
              </div>

              {/* Aisle Indicator */}
              <div className="mt-4 text-center text-sm text-gray-500">
                Aisle runs between columns 4 and 5
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
              
              {/* Bus Details */}
              <div className="border-b pb-4 mb-4">
                <div className="text-sm text-gray-600 mb-1">Operator</div>
                <div className="font-medium">{selectedBus.operator}</div>
                
                <div className="text-sm text-gray-600 mb-1 mt-2">Bus Type</div>
                <div className="font-medium">{selectedBus.type}</div>
                
                <div className="text-sm text-gray-600 mb-1 mt-2">Departure</div>
                <div className="font-medium">{selectedBus.departureTime}</div>
                
                <div className="text-sm text-gray-600 mb-1 mt-2">Arrival</div>
                <div className="font-medium">{selectedBus.arrivalTime}</div>
              </div>

              {/* Selected Seats */}
              <div className="border-b pb-4 mb-4">
                <div className="text-sm text-gray-600 mb-2">Selected Seats ({selectedSeats.length})</div>
                {selectedSeats.length === 0 ? (
                  <div className="text-gray-500 text-sm">No seats selected</div>
                ) : (
                  <div className="space-y-1">
                    {selectedSeats.map(seatNumber => {
                      const seat = seats.find(s => s.number === seatNumber);
                      return (
                        <div key={seatNumber} className="flex justify-between text-sm">
                          <span>Seat {seatNumber} {seat?.isVIP && '(VIP)'}</span>
                          <span>${seat?.price || 10}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base Price</span>
                  <span>${selectedSeats.length * 10}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">VIP Charges</span>
                  <span>
                    ${selectedSeats.reduce((total, seatNumber) => {
                      const seat = seats.find(s => s.number === seatNumber);
                      return total + (seat?.isVIP ? 5 : 0);
                    }, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Fee</span>
                  <span>$2</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${calculateTotalPrice() + (selectedSeats.length > 0 ? 2 : 0)}</span>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded text-sm mb-4">
                  {error}
                </div>
              )}

              <button
                onClick={handleProceed}
                disabled={selectedSeats.length === 0}
                className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                  selectedSeats.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
