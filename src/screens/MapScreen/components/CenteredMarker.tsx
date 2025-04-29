// components/CenteredMarker.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CenteredMarker = () => (
  <View style={styles.markerFixed}>
    <Text style={styles.marker}>📍</Text>
  </View>
);

const styles = StyleSheet.create({
  markerFixed: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -12,
    marginTop: -24,
  },
  marker: { fontSize: 40 },
});

export default CenteredMarker;