import React, { useState } from "react"
import { View, Text, TextInput, Button, Alert } from "react-native"
import { useAuth } from "../../api/auth/useAuth";

const LoginScreen = ({ navigation }: any) => {
    const { login } = useAuth();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await login(phoneNumber, password);
        } catch (error) {
            console.error(error);
            Alert.alert("Error de login", "Credenciales incorrectas");
        }
    };

    return (
        <View style={{ padding:20 }}>
            <Text>Teléfono:</Text>
            <TextInput 
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
                keyboardType="phone-pad"
                value = { phoneNumber }
                onChangeText = { setPhoneNumber }
            />
            <Text>Contraseña:</Text>
            <TextInput 
                style = {{ borderWidth: 1, padding: 10, marginBottom: 10 }}
                secureTextEntry
                value = { password }
                onChangeText = { setPassword }
            />
            <Button title="Iniciar Sesión" onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;