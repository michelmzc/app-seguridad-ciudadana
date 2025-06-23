import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import CategorySelector from "./CategorySelector"; // Asegúrate de que la ruta sea correcta
import { sendReport, shareUserCameras } from "../../../api/reports"; // Asegúrate de que la ruta sea correcta
import { AuthContext } from "../../../api/auth/AuthContext"; // Importa el AuthContext
import { makeCameraPublic } from "../../../api/cameras";


type ModalProps = { 
    visible: boolean;
    selectedLocation: { latitude: number; longitude: number } | null;
    closeModal: () => void;
    userId: any; // Agrega userId aquí
    updateReports: () => Promise<void>; // Si deseas pasar una función para actualizar los reportes
}

const ReportModal = ({ visible, selectedLocation, closeModal, updateReports }: ModalProps) => {
    const { user } = useContext(AuthContext); // Obtén el user del contexto global
    const [reportDescription, setReportDescription] = useState("");
    const [mainCategory, setMainCategory] = useState<"Emergencia" | "Preventiva" | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [shareCameras, setShareCameras] = useState(false);
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
        if (!reportDescription || !selectedCategory || !selectedLocation || !user) {
            console.log("Por favor, completa todos los campos.");
            setSuccess(false);
            setShowConfirmationModal(true);
            return;
        }

        try {
            // Usamos el userId del contexto en vez de un ID hardcodeado
            await sendReport({
                text: reportDescription,
                category: selectedCategory,
                location: selectedLocation,
                userId: user._id, // Usamos user._id si el usuario tiene un campo _id
            });

            console.log("Reporte enviado correctamente");

            // Llamar a updateReports para actualizar los reportes en el mapa
            await updateReports();

            setSuccess(true);

            if (shareCameras){
                for (const camera of user.cameras){
                    await makeCameraPublic(camera._id);
                }
            }
        } catch (error: any) {
            console.log("Error al enviar el reporte:", error?.message ?? error);
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

                    <TouchableOpacity
                        style={styles.checkboxContainer}
                        onPress={() => setShareCameras(prev => !prev)}
                        >
                        <View style={[styles.checkbox, shareCameras && styles.checkboxChecked]}>
                            {shareCameras && (
                            <Icon name="checkmark" size={16} color="white" />
                            )}
                        </View>
                        <Text style={styles.checkboxLabel}>
                            Compartir mis cámaras durante 1 hora
                        </Text>
                        </TouchableOpacity>

                    <Text style={styles.title}>Selecciona una categoría</Text>
                    {/* Categoría principal */}
                    <View style={styles.selectCategoryButton}>
                        {["Emergencia", "Preventiva"].map((type) => (
                            <TouchableOpacity
                                key={type}
                                onPress={() => setMainCategory(type as "Emergencia" | "Preventiva")}
                                style={{
                                    backgroundColor: mainCategory === type ? "royalblue" : "#ccc",
                                    padding: 8,
                                    borderRadius: 5,
                                    marginHorizontal:5,
                                    marginBottom:5
                                }}
                            >
                                <Text style={{ color: "white", fontWeight: "bold" }}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    
                    { mainCategory && (
                        <CategorySelector
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            mainCategory={mainCategory}
                        />
                    )}
                    </View>
  
                    
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
        flexDirection: "column",
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
        flex:1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        
    },
    confirmationBox: {
        width:"80%",
        maxWidth:"80%",
        maxHeight: "15%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        flex: 1
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
    title: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    selectCategoryButton: {
        justifyContent: "center",
        alignContent: "center",
        flexDirection:"column"
    },
    checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
    },
    checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "royalblue",
    marginRight: 10,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white", // recuadro blanco por defecto
    },
    checkboxChecked: {
    backgroundColor: "royalblue", // se pone azul cuando está checkeado
    },
    checkboxLabel: {
    fontSize: 14,
    color: "#333",
}

});
