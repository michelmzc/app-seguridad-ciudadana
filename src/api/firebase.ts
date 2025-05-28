import messaging from '@react-native-firebase/messaging'

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

async function sendUserLocationToBackend(fcmToken: string, latitude: number, longitude: number){
    await fetch('https://backend-seguridad-ciudadana.onrender.com/users/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fcmToken, latitude, longitude }),
      });
}