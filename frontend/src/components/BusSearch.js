import React, { useState, useEffect } from 'react';
import { busApi } from '../api/busApi';
import { useAuth } from '../context/AuthContext';
import './BusSearch.css';

const BusSearch = () => {
  const { user } = useAuth();
  const [searchCriteria, setSearchCriteria] = useState({
    source: '',
    destination: '',
    travelDate: '',
    passengers: 1,
    sortBy: 'departure',
    sortOrder: 'asc'
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchCriteria.source || !searchCriteria.destination || !searchCriteria.travelDate) {
      setError('Please fill in all search fields');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const results = await busApi.searchBuses(searchCriteria);
      setSearchResults(results);
    } catch (err) {
      setError('Failed to search buses. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
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

  const formatDuration = (duration) => {
    const hours = Math.floor(duration);
    const minutes = Math.round((duration - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  const handleSelectBus = (bus) => {
    // Navigate to bus details page
    window.location.href = `/bus-details/${bus.busId}?date=${searchCriteria.travelDate}`;
  };

  return (
    <div className="bus-search-container">
      <div className="search-form-section">
        <h2>Search Buses</h2>
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="source">From</label>
              <input
                type="text"
                id="source"
                name="source"
                value={searchCriteria.source}
                onChange={handleInputChange}
                placeholder="Enter source city"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="destination">To</label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={searchCriteria.destination}
                onChange={handleInputChange}
                placeholder="Enter destination city"
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="travelDate">Travel Date</label>
              <input
                type="date"
                id="travelDate"
                name="travelDate"
                value={searchCriteria.travelDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="passengers">Passengers</label>
              <select
                id="passengers"
                name="passengers"
                value={searchCriteria.passengers}
                onChange={handleInputChange}
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Passenger' : 'Passengers'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="sortBy">Sort By</label>
              <select
                id="sortBy"
                name="sortBy"
                value={searchCriteria.sortBy}
                onChange={handleInputChange}
              >
                <option value="departure">Departure Time</option>
                <option value="arrival">Arrival Time</option>
                <option value="price">Price</option>
                <option value="duration">Duration</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="sortOrder">Sort Order</label>
              <select
                id="sortOrder"
                name="sortOrder"
                value={searchCriteria.sortOrder}
                onChange={handleInputChange}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Search Buses'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="search-results-section">
        {searchResults.length > 0 && (
          <div>
            <h3>Available Buses ({searchResults.length})</h3>
            <div className="bus-list">
              {searchResults.map((bus) => (
                <div key={`${bus.busId}-${bus.travelDate}`} className="bus-card">
                  <div className="bus-header">
                    <div className="bus-info">
                      <h4>{bus.busName}</h4>
                      <p className="operator">{bus.operatorName}</p>
                      <div className="rating">
                        ⭐ {bus.rating || '4.0'}
                      </div>
                    </div>
                    <div className="bus-type">
                      <span className="bus-type-badge">{bus.busType || 'AC'}</span>
                    </div>
                  </div>

                  <div className="bus-route">
                    <div className="route-point">
                      <div className="time">{formatTime(bus.departureTime)}</div>
                      <div className="location">{bus.source}</div>
                    </div>
                    <div className="route-details">
                      <div className="duration">{formatDuration(bus.duration)}</div>
                      <div className="route-line"></div>
                    </div>
                    <div className="route-point">
                      <div className="time">{formatTime(bus.arrivalTime)}</div>
                      <div className="location">{bus.destination}</div>
                    </div>
                  </div>

                  <div className="bus-details">
                    <div className="amenities">
                      {bus.amenities?.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="amenity-badge">
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <div className="seats-info">
                      <span className="available-seats">
                        {bus.availableSeats} seats available
                      </span>
                      <span className="total-seats">
                        out of {bus.totalSeats}
                      </span>
                    </div>
                  </div>

                  <div className="bus-footer">
                    <div className="price-info">
                      <div className="price-per-seat">
                        ₹{bus.pricePerSeat} per seat
                      </div>
                      <div className="total-price">
                        ₹{bus.totalPrice} total
                      </div>
                    </div>
                    <button
                      className="select-btn"
                      onClick={() => handleSelectBus(bus)}
                      disabled={bus.availableSeats < searchCriteria.passengers}
                    >
                      {bus.availableSeats < searchCriteria.passengers 
                        ? 'Insufficient Seats' 
                        : 'Select Seats'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchResults.length === 0 && !loading && searchCriteria.source && searchCriteria.destination && (
          <div className="no-results">
            <h3>No buses found</h3>
            <p>Try adjusting your search criteria or travel date.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusSearch;
