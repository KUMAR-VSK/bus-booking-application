import api from './axios';

export const busApi = {
  // Search buses based on criteria
  searchBuses: async (searchCriteria) => {
    const response = await api.post('/buses/search', searchCriteria);
    return response.data;
  },

  // Get bus details by ID
  getBusDetails: async (busId) => {
    const response = await api.get(`/buses/${busId}`);
    return response.data;
  },

  // Get seat layout for a specific bus
  getSeatLayout: async (busId, date) => {
    const response = await api.get(`/buses/${busId}/seats?date=${date}`);
    return response.data;
  },

  // Hold seats temporarily (prevent double booking)
  holdSeats: async (busId, seatNumbers, date) => {
    const response = await api.post(`/buses/${busId}/hold-seats`, {
      seatNumbers,
      date,
    });
    return response.data;
  },

  // Release held seats
  releaseSeats: async (busId, seatNumbers, date) => {
    const response = await api.post(`/buses/${busId}/release-seats`, {
      seatNumbers,
      date,
    });
    return response.data;
  },

  // Create booking
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  // Get user bookings
  getUserBookings: async () => {
    const response = await api.get('/bookings/my-bookings');
    return response.data;
  },

  // Get booking details
  getBookingDetails: async (bookingId) => {
    const response = await api.get(`/bookings/${bookingId}`);
    return response.data;
  },

  // Cancel booking
  cancelBooking: async (bookingId) => {
    const response = await api.delete(`/bookings/${bookingId}`);
    return response.data;
  },

  // Update seat availability after booking/cancellation
  updateSeatAvailability: async (busId, date, seatUpdates) => {
    const response = await api.put(`/buses/${busId}/seats/update`, {
      date,
      seatUpdates,
    });
    return response.data;
  },
};
