
import React, {ReactNode, useEffect} from "react";
import { View, StatusBar, StyleSheet, Platform} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppNavigator from "./navigation/StackNavigator";
import { AuthProvider } from "./api/auth/AuthContext";

import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

interface StandardContainerProps{
  children: ReactNode;
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Ocupa toda la pantalla pero respeta márgenes seguros
  },
  container: {
    flex: 1, // Permite que el contenido crezca dentro del área segura
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Evita solapamiento en Android
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });

const StandardContainer: React.FC<StandardContainerProps> = ({ children }) => {
  return(
          <SafeAreaView style={ [styles.safeArea] }>
            <View style={styles.container}>
              { children } 
            </View>
          </SafeAreaView>
  )
}


const App = () => {
  useEffect(() => {
    const setupFCM = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled = 
      authStatus === messaging.AuthorizationStatus.AUTHORIZED || 
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);

        fetch('http://backend-seguridad-ciudadana.onrender.com:3000/fcm/register', {
          method: 'POST',
          headers: {'Contet-Type':'application/json'},
          body: JSON.stringify({token})
        });
      } else {
        Alert.alert('Permiso para notificaciones denegado');
      }
    };
    setupFCM();
  }, []);

  useEffect(() => {
    const unsuscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('Nueva notificación', JSON.stringify(remoteMessage.notification))
    });
    return unsuscribe;
  });

  return (
    <AuthProvider>
      <StandardContainer>
          <AppNavigator />
      </StandardContainer>
    </AuthProvider>
  );
};

export default App;