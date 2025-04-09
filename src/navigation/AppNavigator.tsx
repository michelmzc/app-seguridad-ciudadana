import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons'
import MapScreen from "../screens/MapScreen/MapScreen";
import CamerasScreen from "../screens/CameraScreen/CameraScreen";

const Tab = createBottomTabNavigator();

//const BottomNavigation = createStaticNavigation(BottomTabNavigator);

export default function AppNavigator(){
  return(
    <Tab.Navigator
    screenOptions= {({ route }) => ({
      tabBarIcon: () => {
        let iconName = "map-outline";
        if (route.name === "Mapa"){ iconName = "map" } 
        else if (route.name === "Reportes"){ iconName = "newspaper" } 
        else if (route.name === "Cámaras"){ iconName = "videocam" } 
        else if (route.name === "Notificaciones"){ iconName = "notifications" } 
        else if (route.name === "Menu"){ iconName = "menu" }
  
        return <Icon name={iconName} color="#676767" size={24}/>;
      }
    })}
    >
      <Tab.Screen name="Mapa" component={MapScreen}  />
      <Tab.Screen name="Reportes" component={MapScreen} />
      <Tab.Screen name="Cámaras" component={CamerasScreen} />
      <Tab.Screen name="Notificaciones" component={MapScreen} />
      <Tab.Screen name="Menu" component={MapScreen} />
    </Tab.Navigator>
  );
}