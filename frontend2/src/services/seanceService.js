import axios from 'axios';
import { API_ENDPOINTS } from '../config/api.config';

const getAllSeances = async () => {
  try {
    console.log('Fetching seances from:', API_ENDPOINTS.SEANCES);
    const response = await axios.get(API_ENDPOINTS.SEANCES);
    console.log('API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching seances:', error.response || error);
    throw error;
  }
};

const getSeancesByFilm = async (filmId) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.FILMS}/${filmId}/seances`);
    return response.data;
  } catch (error) {
    console.error('Error fetching seances for film:', error.response || error);
    throw error;
  }
};

const seanceService = {
  getAllSeances,
  getSeancesByFilm,
};

export default seanceService;
