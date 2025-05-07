import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";
import CategorySelector from "./CategorySelector"; // Asegúrate de que la ruta sea correcta
import { sendReport } from "../../../api/reports"; // Asegúrate de que la ruta sea correcta
import { AuthContext } from "../../../api/auth/AuthContext"; // Importa el AuthContext

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
    const [mainCategory, setMainCategory] = useState<"Urgencia" | "Preventiva" | null>(null);
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
                    <Text style={styles.title}>Selecciona una categoría</Text>
                    {/* Categoría principal */}
                    <View style={styles.selectCategoryButton}>
                        {["Urgencia", "Preventiva"].map((type) => (
                            <TouchableOpacity
                                key={type}
                                onPress={() => setMainCategory(type as "Urgencia" | "Preventiva")}
                                style={{
                                    backgroundColor: mainCategory === type ? "royalblue" : "#ccc",
                                    padding: 15,
                                    borderRadius: 5,
                                    marginHorizontal:5
                                }}
                            >
                                <Text style={{ color: "white", fontWeight: "bold" }}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
  
                    { mainCategory && (
                        <CategorySelector
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            mainCategory={mainCategory}
                        />
                    )}

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
    title: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    selectCategoryButton: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        flexDirection:"row"
    }
});
