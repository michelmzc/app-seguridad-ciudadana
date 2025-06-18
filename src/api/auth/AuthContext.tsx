import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../axios';

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (phoneNumber: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get('/users/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (error) {
          await AsyncStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (phoneNumber: string, password: string) => {
    const res = await axios.post('/auth/login', { phoneNumber, password });
    const token = res.data.access_token;
    await AsyncStorage.setItem('token', token);
    const profile = await axios.get('/users/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Estableciendo usuario: ", profile.data)
    setUser(profile.data);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
