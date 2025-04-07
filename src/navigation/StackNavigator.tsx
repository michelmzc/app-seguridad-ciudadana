import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import  BottomNavigator  from "./AppNavigator"; // Tu navegación principal con pestañas
import CameraStreamScreen from "../screens/CameraScreen/components/CameraStreamScreen";
import { Camera } from "../types";
import LoginScreen from "../screens/auth/LoginScreen";
import ProfileScreen from "../screens/auth/ProfileScreen";
import { useAuth } from "../api/auth/useAuth";

// Definir los tipos de navegación
export type RootStackParamList = {
  Tabs: undefined; // contiene el BottomTabNavigator
  CameraStream: { camera: Camera }; // pantalla extra fuera del TabNavigator
  Login: undefined;  // contiene la pantalla de login
  Profile: undefined; // contiene la pantalla de perfil
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { user } = useAuth(); 

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }} >
          {!user ? (
            // si no hay usuario mostrar login 
            <Stack.Screen name="Login" component={LoginScreen} />
          ) : (
            // si hay usuario, mostrar las pantallas internas
            <>
              <Stack.Screen name="Tabs" component={BottomNavigator} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="CameraStream" component={CameraStreamScreen} />
            </>
          )}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
