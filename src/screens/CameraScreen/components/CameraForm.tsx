import React, { useState, useEffect } from "react";
import { Modal, View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Camera } from "@types";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (camera: Omit<Camera, "id"> & { id?: string }) => void;
  camera: Camera | null;
}

const CameraForm: React.FC<Props> = ({ visible, onClose, onSave, camera }) => {
  const [name, setName] = useState<string>("");
  const [streamUrl, setStreamUrl] = useState<string>("");

  useEffect(() => {
    if (camera) {
      setName(camera.name);
      setStreamUrl(camera.streamUrl);
    } else {
      setName("");
      setStreamUrl("");
    }
  }, [camera]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{camera ? "Editar Cámara" : "Nueva Cámara"}</Text>
          
          <TextInput 
            style={styles.input} 
            placeholder="Nombre" 
            value={name} 
            onChangeText={setName} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="URL de Stream" 
            value={streamUrl} 
            onChangeText={setStreamUrl} 
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.saveButton} 
              onPress={() => onSave({ id: camera?.id, name, streamUrl })}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContainer: { backgroundColor: "white", padding: 20, borderRadius: 10, width: "80%" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 10, borderRadius: 5 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between" },
  cancelButton: { backgroundColor: "#6c757d", padding: 10, borderRadius: 5 },
  saveButton: { backgroundColor: "#28a745", padding: 10, borderRadius: 5 },
  buttonText: { color: "white", fontWeight: "bold" }
});

export default CameraForm;
