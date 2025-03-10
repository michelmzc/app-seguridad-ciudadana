import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStaticNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons'
import MapScreen from "../screens/MapScreen";


const Tab = createBottomTabNavigator();

const BottomTabNavigator = createBottomTabNavigator({
  screenOptions: ({ route }) => ({
    tabBarIcon: () => {
      let iconName = "map-outline";
      if (route.name === "Mapa"){
        iconName = "map"
      }
      else if (route.name === "Reportes"){
        iconName = "newspaper"
      }
      else if (route.name === "Cámaras"){
        iconName = "videocam"
      }else if (route.name === "Notificaciones"){
        iconName = "notifications"
      }else if (route.name === "Menu"){
        iconName = "menu"
      }

      return <Icon name={iconName} color="#676767" size={24}/>;
    }
  }),
  screens: {
    Mapa: MapScreen,
    Reportes: MapScreen,
    Cámaras: MapScreen,
    Notificaciones: MapScreen,
    Menu: MapScreen
  },
});

const Navigation = createStaticNavigation(BottomTabNavigator);

export default function AppNavigator(){
  return <Navigation />; 
}