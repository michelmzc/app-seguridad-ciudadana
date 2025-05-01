// importación de librerias, objetos que usaremos en el codigo
import React, { useEffect, useState}  from "react"; // librerias basicas de React (framework frontend JS/TS)
import { Animated } from "react-native";
import MapView, { Circle } from "react-native-maps";

type Props = {
    center: { latitude: number; longitude: number };
    radius: number | undefined; // metros
}

const RadarMarker = ({ center, radius = 60 }: Props) => {
    const [opacity] = useState(new Animated.Value(0.4));

    useEffect(() => {
        const pulse = () => {
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.8,
                    duration: 500,
                    useNativeDriver: false,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 500,
                    useNativeDriver: false,
                  }),
            ]).start(() => pulse());
        };
        pulse();
    }, [opacity]);

    return (
        <Circle 
            center={center}
            radius={radius}
            strokeColor="rgba(255,0,0,0.5)"
            fillColor={opacity.interpolate({
            inputRange: [0.3, 0.8],
            outputRange: ["rgba(255,0,0,0.3)", "rgba(255,0,0,0.6)"],
            }) as any}
        />
    );
};

export default RadarMarker;