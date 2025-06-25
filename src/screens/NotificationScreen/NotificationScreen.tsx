import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Notification = {
  id: string;
  type: 'emergencia' | 'preventiva';
  title: string;
  message: string;
  timestamp: string; // ISO format
};

const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'emergencia',
    title: 'Notificación de ejemplo',
    message: 'Se reportó un robo en Av. Mitre y 9 de Julio. Policía en camino.',
    timestamp: '2025-05-07T13:45:00Z',
  },
  {
    id: '2',
    type: 'preventiva',
    title: 'Corte de luz programado',
    message: 'Este jueves habrá un corte de luz entre 14:00 y 17:00 en zona centro.',
    timestamp: '2025-05-06T11:20:00Z',
  },
];

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Aquí podrías usar fetchNotifications() desde tu API
    setNotifications(sampleNotifications);
  }, []);

  const renderItem = ({ item }: { item: Notification }) => {
    const isEmergency = item.type === 'emergencia';

    return (
      <View
        style={[
          styles.notificationCard,
          isEmergency && styles.emergencyCard,
        ]}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  notificationCard: {
    backgroundColor: '#f0f4ff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 6,
    borderLeftColor: '#4169e1',
  },
  emergencyCard: {
    backgroundColor: '#ffe5e5',
    borderLeftColor: '#ff4d4d',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  message: {
    fontSize: 14,
    color: '#444',
  },
  timestamp: {
    marginTop: 8,
    fontSize: 12,
    color: '#888',
  },
});
