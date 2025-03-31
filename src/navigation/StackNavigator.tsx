import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import  BottomNavigator  from "./AppNavigator"; // Tu navegación principal con pestañas
import CameraStreamScreen from "../screens/CameraScreen/components/CameraStreamScreen";
import { Camera } from "../types";
import LoginScreen from "../screens/auth/LoginScreen";
import ProfileScreen from "../screens/auth/ProfileScreen";

// Definir los tipos de navegación
export type RootStackParamList = {
  Tabs: undefined; // Contiene el BottomTabNavigator
  CameraStream: { camera: Camera }; // Pantalla extra fuera del TabNavigator
  Login: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Tabs" component={BottomNavigator} />
        <Stack.Screen name="CameraStream" component={CameraStreamScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
