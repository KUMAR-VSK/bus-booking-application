import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { busApi, bookingWorkflowApi } from '../api/busApi';
import { useAuth } from '../context/AuthContext';
import './SeatSelection.css';

const SeatSelection = () => {
  const { busId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [busDetails, setBusDetails] = useState(null);
  const [seatLayout, setSeatLayout] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [heldSeats, setHeldSeats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [holding, setHolding] = useState(false);
  
  const travelDate = new URLSearchParams(window.location.search).get('date');

  useEffect(() => {
    if (!busId || !travelDate) {
      setError('Invalid bus or date selection');
      return;
    }
    
    fetchBusDetails();
    fetchSeatLayout();
  }, [busId, travelDate]);

  const fetchBusDetails = async () => {
    try {
      const details = await busApi.getBusDetails(busId, travelDate);
      setBusDetails(details);
    } catch (err) {
      setError('Failed to load bus details');
      console.error('Bus details error:', err);
    }
  };

  const fetchSeatLayout = async () => {
    try {
      const seats = await busApi.getSeatLayout(busId, travelDate);
      setSeatLayout(seats);
    } catch (err) {
      setError('Failed to load seat layout');
      console.error('Seat layout error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSeatClick = (seat) => {
    if (!seat.isAvailable) return;
    
    const seatNumber = seat.seatNumber;
    const isSelected = selectedSeats.includes(seatNumber);
    
    if (isSelected) {
      setSelectedSeats(prev => prev.filter(s => s !== seatNumber));
    } else {
      setSelectedSeats(prev => [...prev, seatNumber]);
    }
  };

  const holdSeats = async () => {
    if (selectedSeats.length === 0) {
      setError('Please select at least one seat');
      return;
    }

    setHolding(true);
    setError('');
    
    try {
      const holdRequest = {
        busId: parseInt(busId),
        travelDate,
        seatNumbers: selectedSeats,
        userEmail: user?.email || 'guest@example.com'
      };
      
      const holdResponse = await bookingWorkflowApi.holdSeats(holdRequest);
      setHeldSeats(holdResponse);
      
      // Navigate to passenger details
      navigate('/passenger-details', { 
        state: { 
          busDetails, 
          selectedSeats, 
          holdId: holdResponse.holdId,
          travelDate 
        } 
      });
    } catch (err) {
      setError('Failed to hold seats. Please try again.');
      console.error('Hold seats error:', err);
    } finally {
      setHolding(false);
    }
  };

  const getSeatClass = (seat) => {
    if (!seat.isAvailable) return 'seat occupied';
    if (selectedSeats.includes(seat.seatNumber)) return 'seat selected';
    return 'seat available';
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const time = new Date();
    time.setHours(hours, minutes);
    return time.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const calculateTotalPrice = () => {
    if (!busDetails) return 0;
    return selectedSeats.length * busDetails.pricePerSeat;
  };

  const renderSeatLayout = () => {
    // Group seats by rows (assuming seat numbers like A1, A2, B1, B2, etc.)
    const rows = {};
    seatLayout.forEach(seat => {
      const row = seat.seatNumber[0];
      if (!rows[row]) rows[row] = [];
      rows[row].push(seat);
    });

    return Object.keys(rows)
      .sort()
      .map(row => (
        <div key={row} className="seat-row">
          <div className="row-label">{row}</div>
          <div className="seats-in-row">
            {rows[row]
              .sort((a, b) => {
                const aNum = parseInt(a.seatNumber.slice(1));
                const bNum = parseInt(b.seatNumber.slice(1));
                return aNum - bNum;
              })
              .map(seat => (
                <button
                  key={seat.seatId}
                  className={getSeatClass(seat)}
                  onClick={() => handleSeatClick(seat)}
                  disabled={!seat.isAvailable}
                  title={`${seat.seatNumber} - ${seat.isAvailable ? 'Available' : 'Occupied'}`}
                >
                  {seat.seatNumber}
                </button>
              ))}
          </div>
        </div>
      ));
  };

  if (loading) {
    return (
      <div className="seat-selection-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading seat layout...</p>
        </div>
      </div>
    );
  }

  if (error && !busDetails) {
    return (
      <div className="seat-selection-container">
        <div className="error">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={() => navigate('/search')} className="back-btn">
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="seat-selection-container">
      <div className="bus-summary">
        <div className="bus-info">
          <h2>{busDetails?.busName}</h2>
          <div className="route">
            <div className="route-point">
              <div className="time">{formatTime(busDetails?.departureTime)}</div>
              <div className="location">{busDetails?.source}</div>
            </div>
            <div className="route-arrow">→</div>
            <div className="route-point">
              <div className="time">{formatTime(busDetails?.arrivalTime)}</div>
              <div className="location">{busDetails?.destination}</div>
            </div>
          </div>
          <div className="travel-date">
            {formatDate(travelDate)}
          </div>
        </div>
        
        <div className="selection-summary">
          <div className="selected-seats-info">
            <span className="count">{selectedSeats.length}</span>
            <span>seat{selectedSeats.length !== 1 ? 's' : ''} selected</span>
          </div>
          <div className="total-price">
            ₹{calculateTotalPrice()}
          </div>
        </div>
      </div>

      <div className="seat-legend">
        <div className="legend-item">
          <div className="legend-seat available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-seat selected"></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="legend-seat occupied"></div>
          <span>Occupied</span>
        </div>
      </div>

      <div className="seat-layout-section">
        <h3>Select Your Seats</h3>
        <div className="seat-layout">
          <div className="bus-layout">
            <div className="driver-area">DRIVER</div>
            {renderSeatLayout()}
            <div className="rear-exit">REAR EXIT</div>
          </div>
        </div>
      </div>

      <div className="action-section">
        <div className="selected-seats-list">
          {selectedSeats.length > 0 && (
            <div className="seats-chips">
              {selectedSeats.map(seat => (
                <span key={seat} className="seat-chip">
                  {seat}
                  <button 
                    onClick={() => setSelectedSeats(prev => prev.filter(s => s !== seat))}
                    className="remove-seat"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="action-buttons">
          <button 
            onClick={() => navigate(-1)} 
            className="back-btn"
            disabled={holding}
          >
            Back
          </button>
          <button 
            onClick={holdSeats}
            className="continue-btn"
            disabled={selectedSeats.length === 0 || holding}
          >
            {holding ? 'Holding Seats...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
