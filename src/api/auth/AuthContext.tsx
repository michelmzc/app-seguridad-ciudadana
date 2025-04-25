import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../axios';

interface AuthContextType {
    user: any;
    login: (phoneNumber: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null, // Valor inicial de user
    login: async () => {}, // Función login vacía por defecto
    logout: () => {}, // Función logout vacía por defecto
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const loadUser = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                try {
                    const res = await axios.get('/users/profile', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUser(res.data);
                } catch (error) {
                    await AsyncStorage.removeItem('token');
                }
            }
        };
        loadUser();
    }, []);

    const login = async (phoneNumber: string, password: string) => {
        const res = await axios.post('/auth/login', { phoneNumber, password });
        const token = res.data.access_token;
        await AsyncStorage.setItem('token', token);
        const profile = await axios.get('/users/profile', {
            headers: { Authorization: `Bearer ${token}`}
        });
        setUser(profile.data);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
           { children }
        </AuthContext.Provider>
    );
}
