// components/CenteredMarker.tsx
import React from "react";
import { View, StyleSheet } from "react-native";

const CenteredMarker = () => (
  <View style={styles.container}>
    <View style={styles.crosshairVertical} />
    <View style={styles.crosshairHorizontal} />
    <View style={styles.centerDot} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 24,
    height: 24,
    marginLeft: -12,
    marginTop: -12,
    justifyContent: "center",
    alignItems: "center",
  },
  crosshairVertical: {
    position: "absolute",
    width: 2,
    height: 24,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  crosshairHorizontal: {
    position: "absolute",
    width: 24,
    height: 2,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  centerDot: {
    width: 8,
    height: 8,
    backgroundColor: "red",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "white",
  },
});

export default CenteredMarker;
