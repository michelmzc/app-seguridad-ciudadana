import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import MapView, { Region } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import Icon from "react-native-vector-icons/Ionicons";

import ReportModal from "./components/ReportModal";

const MapScreen = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const mapRef = useRef<MapView>(null);

  // Solicitar permisos y obtener ubicación inicial

  const goToMyLocation = async () => {
    try {
      if (Platform.OS === "android") {
        const statusFineLocation = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        const statusCoarseLocation = await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);

        if (
          statusFineLocation !== RESULTS.GRANTED ||
          statusCoarseLocation !== RESULTS.GRANTED
        ) {
          const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
          const grantedCoarse = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);

          if (granted !== RESULTS.GRANTED || grantedCoarse !== RESULTS.GRANTED) {
            console.log("❌ Permisos de ubicación denegados");
            return;
          }
        }
      }

      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newRegion: Region = {
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          };
          setLocation({ latitude, longitude });
          mapRef.current?.animateToRegion(newRegion, 1000);
          console.log("📍 Ubicación actual:", latitude, longitude);
        },
        (error) => {
          console.log("❌ Error al obtener la ubicación:", error.message);
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
      );
    } catch (error) {
      console.warn("⚠️ Error inesperado:", error);
    }
  };

  // Función para capturar la ubicación al mover el mapa
  const handleRegionChangeComplete = (region: Region) => {
    setLocation({ latitude: region.latitude, longitude: region.longitude });
  };

  // Función para abrir el modal
  const openModal = () => {
    setIsModalVisible(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Mapa */}
      <MapView
        ref={mapRef}
        provider="google"
        style={styles.map}
        googleMapId="c43c633a2f9311f8"
        showsUserLocation={true}
        showsMyLocationButton={true}
        rotateEnabled={false}
        loadingEnabled={true}
        initialRegion={{
          latitude: location?.latitude || -40.5738, // Centro por defecto (Osorno)
          longitude: location?.longitude || -73.1358,
          latitudeDelta: 0.0001,
          longitudeDelta: 0.0001,
        }}
        onRegionChangeComplete={handleRegionChangeComplete} // Captura la ubicación en el centro del mapa
      />

      {/* Icono fijo en el centro del mapa */}
      <View style={styles.markerFixed}>
        <Text style={styles.marker}>📍</Text>
      </View>

      {/* Modal de reporte */}
      <ReportModal visible={isModalVisible} closeModal={closeModal} selectedLocation={location} />

      {/* Botón para crear reporte */}
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>CREAR REPORTE</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonMyLocation]} onPress={goToMyLocation}>
        <Icon name="locate-sharp" color="white" size={26} />
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
  buttonMyLocation: {
    position: "absolute",
    bottom: 20,
    alignSelf: "flex-end",
    backgroundColor: "#4169e1",
    paddingVertical: 25,
    paddingHorizontal: 25,
    borderRadius: 100,
    marginRight: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default MapScreen;
