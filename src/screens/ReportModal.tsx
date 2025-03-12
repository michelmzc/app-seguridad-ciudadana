import React, { useState } from "react";
import {View, Text, TextInput, TouchableOpacity, Modal, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import CategorySelector from "./components/CategorySelector";

type ModalProps = { 
    visible: boolean,
    selectedLocation: { latitude: number; longitude: number } | null,
    closeModal: () => void;
}


const ReportModal = (props: ModalProps) =>{
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reportDescription, setReportDescription] = useState("");
    const [category, setCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [success, setSuccess] = useState<boolean | null>(null);

    // Función para manejar el envío del reporte
    const submitReport = () => {
        if (reportDescription && selectedCategory) {
          console.log("Reporte enviado:");
          console.log("Ubicación:", props.selectedLocation);
          console.log("Descripción:", reportDescription);
          console.log("Categoría:", selectedCategory);
          
          setReportDescription(reportDescription);
          setCategory(category);
          
          // Aquí puedes enviar el reporte a tu backend usando una API REST
    
          // Después de enviar, cerrar el modal
          //props.closeModal();
          setSuccess(true); // Guarda si el envío fue exitoso o no
          setShowConfirmationModal(true); // Muestra el modal de confirmación
          return true;
        } else {
          console.log("Por favor, completa todos los campos.");
          setSuccess(false); // Guarda si el envío fue exitoso o no
          setShowConfirmationModal(false); // Muestra el modal de confirmación
          return false;
        }
    }
    // Función para abrir el modal
    const openModal = () => {
        setIsModalVisible(true);
    };
    // Función para cerrar el modal 
    const closeModal = () => {
      setShowConfirmationModal(false)
      setIsModalVisible(false)
        
    };
    return (
       <Modal visible={props.visible} animationType="slide" transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Crear Reporte</Text>

            {/* Descripción */}
            <TextInput
              style={styles.input}
              placeholder="Descripción del reporte"
              multiline={true}
              numberOfLines={20}
              maxLength={1000}
              value={reportDescription}
              onChangeText={setReportDescription}
            />

            <View style={styles.buttonContainer}>

              <View style={styles.buttonTop}>
                {/*
                <TouchableOpacity>
                  <Icon name="image" color="#676767" size={34}/>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="camera" color="#676767" size={34}/>
                </TouchableOpacity>
                */}
              </View>

              {/* Categoría */}
              <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}></CategorySelector>
              
              <View style={styles.buttonBot}>
                {/* Botón para cerrar el modal */}
                <TouchableOpacity style={styles.closeButton} onPress={props.closeModal}>
                  <Text style={styles.buttonText}>Cerrar</Text>
                </TouchableOpacity>
                {/* Botón de enviar */}
                <TouchableOpacity style={styles.button} onPress={submitReport}>
                  <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </View>
        {/* MODAL DE CONFIRMACIÓN */}
      <Modal visible={showConfirmationModal} transparent animationType="fade">
        <View style={styles.confirmationContainer}>
          <View style={styles.confirmationBox}>
            <Text style={styles.confirmationText}>
              {success ? "✅ Reporte enviado con éxito" : "❌ Error al enviar reporte"}
            </Text>
            <TouchableOpacity onPress={() => props.closeModal()}>
              <Text style={styles.confirmationButton}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </Modal>
    )
}           

export default ReportModal;

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
      width: "90%",
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },
    input: {
      height: 200,
      borderWidth: 2,
      borderColor: "#ccc",
      padding: 5,
      marginBottom: 5,
      borderRadius: 5,
      textAlignVertical:"top"
    },
    buttonContainer: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    buttonTop: {
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    buttonBot: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    closeButton: {
      backgroundColor: "crimson",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignSelf: "center",
    },
    button: {
      backgroundColor: "royalblue",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      margin: 5
    },
    buttonText: { color: "white", fontSize: 17, fontWeight: "bold" },
    confirmationContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    confirmationBox: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    },
    confirmationText: {
      fontSize: 16,
      marginBottom: 10,
    },
    confirmationButton: {
      color: "#4169e1",
      fontSize: 16,
      fontWeight: "bold",
    },
});