import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const paymentsApi = {
  processPayment: async (paymentData) => {
    try {
      const response = await axios.post(`${API_URL}/payments`, paymentData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getPaymentById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/payments/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getUserPayments: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/payments?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  refundPayment: async (id) => {
    try {
      const response = await axios.post(`${API_URL}/payments/${id}/refund`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};