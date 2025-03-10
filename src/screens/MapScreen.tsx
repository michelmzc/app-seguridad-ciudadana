import React, {useState, useEffect} from "react";
import {PermissionsAndroid, Platform, StyleSheet} from "react-native";
import MapView, {Marker} from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });

function getInitialState(){
  return {
    region: {
      latitude:  -40.5742,
      longitude: -73.1336,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    }
  }
}


const MapScreen = () => {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  
    useEffect(() => {
      const requestLocationPermission = async () => {
        if (Platform.OS === "android"){
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED){
            console.log("Permiso de ubicación denegado");
            return;
          }
        }
      

        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({latitude, longitude});
            console.log(position);
          },
          (error) => console.log("Error al obtener la ubicación:", error),
          { enableHighAccuracy: true, timeout:15000, maximumAge:10000 }
        );
      };
      requestLocationPermission();
    }, []);


    return(
      <MapView
          provider="google"
          style={styles.map}
          googleMapId="c43c633a2f9311f8" // solo funciona en android
          showsUserLocation={true}
          showsMyLocationButton={true}
          rotateEnabled={false}
          loadingEnabled={true}
          region={{
            latitude: location?.latitude || -40.573852935025464,
            longitude: location?.longitude || -73.1358395458682,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          {/* location && <Marker coordinate={location} title="Tu ubicación" /> */}
      </MapView>
    )
  }

export default MapScreen;