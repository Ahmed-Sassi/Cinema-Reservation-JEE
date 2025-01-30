import axios from 'axios';
import { API_ENDPOINTS } from '../config/api.config';

const authService = {
    login: async (username, password) => {
        try {
            const response = await axios.post(API_ENDPOINTS.LOGIN, { username, password });
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    register: async (name, password, solde) => {
        try {
            const response = await axios.post(API_ENDPOINTS.REGISTER, { 
                name, 
                password, 
                solde: parseFloat(solde)
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};

export default authService;
