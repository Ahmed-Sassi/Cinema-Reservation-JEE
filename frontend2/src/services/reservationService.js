import axios from 'axios';
import { API_ENDPOINTS } from '../config/api.config';

const getUserReservations = async (userId) => {
  try {
    console.log('Fetching user reservations from:', `${API_ENDPOINTS.RESERVATIONS}/user/${userId}`);
    const response = await axios.get(`${API_ENDPOINTS.RESERVATIONS}/user/${userId}`);
    console.log('API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching user reservations:', error.response || error);
    throw error;
  }
};

const makeReservation = async (seanceId, userId) => {
  try {
    const response = await axios.post(API_ENDPOINTS.RESERVATIONS, {
      seanceId,
      userId
    });
    return response.data;
  } catch (error) {
    console.error('Error making reservation:', error.response || error);
    throw error;
  }
};

const deleteReservation = async (reservationId) => {
  try {
    const response = await axios.delete(`${API_ENDPOINTS.RESERVATIONS}/${reservationId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting reservation:', error.response || error);
    throw error;
  }
};

const reservationService = {
  getUserReservations,
  makeReservation,
  deleteReservation,
};

export default reservationService;
