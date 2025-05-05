// components/UrgencyRadar.tsx
import React from "react";
import { Circle } from "react-native-maps";

type Props = {
  latitude: number;
  longitude: number;
};

const UrgencyRadar = ({ latitude, longitude }: Props) => {
  return (
    <Circle
      center={{ latitude, longitude }}
      radius={50} // radio fijo
      strokeColor="rgba(255,0,0,0.5)"
      fillColor="rgba(255,0,0,0.2)"
    />
  );
};

export default UrgencyRadar;
