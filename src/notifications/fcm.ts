import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

export const initializeFCM = async (userId: string) => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =  
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) {
      Alert.alert('Permiso para notificaciones denegado');
      return;
    }

    const token = await messaging().getToken();
    console.log('Token FCM:', token);

    await fetch('https://backend-seguridad-ciudadana.onrender.com/fcm/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        token,
        userId,
        platform: 'android',
      }),
    });

    messaging().onMessage(async remoteMessage => {
      Alert.alert('Notificación:', JSON.stringify(remoteMessage.notification));
    });
  } catch (error) {
    console.log('Error inicializando FCM', error);
  }
};
