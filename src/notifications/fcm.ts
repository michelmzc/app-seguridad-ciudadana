import messaging from '@react-native-firebase/messaging'
import { AuthContext } from 'api/auth/AuthContext';
import { Alert } from 'react-native'

export const initializeFCM = async() => {
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

        // enviar el "token" a backend
        fetch('https://backend-seguridad-ciudadana.onrender.com/fcm/register', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ 
                "token": token,
                "userId": "67feaf4b8f2ae8f973b5ca92",
                "platform":"android"
            })
        });

        // listener para mensajes en foreground
        messaging().onMessage(async remoteMessage => {
            Alert.alert('Notificación:', JSON.stringify(remoteMessage.notification));
        });        
    } catch (error) {
        console.log('Error inicializando FCM', error);
    }
};