import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";
import CategorySelector from "./CategorySelector";
import { sendReport } from "../../../api/reports";

type ModalProps = { 
    visible: boolean,
    selectedLocation: { latitude: number; longitude: number } | null,
    closeModal: () => void;
}

const ReportModal = ({ visible, selectedLocation, closeModal }: ModalProps) => {    
    const [reportDescription, setReportDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [success, setSuccess] = useState<boolean | null>(null);

    // Resetear estado cuando se abre el modal
    useEffect(() => {
        if (visible) {
            setReportDescription("");
            setSelectedCategory(null);
            setShowConfirmationModal(false);
            setSuccess(null);
        }
    }, [visible]);

    // Función para manejar el envío del reporte
    const submitReport = async () => {

        const userId = "67feaf4b8f2ae8f973b5ca92"
        if (!reportDescription || !selectedCategory || !selectedLocation) {
            console.log("Por favor, completa todos los campos.");
            setSuccess(false);
            setShowConfirmationModal(true);
            return;
        }

        try {
            await sendReport({
                text: reportDescription,
                category: selectedCategory,
                location: selectedLocation,
                userId: userId
            });

            console.log("Reporte enviado correctamente");
            setSuccess(true);
        } catch (error) {
            console.error("Error al enviar el reporte", error);
            setSuccess(false);
        }

        setShowConfirmationModal(true);
    };

    // Cierra el modal de confirmación y también el modal principal
    const handleCloseModal = () => {
        setShowConfirmationModal(false);
        closeModal();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Crear Reporte</Text>

                    {/* Descripción */}
                    <TextInput
                        style={styles.input}
                        placeholder="Descripción del reporte"
                        multiline
                        numberOfLines={6}
                        maxLength={1000}
                        value={reportDescription}
                        onChangeText={setReportDescription}
                    />

                    {/* Categoría */}
                    <CategorySelector 
                        selectedCategory={selectedCategory} 
                        setSelectedCategory={setSelectedCategory}
                    />

                    {/* Botones */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Text style={styles.buttonText}>Cerrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={submitReport}>
                            <Text style={styles.buttonText}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Modal de Confirmación */}
            <Modal visible={showConfirmationModal} transparent animationType="fade">
                <View style={styles.confirmationContainer}>
                    <View style={styles.confirmationBox}>
                        <Text style={styles.confirmationText}>
                            {success ? "✅ Reporte enviado con éxito" : "❌ Error al enviar reporte"}
                        </Text>
                        <TouchableOpacity onPress={handleCloseModal}>
                            <Text style={styles.confirmationButton}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </Modal>
    );
};

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
        height: 120,
        borderWidth: 2,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        textAlignVertical: "top",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    closeButton: {
        backgroundColor: "crimson",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    button: {
        backgroundColor: "royalblue",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 17,
        fontWeight: "bold",
    },
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
