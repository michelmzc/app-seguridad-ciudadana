import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
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

  // Call hooks first (but be careful with userId if user is null)
  // So userId can be null or undefined here
  const userId = authContext.user ? authContext.user._id : null;
  

  const { goToMyLocation } = useUserLocation(setLocation, mapRef, userId);

  const fetchReports = async () => {
  try {
    const response = await getReports();
    if (response) setReports(response.data);
  } catch (error) {
    console.error("Failed to fetch reports:", error);
  }
};

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    console.log('AuthContext.user:', authContext.user);
    console.log('AuthContext.loading:', authContext.loading);
  }, [authContext.user, authContext.loading]);


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

  // Early return to avoid accessing `authContext.user._id` too soon
  if (authContext.loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
  ) ;
  }
  if (!authContext.user) return <LoginScreen />;
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