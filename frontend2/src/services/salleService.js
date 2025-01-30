import axios from 'axios';
import { API_ENDPOINTS } from '../config/api.config';

const getAllSalles = async () => {
    try {
        console.log('Fetching salles from:', API_ENDPOINTS.SALLESPROG);
        const response = await axios.get(API_ENDPOINTS.SALLESPROG);
        console.log('API Response:', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching salles:', error.response || error);
        throw error;
    }
};

const salleService = {
    getAllSalles,
};

export default salleService;
