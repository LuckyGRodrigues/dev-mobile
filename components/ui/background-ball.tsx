import React from 'react';
import { Image, StyleSheet, View, type ImageStyle, type StyleProp } from 'react-native';

type BackgroundBallProps = {
  size?: number;
  top?: ImageStyle['top'];
  right?: ImageStyle['right'];
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
    <View
      pointerEvents="none"
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
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Image
        source={require('@/assets/images/boletaVolei.jpg')}
        resizeMode="cover"
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ball: {
    position: 'absolute',
  },
});