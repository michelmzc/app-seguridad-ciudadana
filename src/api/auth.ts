import axios from "axios";

const API_URL = "http://10.0.2.2:3000/auth";

export interface LoginResponse {
    access_token: string;
}

export const register = async (phoneNumber: string, password: string) => {
    const response = axios.post(`$API_URL/register`, { phoneNumber, password });
    console.log(response);
    return  response
};

export const login = async (phoneNumber: string, password: string)  => {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, {
        "phoneNumber":phoneNumber,
        "password":password
    });
    console.log(`Respuesta de ${API_URL}/login:`, response);
    return response.data;
}

export const getProfile = async (token: string) => {
    const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    
    return response.data;
}