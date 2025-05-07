import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'

type Props = {
    icon: string;
    category: string;
    city: string;
    timeAgo: string;
    message: string; 
    imageUri?: string;
}

const ReportCard = ({ icon, category, city, timeAgo, message, imageUri }: Props) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Icon name={icon} size={24} color="red" />
                <View style={{ marginLeft: 8 }}>
                    <Text style={styles.user}>{category}</Text>
                    <Text style={styles.meta}>{city} · {timeAgo}</Text>
                </View>
            </View>
            <Text style={styles.message}>{message}</Text>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            <View style={styles.footer}>
                <Text style={styles.footerText}>♡ 30</Text>
                <Text style={styles.footerText}>💬 32</Text>
                <Text style={styles.footerText}>↗ Share</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
      padding: 12,
      backgroundColor: "white",
      borderBottomWidth: 1,
      borderColor: "#eee",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 6,
    },
    user: {
      fontWeight: "600",
      fontSize: 14,
    },
    meta: {
      fontSize: 12,
      color: "#777",
    },
    message: {
      marginVertical: 8,
      fontSize: 14,
      lineHeight: 18,
    },
    image: {
      width: "100%",
      height: 200,
      borderRadius: 8,
      marginBottom: 8,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 4,
    },
    footerText: {
      fontSize: 12,
      color: "#555",
    },
  });
  
  export default ReportCard;