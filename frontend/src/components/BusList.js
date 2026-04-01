import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBus } from '../context/BusContext';
import { ClockIcon, UserGroupIcon, StarIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: 'all',
    busType: 'all',
    departureTime: 'all'
  });
  
  const { searchCriteria, selectBus } = useBus();
  const navigate = useNavigate();

  // Mock bus data generator
  const generateMockBuses = () => {
    const busTypes = ['Standard', 'Premium', 'Luxury', 'Sleeper'];
    const operators = ['Express Lines', 'Swift Transit', 'Comfort Coaches', 'Royal Bus', 'Fast Track'];
    
    const mockBuses = [];
    for (let i = 1; i <= 8; i++) {
      const departureHour = 6 + Math.floor(Math.random() * 16);
      const departureMinute = Math.random() > 0.5 ? '00' : '30';
      const duration = 4 + Math.floor(Math.random() * 8);
      const price = 25 + Math.floor(Math.random() * 75);
      
      mockBuses.push({
        id: i,
        operator: operators[Math.floor(Math.random() * operators.length)],
        busNumber: `BUS-${1000 + i}`,
        type: busTypes[Math.floor(Math.random() * busTypes.length)],
        departureTime: `${departureHour.toString().padStart(2, '0')}:${departureMinute}`,
        arrivalTime: `${((departureHour + duration) % 24).toString().padStart(2, '0')}:${departureMinute}`,
        duration: `${duration}h`,
        price: price,
        rating: (3.5 + Math.random() * 1.5).toFixed(1),
        totalSeats: 40 + Math.floor(Math.random() * 20),
        availableSeats: 5 + Math.floor(Math.random() * 35),
        amenities: ['WiFi', 'AC', 'Charging Ports', 'Entertainment'].filter(() => Math.random() > 0.3)
      });
    }
    
    return mockBuses.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBuses(generateMockBuses());
      setLoading(false);
    }, 1000);
  }, [searchCriteria]);

  const filteredBuses = buses.filter(bus => {
    if (filters.priceRange !== 'all') {
      if (filters.priceRange === 'budget' && bus.price > 40) return false;
      if (filters.priceRange === 'mid' && (bus.price < 40 || bus.price > 70)) return false;
      if (filters.priceRange === 'premium' && bus.price < 70) return false;
    }
    
    if (filters.busType !== 'all' && bus.type !== filters.busType) return false;
    
    if (filters.departureTime !== 'all') {
      const hour = parseInt(bus.departureTime.split(':')[0]);
      if (filters.departureTime === 'morning' && (hour < 6 || hour >= 12)) return false;
      if (filters.departureTime === 'afternoon' && (hour < 12 || hour >= 18)) return false;
      if (filters.departureTime === 'evening' && (hour < 18 || hour >= 24)) return false;
      if (filters.departureTime === 'night' && (hour < 0 || hour >= 6)) return false;
    }
    
    return true;
  });

  const handleSelectBus = (bus) => {
    selectBus(bus);
    navigate('/seat-selection');
  };

  const handleBack = () => {
    navigate('/search');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching for buses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <h1 className="text-2xl font-bold text-gray-900">Available Buses</h1>
                <p className="text-gray-600">
                  {searchCriteria.source} → {searchCriteria.destination} • {searchCriteria.date}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {filteredBuses.length} buses found
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Prices</option>
                  <option value="budget">Budget ($25-$40)</option>
                  <option value="mid">Mid-Range ($40-$70)</option>
                  <option value="premium">Premium ($70+)</option>
                </select>
              </div>

              {/* Bus Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bus Type</label>
                <select
                  value={filters.busType}
                  onChange={(e) => setFilters({ ...filters, busType: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Sleeper">Sleeper</option>
                </select>
              </div>

              {/* Departure Time */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Departure Time</label>
                <select
                  value={filters.departureTime}
                  onChange={(e) => setFilters({ ...filters, departureTime: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Times</option>
                  <option value="morning">Morning (6AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 6PM)</option>
                  <option value="evening">Evening (6PM - 12AM)</option>
                  <option value="night">Night (12AM - 6AM)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bus List */}
          <div className="flex-1">
            {filteredBuses.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-500">No buses found matching your criteria.</p>
                <button
                  onClick={() => setFilters({ priceRange: 'all', busType: 'all', departureTime: 'all' })}
                  className="mt-4 text-blue-600 hover:text-blue-500"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBuses.map((bus) => (
                  <div key={bus.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{bus.operator}</h3>
                              <p className="text-sm text-gray-500">{bus.busNumber} • {bus.type}</p>
                            </div>
                            <div className="flex items-center">
                              <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="text-sm text-gray-600">{bus.rating}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-6 mb-3">
                            <div className="flex items-center text-sm text-gray-600">
                              <ClockIcon className="h-4 w-4 mr-1" />
                              {bus.departureTime} - {bus.arrivalTime}
                            </div>
                            <div className="text-sm text-gray-600">
                              {bus.duration}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <UserGroupIcon className="h-4 w-4 mr-1" />
                              {bus.availableSeats}/{bus.totalSeats} seats
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {bus.amenities.map((amenity, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-4 lg:mt-0 lg:ml-6 text-center lg:text-right">
                          <div className="text-2xl font-bold text-gray-900">${bus.price}</div>
                          <div className="text-sm text-gray-500 mb-3">per person</div>
                          <button
                            onClick={() => handleSelectBus(bus)}
                            disabled={bus.availableSeats === 0}
                            className={`px-6 py-2 rounded-md font-medium transition-colors ${
                              bus.availableSeats === 0
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {bus.availableSeats === 0 ? 'Sold Out' : 'Select Seats'}
                          </button>
                        </div>
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

export default BusList;
