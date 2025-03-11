import React, { useState } from "react";
import {View, Text, TextInput, TouchableOpacity, Modal, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      modalContainer: {
        backgroundColor: "white",
        padding: 20,
        width: "80%",
        borderRadius: 10,
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
      },
      input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
      },
      closeButton: {
        backgroundColor: "red",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 10,
      },
      button: {
        position: "absolute",
        bottom: 30,
        alignSelf: "center",
        backgroundColor: "#4169e1",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
      },
      buttonText: { color: "white", fontSize: 17, fontWeight: "bold" },
});

type ModalProps = { 
    visible: boolean,
    selectedLocation: { latitude: number; longitude: number } | null,
    closeModal: () => void;
}
// Función para mostrar el modal

{/* Modal con formulario */}
const ReportModal = (props: ModalProps) =>{
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reportDescription, setReportDescription] = useState("");
    const [category, setCategory] = useState("");
    
      // Función para manejar el envío del reporte
      const submitReport = () => {
        if (reportDescription && category) {
          console.log("Reporte enviado:");
          console.log("Ubicación:", props.selectedLocation);
          console.log("Descripción:", reportDescription);
          console.log("Categoría:", category);
          
          setReportDescription(reportDescription);
          setCategory(category);
          
          // Aquí puedes enviar el reporte a tu backend usando una API REST
    
          // Después de enviar, cerrar el modal
          props.onClose();

          return true;
        } else {
          console.log("Por favor, completa todos los campos.");
          return false;
        }
      }
    // Función para abrir el moda
    const openModal = () => {
        setIsModalVisible(true);
    };
    // Función para cerrar el modal 
    const closeModal = () => {
        setIsModalVisible(false);
    };
    return (
       <Modal visible={props.visible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Crear Reporte</Text>

            {/* Descripción */}
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={reportDescription}
              onChangeText={setReportDescription}
            />

            {/* Categoría */}
            <TextInput
              style={styles.input}
              placeholder="Categoría (Ej. Aceras, Luminarias)"
              value={category}
              onChangeText={setCategory}
            />

            {/* Botón para tomar foto */}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Subir foto o tomar foto</Text>
            </TouchableOpacity>

            {/* Botón de enviar */}
            <TouchableOpacity style={styles.button} onPress={submitReport}>
              <Text style={styles.buttonText}>ENVIAR REPORTE</Text>
            </TouchableOpacity>

            {/* Botón para cerrar el modal */}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.buttonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
}

export default ReportModal;