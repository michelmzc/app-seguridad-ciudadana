import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "../screens/MapScreen";
import { createStaticNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = createBottomTabNavigator({
  screens: {
    Mapa: MapScreen,
  },
});

const Navigation = createStaticNavigation(BottomTabNavigator);

export default function AppNavigator(){
  return <Navigation />; 
}