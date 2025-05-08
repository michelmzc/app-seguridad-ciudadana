// src/screens/ReportListScreen.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getReports } from '../../api/reports';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Report } from '../../types';
import { RootStackParamList } from 'navigation/StackNavigator';
import ReportCard from './components/ReportCard'

type ReportListNavigationProp = StackNavigationProp<RootStackParamList, 'ReportDetail'>;



const ReportListScreen = () => {
  const navigation = useNavigation<ReportListNavigationProp>();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const response = await getReports();
      if(response){
        setReports(response.data);
      }else{
        console.log('Error al obtener los reportes:', response)
      }
    } catch (error) {
      console.error('Error al obtener los reportes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchReports();
    }, [])
  );
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diff = Math.floor((now.getTime() - then.getTime()) / 60000); // minutos
  
    if (diff < 1) return "justo ahora";
    if (diff < 60) return `${diff} min`;
    const hours = Math.floor(diff / 60);
    return `${hours} h`;
  };
  
  const renderItem = ({ item }: { item: Report }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ReportDetail', { report: item })}>
      <ReportCard
        icon="alert-circle"
        category={item.category}
        city={"Osorno"}
        timeAgo= "Justo ahora" //{formatTimeAgo(item.createdAt)}
        message={item.text}
        //imageUri={item.imageUrl} // Asegúrate de que este campo exista en `Report`
      />
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reportes</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default ReportListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  item: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#555',
  },
});
