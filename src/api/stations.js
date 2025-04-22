import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const stationsApi = {
  getAllStations: async () => {
    try {
      const response = await axios.get(`${API_URL}/stations`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  searchStations: async (location) => {
    try {
      const response = await axios.get(`${API_URL}/stations?location=${location}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getStationById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/stations/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  createStation: async (stationData) => {
    try {
      const response = await axios.post(`${API_URL}/stations`, stationData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateStation: async (id, stationData) => {
    try {
      const response = await axios.put(`${API_URL}/stations/${id}`, stationData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteStation: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/stations/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};