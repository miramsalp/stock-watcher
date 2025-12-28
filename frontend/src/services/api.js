import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/stocks';

const api = axios.create({
    baseURL: BASE_URL
});

const getHeaders = (token) => ({
    headers: {
        'Authorization': `Bearer ${token}` 
    }
});

export const createStockAlert = async (data, token) => {
    try {
        const response = await api.post('/', data, getHeaders(token));
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || error.message;
    }
};

export const getUserStocks = async (token) => {
    try {
        const response = await api.get('/', getHeaders(token));
        return response.data;
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
};

export const deleteStock = async (id, token) => {
    try {
        await api.delete(`/${id}`, getHeaders(token));
        return true;
    } catch (error) {
        throw error.response?.data?.error || error.message;
    }
};