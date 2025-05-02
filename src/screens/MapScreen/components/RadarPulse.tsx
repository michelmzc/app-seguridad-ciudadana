// components/RadarPulse.tsx
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

type Props = {
  size?: number; // tamaño base de la onda
  color?: string;
};

const RadarPulse = ({ size = 100, color = "rgba(255,0,0,0.4)" }: Props) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 2.5,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
  }, [scale, opacity]);

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: color,
            width: size,
            height: size,
            borderRadius: size / 2,
            opacity,
            transform: [{ scale }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -75, // -size / 2 si size es 150
    marginTop: -75,
    borderWidth: 2,
    borderColor: "rgba(65, 105, 225, 0.6)", // royalblue con opacidad
    backgroundColor: "rgba(65, 105, 225, 0.2)", // color sutil en el centro
  },
});

export default RadarPulse;
