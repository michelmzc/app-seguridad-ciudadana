import React from "react";
import {StyleSheet} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });

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

export default Map;