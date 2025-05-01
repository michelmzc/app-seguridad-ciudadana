import React, { useState, useEffect, useContext, useRef } from "react";
import { View, StyleSheet } from "react-native";
import  MapView, { Region } from "react-native-maps";
import { Report } from "../../types";
import { getReports } from "../../api/reports";
import { AuthContext } from "../../api/auth/AuthContext";

import ReportModal from "./components/ReportModal";
import ReportButton from "./components/ReportButton";
import MyLocationButton from "./components/MyLocationButton";
import CenteredMarker from "./components/CenteredMarker";
import useUserLocation from "./hooks/useUserLocation";
import MapViewComponent from "./components/MapViewComponent";
import RadarMarker from "./components/RadarMarker";


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
  const mapRef = useRef<MapView>(null);
  // Consume el contexto de autenticación de manera segura
  const authContext = useContext(AuthContext);
  // Asegurarnos de que el contexto no es null antes de acceder a user
  const userId = authContext?.user?.id || ""; // Si no hay usuario, se usa un string vacío
  const { goToMyLocation } = useUserLocation(setLocation, mapRef);

  const fetchReports = async () => {
    const response = await getReports();
    if (response) setReports(response.data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Función para actualizar los reportes después de enviar uno
  const updateReports = async () => {
    const response = await getReports();
    if (response) {
      setReports(response.data);
    }
  };

  return (
    <View style={styles.container}>
      <MapViewComponent 
        ref={mapRef}
        location={location}
        setLocation={setLocation}
        reports={reports}
      />

      <CenteredMarker />

      <RadarMarker center={{ latitude: -40.5738, longitude: -73.1358 }} radius={70} />

      <ReportModal
        visible={isModalVisible}
        closeModal={() => setIsModalVisible(false)}
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
  container: { flex: 1 }
});

export default MapScreen;