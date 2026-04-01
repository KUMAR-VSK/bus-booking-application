import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBus } from '../context/BusContext';
import { MagnifyingGlassIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';

const BusSearch = () => {
  const [searchData, setSearchData] = useState({
    source: '',
    destination: '',
    date: ''
  });
  const [errors, setErrors] = useState({});
  
  const { updateSearchCriteria } = useBus();
  const navigate = useNavigate();

  const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
    'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!searchData.source.trim()) {
      newErrors.source = 'Source city is required';
    }
    
    if (!searchData.destination.trim()) {
      newErrors.destination = 'Destination city is required';
    }
    
    if (searchData.source === searchData.destination) {
      newErrors.destination = 'Source and destination cannot be the same';
    }
    
    if (!searchData.date) {
      newErrors.date = 'Travel date is required';
    } else {
      const selectedDate = new Date(searchData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Travel date cannot be in the past';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      updateSearchCriteria(searchData);
      navigate('/buses');
    }
  };

  const handleSwap = () => {
    setSearchData({
      ...searchData,
      source: searchData.destination,
      destination: searchData.source
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Search Buses</h1>
            <p className="text-blue-100 mt-1">Find the perfect bus for your journey</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Source */}
              <div className="relative">
                <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    id="source"
                    value={searchData.source}
                    onChange={(e) => setSearchData({ ...searchData, source: e.target.value })}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.source ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select source city</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                {errors.source && (
                  <p className="mt-1 text-sm text-red-600">{errors.source}</p>
                )}
              </div>

              {/* Destination */}
              <div className="relative">
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    id="destination"
                    value={searchData.destination}
                    onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                    className={`block w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.destination ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select destination city</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleSwap}
                    className="absolute right-2 top-2.5 p-1 text-gray-400 hover:text-gray-600"
                    title="Swap source and destination"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </button>
                </div>
                {errors.destination && (
                  <p className="mt-1 text-sm text-red-600">{errors.destination}</p>
                )}
              </div>

              {/* Date */}
              <div className="relative">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Travel Date
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    id="date"
                    type="date"
                    value={searchData.date}
                    onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.date ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                Search Buses
              </button>
            </div>
          </form>
        </div>

        {/* Popular Routes */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { from: 'New York', to: 'Los Angeles' },
              { from: 'Chicago', to: 'Houston' },
              { from: 'San Francisco', to: 'Seattle' },
              { from: 'Boston', to: 'Washington DC' },
              { from: 'Miami', to: 'Orlando' },
              { from: 'Dallas', to: 'Austin' }
            ].map((route, index) => (
              <button
                key={index}
                onClick={() => setSearchData({
                  ...searchData,
                  source: route.from,
                  destination: route.to
                })}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900">
                  {route.from}
                </span>
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span className="text-sm font-medium text-gray-900">
                  {route.to}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusSearch;
