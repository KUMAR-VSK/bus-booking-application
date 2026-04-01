import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBus } from '../context/BusContext';
import { ClockIcon, ArrowLeftIcon, ArrowRightIcon, TruckIcon } from '@heroicons/react/24/outline';


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
      const price = 299 + Math.floor(Math.random() * 2000); // INR pricing
     
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
      if (filters.priceRange === 'budget' && bus.price > 500) return false;
      if (filters.priceRange === 'mid' && (bus.price < 500 || bus.price > 1200)) return false;
      if (filters.priceRange === 'premium' && bus.price < 1200) return false;
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
    <div className="min-h-screen bg-gray-50 py-12 page-shell">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Available Buses</h1>
                <p className="text-gray-600 mt-1">
                  {searchCriteria.source} → {searchCriteria.destination} • {searchCriteria.date}
                </p>
              </div>
            </div>
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-sm font-semibold text-blue-900">{filteredBuses.length} buses found</span>
            </div>
          </div>
        </div>


        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="lg:w-72">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 sticky top-24">
              <h3 className="font-bold text-gray-900 text-lg mb-6">Filters</h3>
             
              {/* Price Range */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  className="form-input py-3 text-base"
                >
                  <option value="all">All Prices</option>
                  <option value="budget">Under ₹500</option>
                  <option value="mid">₹500 - ₹1200</option>
                  <option value="premium">₹1200+</option>
                </select>
              </div>


              {/* Bus Type */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Bus Type</label>
                <select
                  value={filters.busType}
                  onChange={(e) => setFilters({ ...filters, busType: e.target.value })}
                  className="form-input py-3 text-base"
                >
                  <option value="all">All Types</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Sleeper">Sleeper</option>
                </select>
              </div>


              {/* Departure Time */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Departure Time</label>
                <select
                  value={filters.departureTime}
                  onChange={(e) => setFilters({ ...filters, departureTime: e.target.value })}
                  className="form-input py-3 text-base"
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
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                <div className="empty-state">
                  <TruckIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg font-medium">No buses found matching your criteria.</p>
                  <button
                    onClick={() => setFilters({ priceRange: 'all', busType: 'all', departureTime: 'all' })}
                    className="mt-6 text-blue-600 hover:text-blue-500 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredBuses.map((bus) => (
                  <div key={bus.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 overflow-hidden">
                    <div className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{bus.operator}</h3>
                              <p className="text-sm text-gray-500 mt-1">{bus.busNumber} • {bus.type}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold text-blue-600">₹{bus.price}</div>
                              <div className="text-sm text-gray-500 mt-1">per seat</div>
                            </div>
                          </div>
                         
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                            <div className="flex items-center space-x-6 mb-3 sm:mb-0">
                              <div className="flex items-center">
                                <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                                <span className="text-base font-medium text-gray-900">{bus.departureTime}</span>
                              </div>
                              <div className="flex items-center">
                                <ArrowRightIcon className="h-5 w-5 text-gray-400 mr-2" />
                                <span className="text-base font-medium text-gray-900">{bus.arrivalTime}</span>
                              </div>
                              <div className="flex items-center">
                                <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                                <span className="text-base text-gray-500">{bus.duration}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {bus.amenities.map((amenity, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                                >
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>
                         
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">{bus.availableSeats}</span> seats available
                            </div>
                            <button
                              onClick={() => handleSelectBus(bus)}
                              disabled={bus.availableSeats === 0}
                              className={`px-6 py-3 text-base font-semibold rounded-xl transition-all ${
                                bus.availableSeats === 0
                                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg'
                              }`}
                            >
                              {bus.availableSeats === 0 ? 'Sold Out' : 'Select Seats'}
                            </button>
                          </div>
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