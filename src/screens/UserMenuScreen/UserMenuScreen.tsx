// src/screens/UserMenuScreen.tsx
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../../api/auth/AuthContext'; // Asegurate de usar tu contexto de auth
import { useNavigation } from '@react-navigation/native';

const UserMenuScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Cerrar sesión", onPress: logout },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👤 Perfil de Usuario</Text>
      <View style={styles.userInfo}>
        <Text style={styles.username}>{user?.name || "Usuario"}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>⚙️ Configuración</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>🔔 Notificaciones</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>❓ Ayuda</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.item, styles.logout]} onPress={handleLogout}>
        <Text style={[styles.itemText, styles.logoutText]}>🚪 Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserMenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: 'center',
  },
  userInfo: {
    marginBottom: 30,
    alignItems: 'center',
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  logout: {
    marginTop: 40,
    backgroundColor: '#ffe5e5',
    borderRadius: 8,
  },
  logoutText: {
    color: '#c00',
    fontWeight: 'bold',
  },
});
