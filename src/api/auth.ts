import axios from "axios";

const API_URL = "http://localhost:3000/auth";

export interface LoginResponse {
    access_token: string;
}

export const register = async (phoneNumber: string, password: string) => {
    return axios.post(`$API_URL/register`, { phoneNumber, password });
};

export const login = async (phoneNumber: string, password: string)  => {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, {
        phoneNumber,
        password
    });
    return response.data;
}

export const getProfile = async (token: string) => {
    const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    
    return response.data;
}