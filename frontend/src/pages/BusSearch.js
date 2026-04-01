import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBus } from '../context/BusContext';
import { MagnifyingGlassIcon, MapPinIcon, CalendarIcon, ArrowRightIcon } from '@heroicons/react/24/outline';


const BusSearch = () => {
  const [searchData, setSearchData] = useState({
    source: '',
    destination: '',
    date: ''
  });
  const [errors, setErrors] = useState({});
 
  const { updateSearchCriteria } = useBus();
  const navigate = useNavigate();


  const tamilNaduCities = [
    'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
    'Erode', 'Tiruppur', 'Vellore', 'Thoothukudi', 'Dindigul',
    'Thanjavur', 'Ranipet', 'Sivakasi', 'Karur', 'Udhagamandalam',
    'Hosur', 'Nagercoil', 'Kanchipuram', 'Kumbakonam', 'Tirunelveli',
    'Cuddalore', 'Kanyakumari', 'Nagapattinam', 'Villupuram', 'Tiruvannamalai',
    'Pudukkottai', 'Ramanathapuram', 'Theni', 'Virudhunagar', 'Ariyalur',
    'Perambalur', 'Krishnagiri', 'Namakkal', 'Tirupathur', 'Chengalpattu'
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
    <div className="page-container page-shell bg-gray-50 min-h-screen">
      {/* Dynamic Hero Section */}
      <div className="bg-gradient-to-br from-[#d84e55] via-[#e26966] to-[#fc8b8b] pt-16 pb-40 relative rounded-b-[40px] shadow-lg">
        <div className="absolute inset-0 overflow-hidden rounded-b-[40px]">
           <div className="absolute -top-[50%] -left-[10%] w-[60%] h-[150%] bg-white/10 rounded-full blur-3xl transform rotate-12"></div>
           <div className="absolute top-[20%] -right-[20%] w-[50%] h-[100%] bg-pink-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="page-content relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-xl tracking-tight">
            Book Your Journey
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md font-medium">
            Discover and book buses across Tamil Nadu with our premium, seamless experience
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-28 relative z-20 pb-16">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] p-8 md:p-10 border border-white/50">
          <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="form-group">
                  <label htmlFor="source" className="form-label text-gray-700 font-semibold text-base mb-3">
                    From
                  </label>
                  <div className="relative">
                    <MapPinIcon className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
                    <input
                      id="source"
                      type="text"
                      value={searchData.source}
                      onChange={(e) => setSearchData({ ...searchData, source: e.target.value })}
                      className={`form-input pl-14 py-4 text-base ${errors.source ? 'border-red-500' : ''}`}
                      placeholder="Departure city"
                      list="source-cities"
                    />
                    <datalist id="source-cities" className="absolute z-10 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                      {tamilNaduCities.map((city) => (
                        <option key={city} value={city} />
                      ))}
                    </datalist>
                  </div>
                  {errors.source && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.source}</p>
                  )}
                </div>


                <div className="form-group">
                  <label htmlFor="destination" className="form-label text-gray-700 font-semibold text-base mb-3">
                    To
                  </label>
                  <div className="relative">
                    <MapPinIcon className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
                    <input
                      id="destination"
                      type="text"
                      value={searchData.destination}
                      onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                      className={`form-input pl-14 py-4 text-base ${errors.destination ? 'border-red-500' : ''}`}
                      placeholder="Arrival city"
                      list="destination-cities"
                    />
                    <datalist id="destination-cities" className="absolute z-10 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                      {tamilNaduCities.map((city) => (
                        <option key={city} value={city} />
                      ))}
                    </datalist>
                  </div>
                  {errors.destination && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{errors.destination}</p>
                  )}
                </div>
              </div>


              <div className="form-group">
                <label htmlFor="date" className="form-label text-gray-700 font-semibold text-base mb-3">
                  Travel Date
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
                  <input
                    id="date"
                    type="date"
                    value={searchData.date}
                    onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className={`form-input pl-14 py-4 text-base ${errors.date ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.date && (
                  <p className="mt-2 text-sm text-red-600 font-medium">{errors.date}</p>
                )}
              </div>


              <div className="pt-6">
                <button
                  type="submit"
                  className="btn btn-full w-full py-4 bg-gradient-to-r from-[#d84e55] to-[#b63038] hover:from-[#c23e44] hover:to-[#a3222a] text-white font-bold text-xl rounded-xl transition-all transform hover:scale-[1.01] hover:shadow-xl"
                >
                  <MagnifyingGlassIcon className="h-7 w-7 mr-3 inline text-white/90" />
                  Search Buses
                </button>
              </div>
            </form>
          </div>


          {/* Popular Routes */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold justify-center text-gray-800 mb-8 flex items-center gap-3">
              <MapPinIcon className="h-7 w-7 text-[#d84e55]" /> Popular Routes in Tamil Nadu
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { from: 'Chennai', to: 'Coimbatore' },
                { from: 'Chennai', to: 'Madurai' },
                { from: 'Chennai', to: 'Tiruchirappalli' },
                { from: 'Coimbatore', to: 'Madurai' },
                { from: 'Salem', to: 'Chennai' },
                { from: 'Tiruppur', to: 'Chennai' }
              ].map((route, index) => (
                <button
                  key={index}
                  onClick={() => setSearchData({
                    ...searchData,
                    source: route.from,
                    destination: route.to
                  })}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-blue-300 transition-all group"
                >
                  <div className="flex items-center">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mr-3 group-hover:text-blue-600 transition-colors" />
                    <span className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {route.from} → {route.to}
                    </span>
                  </div>
                  <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};


export default BusSearch;
