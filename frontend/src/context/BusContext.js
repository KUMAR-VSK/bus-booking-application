import React, { createContext, useContext, useState } from 'react';

const BusContext = createContext();

export const useBus = () => {
  const context = useContext(BusContext);
  if (!context) {
    throw new Error('useBus must be used within a BusProvider');
  }
  return context;
};

export const BusProvider = ({ children }) => {
  const [searchCriteria, setSearchCriteria] = useState({
    source: '',
    destination: '',
    date: ''
  });
  
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);

  const updateSearchCriteria = (criteria) => {
    setSearchCriteria(criteria);
  };

  const selectBus = (bus) => {
    setSelectedBus(bus);
    setSelectedSeats([]);
  };

  const toggleSeat = (seatNumber) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatNumber)) {
        return prev.filter(seat => seat !== seatNumber);
      } else {
        return [...prev, seatNumber];
      }
    });
  };

  const clearSelection = () => {
    setSelectedBus(null);
    setSelectedSeats([]);
    setBookingDetails(null);
  };

  const setBooking = (details) => {
    setBookingDetails(details);
  };

  const value = {
    searchCriteria,
    selectedBus,
    selectedSeats,
    bookingDetails,
    updateSearchCriteria,
    selectBus,
    toggleSeat,
    clearSelection,
    setBooking
  };

  return (
    <BusContext.Provider value={value}>
      {children}
    </BusContext.Provider>
  );
};
