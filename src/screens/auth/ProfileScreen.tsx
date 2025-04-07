import React, { useEffect, useState } from "react"
import { View, Text, Button, Alert } from "react-native"
import { getProfile } from "../../api/auth/auth"
import { getToken, removeToken } from "../../utils/storage"
import { useAuth } from "../../api/auth/useAuth";

const ProfileScreen = ({ navigation }: any) => {
    const { user, logout } = useAuth();

    return(
        <View style={{ padding: 20 }}>
            {user ? (
                <>
                    <Text>Teléfono: {user.phoneNumber}</Text>
                    <Text>Nombre: {user.name}</Text>
                    <Button title="Cerrar Sesión" onPress={logout} />
                </>
            ) : (
                <Text>Cargando...</Text>
            )}
        </View>
    );
};

export default ProfileScreen;
