import React, { useEffect, useState } from "react"
import { View, Text, Button, Alert } from "react-native"
import { getProfile } from "../../api/auth"
import { getToken, removeToken } from "../../utils/storage"

const ProfileScreen = ({ navigation }: any) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const loadProfile = async () => {
            const token = await getToken();            
            if (token) {
                try {
                    const data = await getProfile(token);
                    setUser(data);
                } catch (error) {
                    Alert.alert("Error", "No se pudo obtener el perfil");
                }
            }
        };
        loadProfile()
    }, []);

    const handleLogout = async () => {
        await removeToken();
        navigation.navigate("Login");
    };

    return(
        <View style={{ padding: 20 }}>
            {user ? (
                <>
                    <Text>Teléfono: {user.phoneNumber}</Text>
                    <Text>Nombre: {user.name}</Text>
                    <Button title="Cerrar Sesión" onPress={handleLogout} />
                </>
            ) : (
                <Text>Cargando...</Text>
            )}
        </View>
    );
};

export default ProfileScreen;
