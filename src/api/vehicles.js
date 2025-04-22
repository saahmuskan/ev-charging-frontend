import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const vehiclesApi = {
  getUserVehicles: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/vehicles?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getVehicleById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/vehicles/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  createVehicle: async (vehicleData) => {
    try {
      const response = await axios.post(`${API_URL}/vehicles`, vehicleData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateVehicle: async (id, vehicleData) => {
    try {
      const response = await axios.put(`${API_URL}/vehicles/${id}`, vehicleData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteVehicle: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/vehicles/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};