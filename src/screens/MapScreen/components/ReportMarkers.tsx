// components/ReportMarkers.tsx
import React from "react";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../navigation/StackNavigator";

import { Marker } from "react-native-maps";
import { Report } from "../../../types";

type Props = {
  reports: Report[];
};

const ReportMarkers = ({ reports }: Props) => {
    type NavigationProp = StackNavigationProp<RootStackParamList, 'ReportDetail'>;
    const navigation = useNavigation<NavigationProp>();
  return (
    <>
      {reports.map((report) => (
        <Marker
          key={report._id}
          coordinate={{
            latitude: report.location.lat,
            longitude: report.location.lon,
          }}
          title={report.category}
          description={report.text}
          onPress={() => navigation.navigate('ReportDetail', {report })}
        />
      ))}
    </>
  );
};

export default ReportMarkers;
