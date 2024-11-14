// src/AuthService.js
import axios from 'axios';

const API_URL = 'https://api-7lsnwj5f4a-uc.a.run.app';

export const register = async (email, password) => {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data;
};

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
        localStorage.setItem('jwtToken', response.data.token);
        localStorage.setItem('role' , response.data.role)
        console.log(response.data.token)
        console.log(response.data.role)
    }
    return response.data;
};

export const fetchProtectedData = async () => {
    const token = localStorage.getItem('jwtToken');
    const response = await axios.get(`${API_URL}/protected`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};