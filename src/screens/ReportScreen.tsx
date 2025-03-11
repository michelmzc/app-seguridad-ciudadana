import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'; // Importa la librería

const ReportScreen = ({ navigation }: any) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');

  const categories = [
    { label: 'Aceras', value: 'aceras' },
    { label: 'Luminarias', value: 'luminarias' },
    { label: 'Otros', value: 'otros' },
  ];

  // Manejadores de eventos
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleSubmit = async () => {
    if (!selectedCategory || !description) {
      Alert.alert('Error', 'Por favor complete todos los campos.');
      return;
    }

    try {
      // Simulando una llamada a API
      const reportData = {
        description,
        selectedCategory,
        location: { latitude: 40.7128, longitude: -74.0060 }, // Agrega coordenadas de ubicación, ejemplo en NY
      };
      
      console.log('Reporte enviado:', reportData);

      // Aquí iría la lógica de la API (por ejemplo, fetch o axios para hacer la solicitud POST)
      // const response = await fetch('API_URL', { method: 'POST', body: JSON.stringify(reportData) });

      // Ejemplo de respuesta exitosa
      Alert.alert('Reporte Enviado', 'Gracias por tu reporte.');

      // Regresar a la pantalla del mapa (si se desea)
      navigation.goBack();
    } catch (error) {
      console.log('Error al enviar el reporte', error);
      Alert.alert('Error', 'Hubo un problema al enviar el reporte.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Reporte</Text>

      {/* Picker para elegir categoría */}
      <RNPickerSelect
        onValueChange={handleCategoryChange}
        items={categories}
        value={selectedCategory}
        placeholder={{
          label: 'Seleccione una categoría...',
          value: null,
        }}
        style={{
          inputAndroid: styles.pickerInput,
          inputIOS: styles.pickerInput,
        }}
      />

      {/* Campo de descripción */}
      <TextInput
        style={styles.input}
        placeholder="Descripción del reporte..."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      {/* Botón para enviar el reporte */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar Reporte</Text>
      </TouchableOpacity>

      {/* Botón para volver al mapa (opcional) */}
      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Volver al Mapa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pickerInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4169e1',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReportScreen;
