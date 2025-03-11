import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from "react-native";
import MapView, { Region } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

const MapScreen = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  // Solicitar permisos y obtener ubicación inicial
  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Permiso de ubicación denegado");
          return;
        }
      }

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setSelectedLocation({ latitude, longitude }); // Inicializa la ubicación seleccionada
        },
        (error) => console.log("Error al obtener la ubicación:", error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestLocationPermission();
  }, []);

  // Función para capturar la ubicación al mover el mapa
  const handleRegionChangeComplete = (region: Region) => {
    setSelectedLocation({ latitude: region.latitude, longitude: region.longitude });
  };

  // Función para registrar la ubicación
  const registerLocation = () => {
    if (selectedLocation) {
      console.log(`Ubicación registrada:\nLat: ${selectedLocation.latitude}\nLng: ${selectedLocation.longitude}`);
      // Aquí podrías enviar los datos a una API o guardarlos en la app
    }
  };

  return (
    <View style={styles.container}>
      {/* Mapa */}
      <MapView
        provider="google"
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        rotateEnabled={false}
        loadingEnabled={true}
        initialRegion={{
          latitude: location?.latitude || -40.5738, // Centro por defecto (Osorno)
          longitude: location?.longitude || -73.1358,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onRegionChangeComplete={handleRegionChangeComplete} // Captura la ubicación en el centro del mapa
      />

      {/* Icono fijo en el centro del mapa */}
      <View style={styles.markerFixed}>
        <Text style={styles.marker}>📍</Text>
      </View>
      
      {/* Muestra las coordenadas seleccionadas
      <View style={styles.coordinatesContainer}>
        <Text style={styles.coordinatesText}>
          Lat: {selectedLocation?.latitude.toFixed(6)} | Lng: {selectedLocation?.longitude.toFixed(6)}
        </Text>
      </View>
      */}

      {/* Botón para registrar ubicación */}
      <TouchableOpacity style={styles.button} onPress={registerLocation}>
        <Text style={styles.buttonText}>CREAR REPORTE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
  markerFixed: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -12,
    marginTop: -24,
  },
  marker: { fontSize: 40 }, // Icono en el centro del mapa
  coordinatesContainer: {
    position: "absolute",
    top: 20,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 10,
  },
  coordinatesText: { color: "#fff", fontSize: 14 },
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

export default MapScreen;
