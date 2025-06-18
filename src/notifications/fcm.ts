import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { Alert, Platform } from 'react-native';
import axios from '../api/axios'

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

    await axios.post('/fcm/register', {
      token,
      userId,
      platform: 'android'
    });

    // Registrar token con backend
    /*
    await fetch('https://backend-seguridad-ciudadana.onrender.com/fcm/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        token,
        userId,
        platform: 'android',
      }),
    });
    */

    
    // Crear canal de notificación (solo se necesita una vez)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Canal predeterminado',
      importance: AndroidImportance.HIGH,
    });
    console.log('Canal de notificación creado:', channelId);

    // Listener para mensajes en foreground
    messaging().onMessage(async remoteMessage => {
      console.log('🔔 Mensaje recibido en foreground:', remoteMessage);
      await notifee.requestPermission();
      await notifee.displayNotification({
        title: remoteMessage.notification?.title || 'Notificación',
        body: remoteMessage.notification?.body || '',
        android: {
          channelId: 'default',
          sound: 'default',
          importance: AndroidImportance.HIGH,
          smallIcon: 'ic_launcher', // asegúrate de tener este icono en Android
        },
      });
    });

  } catch (error) {
    console.log('Error inicializando FCM', error);
  }
};
