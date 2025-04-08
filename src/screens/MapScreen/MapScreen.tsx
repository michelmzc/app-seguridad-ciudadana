import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from "react-native";
import MapView, { Region } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import Icon from 'react-native-vector-icons/Ionicons'

import ReportModal from "./components/ReportModal";


const MapScreen = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const mapRef = useRef<MapView>(null);
  
  // solicitar permisos y obtener ubicación inicial
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
        },
        (error) => console.log("Error al obtener la ubicación:", error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestLocationPermission();
    
  }, []);

  const goToMyLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED){
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
          { enableHighAccuracy: true, timeout:15000, maximumAge: 10000 }
        );
      } else {
        console.log("Permiso de ubicación denegado.");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  // Función para capturar la ubicación al mover el mapa
  const handleRegionChangeComplete = (region: Region) => {
    setLocation({ latitude: region.latitude, longitude: region.longitude });
  };
  
  // Función para abrir el moda
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
      <ReportModal
        visible={isModalVisible}
        closeModal={closeModal}
        selectedLocation={location}
      />

      {/* Botón para crear reporte */}
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>CREAR REPORTE</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonMyLocation]}
        onPress={goToMyLocation}>
           <Icon name="locate-sharp" color="white" size={26}/>
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
    fontSize:20,
    fontWeight: "bold"
  },
});

export default MapScreen;
