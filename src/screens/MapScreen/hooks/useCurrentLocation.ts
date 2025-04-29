import { useRef } from "react";
import { Platform } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";
import MapView, { Region } from "react-native-maps";

export const useCurrentLocation = (setLocation: (loc: Region) => void) => {
  const mapRef = useRef<MapView>(null);

  const goToMyLocation = async () => {
    try {
      if (Platform.OS === "android") {
        const fine = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        const coarse = await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);

        if (fine !== RESULTS.GRANTED || coarse !== RESULTS.GRANTED) {
          const fineReq = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
          const coarseReq = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
          if (fineReq !== RESULTS.GRANTED || coarseReq !== RESULTS.GRANTED) return;
        }
      }

      Geolocation.getCurrentPosition(
        ({ coords }) => {
          const newRegion: Region = {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          };
          setLocation(newRegion);
          mapRef.current?.animateToRegion(newRegion, 1000);
        },
        (err) => console.error("Ubicación error:", err),
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
      );
    } catch (e) {
      console.warn("Error al obtener ubicación:", e);
    }
  };

  return { goToMyLocation, mapRef };
};
