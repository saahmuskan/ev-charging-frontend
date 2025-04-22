import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const bookingsApi = {
  createBooking: async (bookingData) => {
    try {
      const response = await axios.post(`${API_URL}/bookings`, bookingData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getBookingById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/bookings/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  cancelBooking: async (id) => {
    try {
      const response = await axios.post(`${API_URL}/bookings/${id}/cancel`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  completeBooking: async (id) => {
    try {
      const response = await axios.post(`${API_URL}/bookings/${id}/complete`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getUserBookings: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/bookings?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};