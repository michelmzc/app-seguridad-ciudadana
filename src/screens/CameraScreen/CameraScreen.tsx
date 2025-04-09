import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import CameraItem from "./components/CameraItem";
import CameraForm from "./components/CameraForm";
import { Camera } from "../../types";
import { getProfile } from "../../api/auth/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CamerasScreen: React.FC = () => {
  

  const [cameras, setCameras] = useState<Camera[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingCamera, setEditingCamera] = useState<Camera | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try{
        const token = await AsyncStorage.getItem("token")
        if (!token) return;  

        const response = await getProfile(token);
        const fetchedCameras = response.cameras.map((cam: any) => ({
          id: cam._id,
          name: cam.name,
          streamUrl: cam.stream_url
        }));

        setCameras(fetchedCameras);
      } catch (error) {
        console.log("❌ Error al obtener perfil:", error);
      }
    };
    fetchProfile();  
  }, []);

  const handleSaveCamera = (camera: Omit<Camera, "id"> & { id?: string }) => {
    if (camera.id) {
      // Actualizar cámara existente
      //setCameras((prev) => prev.map((c) => (c.id === camera.id ? camera : c)));
    } else {
      // Crear nueva cámara
      setCameras((prev) => [
        ...prev,
        { ...camera, id: Date.now().toString() } // Asegurarse de que 'id' es obligatorio
      ]);
    }
    setModalVisible(false);
  };
  
  
  // Eliminar cámara
  const handleDeleteCamera = (id: string) => {
    Alert.alert("Eliminar Cámara", "¿Estás seguro?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", onPress: () => setCameras(cameras.filter((c) => c.id !== id)) }
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cameras}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CameraItem 
            camera={item} 
            onEdit={() => { setEditingCamera(item); setModalVisible(true); }}
            onDelete={handleDeleteCamera} 
          />
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => { setEditingCamera(null); setModalVisible(true); }}>
        <Text style={styles.addButtonText}>+ Agregar Cámara</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f8f9fa" },
  addButton: { backgroundColor: "#28a745", padding: 15, alignItems: "center", borderRadius: 8, marginTop: 10 },
  addButtonText: { color: "white", fontSize: 18, fontWeight: "bold" }
});

export default CamerasScreen;
