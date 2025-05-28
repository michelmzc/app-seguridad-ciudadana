import messaging from '@react-native-firebase/messaging'
import Geolocation from '@react-native-community/geolocation';

export async function requestNotificationPermissionAndToken() {
    const authStatus = await messaging().requestPermission();
    const enabled = 
        authStatus === messaging.AuthorizationStatus.AUTHORIZED || 
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
        if (enabled) {
            const token = await messaging().getToken();
            console.log('FCM Token:', token);
            return token;
        }
        return null;
}

async function sendUserDataToBackend(fcmToken: string) {
  Geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      await fetch('https://backend-seguridad-ciudadana.onrender.com/users/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fcmToken, latitude, longitude }),
      });
    },
    (error) => console.error(error),
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
}