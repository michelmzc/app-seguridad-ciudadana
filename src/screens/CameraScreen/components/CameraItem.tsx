import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "../../../types";

interface CameraItemProps {
  camera: Camera;
  onEdit: () => void;
  onDelete: (id: string) => void;
  sharedBy?: string;
}

const CameraItem: React.FC<CameraItemProps> = ({ camera, onEdit, onDelete }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.cameraItem}>
      <Text style={styles.cameraName}>📷 {camera.name}</Text>
      {camera.sharedBy && ( <Text style={styles.sharedBy}>{camera.sharedBy}</Text> )}

      
      <View style={styles.actions}>
        { /* }
        <TouchableOpacity onPress={onEdit} style={styles.button}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete(camera.id)} style={styles.buttonDelete}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
        { */}
        <TouchableOpacity
          onPress={() => navigation.navigate("CameraStream", { camera })}
          style={styles.buttonStream}
        >
          <Text style={styles.buttonText}>Ver transmisión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  cameraName: { fontSize: 16, fontWeight: "bold" },
  cameraStreamUrl: { fontSize: 14, color: "#555" },
  actions: { flexDirection: "row", marginTop: 10, gap: 10 },
  button: { backgroundColor: "#007bff", padding: 8, borderRadius: 5 },
  buttonDelete: { backgroundColor: "#dc3545", padding: 8, borderRadius: 5 },
  buttonStream: { backgroundColor: "#28a745", padding: 8, borderRadius: 5 },
  buttonText: { color: "white", fontWeight: "bold" },
  sharedBy: {
    fontSize: 13,
    color: "#6c757d",
    fontStyle: "italic",
    marginBottom: 4,
  }
  
});

export default CameraItem;
