import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, { 
  useAnimatedProps,
  useSharedValue,
  withTiming,
  useAnimatedReaction,
} from 'react-native-reanimated';

interface CircleProgressProps {
  size: number;
  strokeWidth: number;
  progress: number; // 0 to 1
  gradientColors: string[];
  children?: React.ReactNode;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function CircleProgress({
  size,
  strokeWidth,
  progress,
  gradientColors,
  children,
}: CircleProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const animatedProgress = useSharedValue(0);
  
  // React to progress changes
  useAnimatedReaction(
    () => progress,
    (currentProgress) => {
      animatedProgress.value = withTiming(currentProgress, { duration: 1000 });
    },
    [progress]
  );

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - animatedProgress.value);
    return {
      strokeDashoffset,
    };
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={gradientColors[0]} />
            <Stop offset="100%" stopColor={gradientColors[1]} />
          </LinearGradient>
        </Defs>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          {/* Background Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke="rgba(255, 255, 255, 0.3)"
            fill="transparent"
          />
          {/* Foreground Circle */}
          <AnimatedCircle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke="url(#gradient)"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animatedProps={animatedProps}
          />
        </G>
      </Svg>
      {children && <View style={styles.childrenContainer}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  childrenContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});