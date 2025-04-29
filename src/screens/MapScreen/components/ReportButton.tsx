import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ReportButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>CREAR REPORTE</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#4169e1",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: { color: "white", fontSize: 17, fontWeight: "bold" },
});

export default ReportButton;
