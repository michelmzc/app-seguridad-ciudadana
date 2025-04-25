import React, { useState, useEffect, useRef, useContext } from "react";
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
import ReportMarkers from "./components/ReportMarkers";
import { Report } from "../../types";
import { getReports } from "../../api/reports";
import { AuthContext } from "../../api/auth/AuthContext"; // Importa el AuthContext

const INITIAL_OSORNO_REGION: Region = {
  latitude: -40.5738,
  longitude: -73.1358,
  latitudeDelta: 0.05, // Zoom más amplio
  longitudeDelta: 0.05,
};

const MapScreen = () => {
  const [location, setLocation] = useState<Region>(INITIAL_OSORNO_REGION);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const mapRef = useRef<MapView>(null);
  const [reports, setReports] = useState<Report[]>([]);

  // Consume el contexto de autenticación de manera segura
  const authContext = useContext(AuthContext);

  // Asegurarnos de que el contexto no es null antes de acceder a user
  const userId = authContext?.user?.id || ""; // Si no hay usuario, se usa un string vacío

  useEffect(() => {
    const fetchReports = async () => {
      const response = await getReports();
      if (response) {
        setReports(response.data);
      }
    };
    fetchReports();
  }, []);

  const goToMyLocation = async () => {
    try {
      if (Platform.OS === "android") {
        const statusFine = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        const statusCoarse = await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
        if (statusFine !== RESULTS.GRANTED || statusCoarse !== RESULTS.GRANTED) {
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
          setLocation(newRegion);
          mapRef.current?.animateToRegion(newRegion, 1000);
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

  const handleRegionChangeComplete = (region: Region) => {
    setLocation(region);
  };

  // Función para actualizar los reportes después de enviar uno
  const updateReports = async () => {
    const response = await getReports();
    if (response) {
      setReports(response.data);
    }
  };

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider="google"
        style={styles.map}
        initialRegion={INITIAL_OSORNO_REGION}
        showsUserLocation={true}
        showsMyLocationButton={false}
        rotateEnabled={false}
        loadingEnabled={true}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        <ReportMarkers reports={reports} />
      </MapView>

      <View style={styles.markerFixed}>
        <Text style={styles.marker}>📍</Text>
      </View>

      <ReportModal
        visible={isModalVisible}
        closeModal={closeModal}
        selectedLocation={location}
        userId={userId}  // Pasar el userId desde el contexto
        updateReports={updateReports}  // Pasar la función para actualizar los reportes
      />

      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>CREAR REPORTE</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonMyLocation} onPress={goToMyLocation}>
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
  marker: { fontSize: 40 },
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
    right: 20,
    backgroundColor: "#4169e1",
    padding: 16,
    borderRadius: 100,
  },
});

export default MapScreen;
