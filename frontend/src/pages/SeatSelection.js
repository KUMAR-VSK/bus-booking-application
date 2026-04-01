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
          price: isVIP ? 599 : 299 // INR pricing
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
      <div className="page-container flex-center">
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="text-gray-600">Loading seat layout...</p>
        </div>
      </div>
    );
  }

  if (!selectedBus) {
    return null;
  }

  return (
    <div className="page-container page-shell">
      <div className="page-content">
        {/* Header */}
        <div className="card mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="btn btn-secondary"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-1" />
                Back
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Select Your Seats</h1>
            </div>
            <div className="text-sm text-gray-600">
              {selectedBus.source} → {selectedBus.destination}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Selection */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">
                  {selectedBus.operator} - {selectedBus.busNumber}
                </h2>
                <p className="card-description">
                  {selectedBus.source} → {selectedBus.destination} • {selectedBus.departureTime} - {selectedBus.arrivalTime}
                </p>
              </div>

              {/* Legend */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Seat Legend</h3>
                <div className="flex flex-wrap gap-4">
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
              </div>

              {/* Seat Grid */}
              <div className="seat-grid">
                {seats.map((seat) => (
                  <button
                    key={seat.number}
                    onClick={() => handleSeatClick(seat)}
                    disabled={seat.isBooked}
                    className={getSeatClass(seat)}
                    title={`Seat ${seat.number} ${seat.isVIP ? '(VIP)' : ''} - ₹${seat.price}`}
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
            <div className="card sticky top-6">
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
                <div className="text-sm text-gray-600 mb-2">Selected Seats</div>
                {selectedSeats.length === 0 ? (
                  <p className="text-gray-500 text-sm">No seats selected</p>
                ) : (
                  <div className="space-y-1">
                    {selectedSeats.map((seat) => (
                      <div key={seat} className="flex justify-between text-sm">
                        <span>Seat {seat} {seats.find(s => s.number === seat)?.isVIP && '(VIP)'}</span>
                        <span>₹{seats.find(s => s.number === seat)?.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Base Price ({selectedSeats.length} seats)</span>
                  <span>₹{calculateTotalPrice()}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{calculateTotalPrice()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                    {error}
                  </div>
                )}
                <button
                  onClick={handleProceed}
                  disabled={selectedSeats.length === 0}
                  className={`btn btn-full ${
                    selectedSeats.length === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                >
                  Proceed to Payment
                </button>
                
                <button
                  onClick={() => navigate('/buses')}
                  className="btn btn-secondary btn-full"
                >
                  Back to Bus List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
