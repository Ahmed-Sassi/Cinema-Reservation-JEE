import axios from 'axios';
import { API_ENDPOINTS } from '../config/api.config';

const filmService = {
    getAllFilms: async () => {
        try {
            const response = await axios.get(API_ENDPOINTS.FILMS);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    getFilmById: async (id) => {
        try {
            const response = await axios.get(`${API_ENDPOINTS.FILMS}/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default filmService;
