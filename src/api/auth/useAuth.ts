/*
    Hook personalizado para acceder fácilmente al contexto de autenticación
*/
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    return context;
};