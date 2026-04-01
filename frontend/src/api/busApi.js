import api from './axios';

export const busApi = {
  // Search buses based on criteria (using new booking workflow API)
  searchBuses: async (searchCriteria) => {
    const response = await api.post('/booking-workflow/search-buses', searchCriteria);
    return response.data;
  },

  // Get bus details by ID
  getBusDetails: async (busId, travelDate) => {
    const response = await api.get(`/booking-workflow/bus-details/${busId}`, {
      params: { travelDate }
    });
    return response.data;
  },

  // Get seat layout for a specific bus
  getSeatLayout: async (busId, travelDate) => {
    const response = await api.get(`/booking-workflow/seat-availability/${busId}`, {
      params: { travelDate }
    });
    return response.data;
  },

  // Hold seats temporarily (prevent double booking)
  holdSeats: async (holdRequest) => {
    const response = await api.post('/booking-workflow/hold-seats', holdRequest);
    return response.data;
  },

  // Release held seats
  releaseSeats: async (releaseRequest) => {
    const response = await api.post('/booking-workflow/release-seats', releaseRequest);
    return response.data;
  },

  // Create booking (using new workflow)
  createBooking: async (bookingData) => {
    const response = await api.post('/booking-workflow/initiate-booking', bookingData);
    return response.data;
  },

  // Get user bookings
  getUserBookings: async () => {
    const response = await api.get('/booking-workflow/my-bookings');
    return response.data;
  },

  // Get booking details
  getBookingDetails: async (bookingReference) => {
    const response = await api.get(`/booking-workflow/booking-details/${bookingReference}`);
    return response.data;
  },

  // Track booking
  trackBooking: async (bookingReference) => {
    const response = await api.get(`/booking-workflow/track-booking/${bookingReference}`);
    return response.data;
  },

  // Track bus
  trackBus: async (busId) => {
    const response = await api.get(`/booking-workflow/track-bus/${busId}`);
    return response.data;
  },

  // Download ticket
  downloadTicket: async (bookingReference) => {
    const response = await api.get(`/booking-workflow/download-ticket/${bookingReference}`, {
      responseType: 'blob'
    });
    return response.data;
  },

  // Send ticket email
  sendTicketEmail: async (bookingReference) => {
    const response = await api.post(`/booking-workflow/send-ticket-email/${bookingReference}`);
    return response.data;
  },
};

// Export booking workflow specific methods
export const bookingWorkflowApi = {
  // Hold seats temporarily (15 minutes)
  holdSeats: async (holdRequest) => {
    const response = await api.post('/booking-workflow/hold-seats', holdRequest);
    return response.data;
  },

  // Release held seats
  releaseSeats: async (releaseRequest) => {
    const response = await api.post('/booking-workflow/release-seats', releaseRequest);
    return response.data;
  },

  // Initiate booking process
  initiateBooking: async (initiationRequest) => {
    const response = await api.post('/booking-workflow/initiate-booking', initiationRequest);
    return response.data;
  },

  // Process payment
  processPayment: async (paymentRequest) => {
    const response = await api.post('/booking-workflow/process-payment', paymentRequest);
    return response.data;
  },

  // Confirm booking after payment
  confirmBooking: async (paymentId) => {
    const response = await api.post('/booking-workflow/confirm-booking', null, {
      params: { paymentId }
    });
    return response.data;
  },

  // Cancel booking
  cancelBooking: async (bookingReference) => {
    const response = await api.post(`/booking-workflow/cancel-booking/${bookingReference}`);
    return response.data;
  },
};
