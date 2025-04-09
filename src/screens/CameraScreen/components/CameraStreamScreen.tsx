import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { VLCPlayer } from "react-native-vlc-media-player";
import { Camera } from "../../../types";
import Icon from "react-native-vector-icons/Ionicons";

type CameraStreamRouteProp = RouteProp<
  { CameraStream: { camera: Camera } },
  "CameraStream"
>;

const CameraStreamScreen: React.FC = () => {
  const route = useRoute<CameraStreamRouteProp>();
  const navigation = useNavigation();
  const { camera } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Título en la parte superior */}
      <View style={styles.header}>
        <Text style={styles.title}>{camera.name}</Text>
      </View>

      {/* Video en el centro */}
      <View style={styles.videoContainer}>
        <VLCPlayer
          source={{ uri: camera.streamUrl }}
          autoplay
          paused={false}
          style={styles.video}
          resizeMode="contain"
          onError={(e) => console.log("❌ Error:", e)}
        />
      </View>

      {/* Botón en la parte inferior */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={20} color="#fff" />
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    paddingTop: 10,
    paddingBottom: 5,
    alignItems: "center",
    backgroundColor: "#000",
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  footer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4169e1",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  backButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CameraStreamScreen;
