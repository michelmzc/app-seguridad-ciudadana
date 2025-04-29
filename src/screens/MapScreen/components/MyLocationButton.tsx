import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const MyLocationButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Icon name="locate-sharp" color="white" size={26} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4169e1",
    padding: 16,
    borderRadius: 100,
  },
});

export default MyLocationButton;