import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import  { Region } from "react-native-maps";
import { Report } from "../../types";
import { getReports } from "../../api/reports";
import { AuthContext } from "../../api/auth/AuthContext";

import ReportModal from "./components/ReportModal";
import ReportButton from "./components/ReportButton";
import MyLocationButton from "./components/MyLocationButton";
import CenteredMarker from "./components/CenteredMarker";
import { useCurrentLocation  } from "./hooks/useCurrentLocation";
import MapViewComponent from "./components/MapViewComponent";


const INITIAL_OSORNO_REGION: Region = {
  latitude: -40.5738,
  longitude: -73.1358,
  latitudeDelta: 0.05, // Zoom más amplio
  longitudeDelta: 0.05,
};

const MapScreen = () => {
  const [location, setLocation] = useState<Region>(INITIAL_OSORNO_REGION);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);

  // Consume el contexto de autenticación de manera segura
  const authContext = useContext(AuthContext);

  // Asegurarnos de que el contexto no es null antes de acceder a user
  const userId = authContext?.user?.id || ""; // Si no hay usuario, se usa un string vacío
  const { goToMyLocation, mapRef } = useCurrentLocation(setLocation);

  useEffect(() => {
    const fetchReports = async () => {
      const response = await getReports();
      if (response) {
        setReports(response.data);
      }
    };
    fetchReports();
  }, []);


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
      <MapViewComponent 
        ref={mapRef}
        location={location}
        setLocation={setLocation}
        reports={reports}
      />

      <CenteredMarker />

      <ReportModal
        visible={isModalVisible}
        closeModal={closeModal}
        selectedLocation={location}
        userId={userId}  // Pasar el userId desde el contexto
        updateReports={updateReports}  // Pasar la función para actualizar los reportes
      />
      
      <ReportButton onPress={() => setIsModalVisible(true)} />

      <MyLocationButton onPress={goToMyLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
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
