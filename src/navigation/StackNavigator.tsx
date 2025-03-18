import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import  BottomNavigator  from "./AppNavigator"; // Tu navegación principal con pestañas
import CameraStreamScreen from "../screens/CameraScreen/components/CameraStreamScreen";
import { Camera } from "../types";

// Definir los tipos de navegación
export type RootStackParamList = {
  Tabs: undefined; // Contiene el BottomTabNavigator
  CameraStream: { camera: Camera }; // Pantalla extra fuera del TabNavigator
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={BottomNavigator} />
        <Stack.Screen name="CameraStream" component={CameraStreamScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
