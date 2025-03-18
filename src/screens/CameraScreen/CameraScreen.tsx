import React, { useState } from "react";
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import CameraItem from "./components/CameraItem";
import CameraForm from "./components/CameraForm";
import { Camera } from "../../types";

const CamerasScreen: React.FC = () => {
  const [cameras, setCameras] = useState<Camera[]>([
    { id: "1", name: "Cámara 1", streamUrl: "rtsp://example.com/stream1" },
    { id: "2", name: "Cámara 2", streamUrl: "rtsp://example.com/stream2" }
  ]);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingCamera, setEditingCamera] = useState<Camera | null>(null);

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

      <CameraForm 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        onSave={handleSaveCamera} 
        camera={editingCamera} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f8f9fa" },
  addButton: { backgroundColor: "#28a745", padding: 15, alignItems: "center", borderRadius: 8, marginTop: 10 },
  addButtonText: { color: "white", fontSize: 18, fontWeight: "bold" }
});

export default CamerasScreen;
