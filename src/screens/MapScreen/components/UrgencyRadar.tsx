// components/UrgencyRadar.tsx
import React, { useEffect } from "react";
import { Circle } from "react-native-maps";
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";

type Props = {
  latitude: number;
  longitude: number;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const UrgencyRadar = ({ latitude, longitude }: Props) => {
  const radius = useSharedValue(0);

  useEffect(() => {
    radius.value = withRepeat(
      withTiming(50, { duration: 15 }),
      -1,
      true
    );
  }, []);

  const animatedRadius = useDerivedValue(() => radius.value);

  return (
    <AnimatedCircle
      center={{ latitude, longitude }}
      radius={animatedRadius.value}
      strokeColor="rgba(255,0,0,0.5)"
      fillColor="rgba(255,0,0,0.2)"
    />
  );
};

export default UrgencyRadar;
