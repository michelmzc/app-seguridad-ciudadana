import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Video from "react-native-video";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Camera } from "../../../types";

type CameraStreamRouteProp = RouteProp<{ CameraStream: { camera: Camera } }, "CameraStream">;

const CameraStreamScreen: React.FC = () => {
  const route = useRoute<CameraStreamRouteProp>();
  const { camera } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{camera.name}</Text>
      <Video
        source={{ uri: camera.streamUrl }}
        style={styles.video}
        controls
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" },
  title: { fontSize: 20, color: "white", marginBottom: 10 },
  video: { width: "100%", height: 300 }
});

export default CameraStreamScreen;
