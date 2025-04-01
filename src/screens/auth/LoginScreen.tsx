import React, { useState } from "react"
import { View, Text, TextInput, Button, Alert } from "react-native"
import { login } from "../../api/auth"
import { saveToken } from "utils/storage"

const LoginScreen = ({ navigation }: any) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const data = await login(phoneNumber, password);
            await saveToken(data.access_token);
            Alert.alert("Éxito", "Inicio de sesión exitoso");
            navigation.navigate("Profile");
        } catch (error) {
            console.error(error);
            if(error instanceof Error){
                console.log(error.stack);
            }

            Alert.alert("Error", "Credenciales incorrectas");
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