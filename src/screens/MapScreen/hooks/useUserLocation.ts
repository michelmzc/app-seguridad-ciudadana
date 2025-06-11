import { useCallback } from "react";
import { Platform, PermissionsAndroid } from "react-native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";
import { Region } from "react-native-maps";
import { updateUserLocation } from "../../../api/users";

const useUserLocation = (
  setLocation: (region: Region) => void,
  mapRef: React.RefObject<any>,
  userId: string
) => {
  const goToMyLocation = useCallback(async () => {
    try {
      if (Platform.OS === "android") {
        const fine = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (fine !== RESULTS.GRANTED) {
          const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
          if (result !== RESULTS.GRANTED) return;
        }
      }

      Geolocation.getCurrentPosition(
        ({ coords }) => {
          const region = {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          };
          setLocation(region);
          mapRef.current?.animateToRegion(region, 1000);
          console.log('Intentando actualizar ubicación con:', { userId, lat: coords.latitude, lon: coords.longitude });

          if (userId) {
            updateUserLocation(userId, coords.latitude, coords.longitude)
              .then(() => console.log('Ubicación actualizada'))
              .catch(err => {
                  console.error('Error actualizando ubicación', err?.message || err);
                  if (err instanceof Error) {
                    console.error(err.stack);
                  }
                }
              );
          }
        },
        (err) => console.log("Ubicación error:", err.message),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (e) {
      console.warn("Error geolocalización:", e);
    }
  }, [mapRef, setLocation]);

  return { goToMyLocation };
};

export default useUserLocation;
