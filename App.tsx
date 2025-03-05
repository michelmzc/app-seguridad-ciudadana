import React, {ReactNode, useState} from "react";
import { View, StatusBar, StyleSheet, Platform} from "react-native";
import { SafeAreaProvider, SafeAreaView   } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

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


const Map = () => {
  return(
    <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude:  -40.5742,
          longitude: -73.1336,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
    </MapView>
  )
}
const App = () => {
  return (
     <StandardContainer>
        <Map></Map>
     </StandardContainer>
  );
};

export default App;