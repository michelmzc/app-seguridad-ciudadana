import React from "react";
import MapView, { Region } from "react-native-maps";
import { StyleSheet } from "react-native";
import ReportMarkers from "./ReportMarkers";
import { Report } from "../../../types";

type Props = {
  location: Region;
  setLocation: (region: Region) => void;
  reports: Report[];
};

const MapViewComponent = React.forwardRef<MapView, Props>(
  ({ location, setLocation, reports }, ref) => (
    <MapView
      ref={ref}
      provider="google"
      style={styles.map}
      initialRegion={location}
      showsUserLocation
      showsMyLocationButton={false}
      rotateEnabled={false}
      loadingEnabled
      onRegionChangeComplete={setLocation}
    >
      <ReportMarkers reports={reports} />
    </MapView>
  )
);

const styles = StyleSheet.create({
  map: { ...StyleSheet.absoluteFillObject },
});

export default MapViewComponent;