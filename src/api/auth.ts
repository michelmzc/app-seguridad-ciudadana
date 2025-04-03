import axios from "axios";

const API_URL = "http://10.0.2.2:3000";

export interface LoginResponse {
    access_token: string;
}

export const register = async(phoneNumber: string, password: string) => {
    const response = axios.post(`$API_URL/auth/register`, { phoneNumber, password });
    console.log(response);
    return  response
};

export const login = async(phoneNumber: string, password: string)  => {
    const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, {
        "phoneNumber":phoneNumber,
        "password":password
    });
    console.log(`Respuesta de ${API_URL}/auth/login:`, response);
    return response.data;
}

export const getProfile = async(token: string) => {
    try {
        console.log("Solicitando acceso para el token: ", token);

        const response = await axios.get(`${API_URL}/users/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Respuesta de la solicitud", response.data);
        return response.data;

    } catch (error: any) {
        console.error("❌ Error en la solicitud:", error.message);
        if (error.response) {
            console.error("🛑 Estado HTTP:", error.response.status);
            console.error("📄 Respuesta del servidor:", error.response.data);
        } else if (error.request) {
            console.error("📡 No se recibió respuesta del servidor");
        } else {
            console.error("⚙️ Error al configurar la solicitud:", error.message);
        }
    }
}