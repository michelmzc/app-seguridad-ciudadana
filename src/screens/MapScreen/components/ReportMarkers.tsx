import React from "react";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../navigation/StackNavigator";

import { Marker } from "react-native-maps";
import { Report } from "../../../types";
import UrgencyRadar from "./UrgencyRadar";

type Props = {
  reports: Report[];
};

const ReportMarkers = ({ reports }: Props) => {
  type NavigationProp = StackNavigationProp<RootStackParamList, 'ReportDetail'>;
  const navigation = useNavigation<NavigationProp>();

  return (
    <>
      {reports.map((report) => {
        const lat = report.location.lat;
        const lon = report.location.lon;
        const isUrgency = true;

        return (
          <React.Fragment key={report._id}>
            <Marker
              key={report._id}
              coordinate={{ latitude: lat, longitude: lon }}
              title={report.category}
              description={report.text}
              onPress={() => navigation.navigate('ReportDetail', { report })}
            />
            {isUrgency && (
              <UrgencyRadar
                latitude={report.location.lat}
                longitude={report.location.lon}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default ReportMarkers;
