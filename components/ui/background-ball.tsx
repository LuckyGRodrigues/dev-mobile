import React from 'react';
import { Image, StyleSheet, type ImageStyle, type StyleProp } from 'react-native';

type BackgroundBallProps = {
  size?: number;
  top?: number | string;
  right?: number;
  opacity?: number;
  translateY?: number;
  style?: StyleProp<ImageStyle>;
};

export function BackgroundBall({
  size = 460,
  top = '50%',
  right = -230,
  opacity = 0.45,
  translateY = -230,
  style,
}: BackgroundBallProps) {
  return (
    <Image
      source={require('@/assets/images/boletaVolei.jpg')}
      pointerEvents="none"
      resizeMode="cover"
      style={[
        styles.ball,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          top,
          right,
          opacity,
          transform: [{ translateY }],
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  ball: {
    position: 'absolute',
  },
});