import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/stocks';

export const createStockAlert = async (data) => {
  try {
    const response = await axios.post(BASE_URL, data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

export const getUserStocks = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

export const deleteStock = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    return true;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};