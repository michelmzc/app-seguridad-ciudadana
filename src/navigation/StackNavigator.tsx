import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import  BottomNavigator  from "./AppNavigator"; // Tu navegación principal con pestañas
import CameraStreamScreen from "../screens/CameraScreen/components/CameraStreamScreen";
import { Camera } from "../types";
import LoginScreen from "../screens/auth/LoginScreen";
import ProfileScreen from "../screens/auth/ProfileScreen";

// Definir los tipos de navegación
export type RootStackParamList = {
  Tabs: undefined; // contiene el BottomTabNavigator
  CameraStream: { camera: Camera }; // pantalla extra fuera del TabNavigator
  Login: undefined;  // contiene la pantalla de login
  Profile: undefined; // contiene la pantalla de perfil
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }} // oculta el header
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Tabs" component={BottomNavigator} />
        <Stack.Screen name="CameraStream" component={CameraStreamScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
