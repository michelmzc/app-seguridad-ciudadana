// src/screens/ReportDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Report } from '../../types'


type RouteParams = {
  ReportDetail: { report: Report };
};

const ReportDetailScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'ReportDetail'>>();
  const { report } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{report.category}</Text>
      <Text style={styles.label}>Descripción:</Text>
      <Text style={styles.text}>{report.text}</Text>

      <Text style={styles.label}>Ubicación:</Text>
      <Text style={styles.text}>
        Latitud: {report.location.lat}{"\n"}Longitud: {report.location.lon}
      </Text>

      <Text style={styles.label}>Usuario:</Text>
      <Text style={styles.text}>{report.user}</Text>
    </View>
  );
};

export default ReportDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
});
