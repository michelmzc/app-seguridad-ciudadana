import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import  MapView, { Region } from "react-native-maps";
import { useFocusEffect } from "@react-navigation/native";

import { Report } from "../../types";
import { getReports } from "../../api/reports";
import { AuthContext } from "../../api/auth/AuthContext";

import ReportModal from "./components/ReportModal";
import ReportButton from "./components/ReportButton";
import MyLocationButton from "./components/MyLocationButton";
import CenteredMarker from "./components/CenteredMarker";
import useUserLocation from "./hooks/useUserLocation";
import MapViewComponent from "./components/MapViewComponent";
import LoginScreen from "../auth/LoginScreen";


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

  const authContext = useContext(AuthContext);

  if (authContext.loading) return null; // o un spinner

  if (!authContext.user) return null; // o redirigí al login

  const userId = authContext.user._id;
  useEffect(() => {
    console.log('AuthContext.user:', authContext.user);
    console.log('AuthContext.loading:', authContext.loading);
  }, [authContext.user, authContext.loading]);

  const { goToMyLocation } = useUserLocation(setLocation, mapRef, userId);

  const fetchReports = async () => {
    const response = await getReports();
    if (response) setReports(response.data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchReports();
    }, [])
  );
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