import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Svg, { Rect, Line, Path, Text as SvgText } from 'react-native-svg';
import Animated, { 
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';
import { theme } from '@/utils/theme';

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedPath = Animated.createAnimatedComponent(Path);

interface UsageData {
  hour: string;
  minutes: number;
}

interface BarChartProps {
  data: UsageData[];
}

interface LineChartData {
  day: string;
  hours: number;
}

interface LineChartProps {
  data: LineChartData[];
}

// BarChart Component
export function BarChart({ data }: BarChartProps) {
  const [width, setWidth] = useState(Dimensions.get('window').width - 64);
  const barWidth = (width - 40) / data.length - 1;
  const maxValue = Math.max(...data.map(item => item.minutes)) * 1.1;
  const heightScale = 160 / maxValue;
  const barHeights = data.map(() => useSharedValue(0));

  useEffect(() => {
    data.forEach((_, index) => {
      barHeights[index].value = withTiming(data[index].minutes * heightScale, { duration: 1000 });
    });
  }, [data]);

  return (
    <View style={[styles.chartContainer, { paddingHorizontal: 0 }]} onLayout={(event) => {
      setWidth(event.nativeEvent.layout.width);
    }}>
      <Svg width={width} height={200}>
        {/* Horizontal grid lines */}
        <Line x1="20" y1="180" x2={width} y2="180" stroke="#E5E5EA" strokeWidth="1" />
        <Line x1="20" y1="135" x2={width} y2="135" stroke="#E5E5EA" strokeWidth="1" />
        <Line x1="20" y1="90" x2={width} y2="90" stroke="#E5E5EA" strokeWidth="1" />
        <Line x1="20" y1="45" x2={width} y2="45" stroke="#E5E5EA" strokeWidth="1" />
        
        {/* Vertical axis */}
        <Line x1="20" y1="0" x2="20" y2="180" stroke="#E5E5EA" strokeWidth="1" />
        
        {/* Bars */}
        {data.map((item, index) => {
          const x = 25 + index * ((width - 30) / data.length);
          
          const animatedProps = useAnimatedProps(() => {
            return {
              height: barHeights[index].value,
              y: 180 - barHeights[index].value,
            };
          });
          
          return (
            <View key={index}>
              <AnimatedRect
                x={x}
                width={barWidth}
                fill={theme.colors.primary}
                rx={4}
                animatedProps={animatedProps}
              />
              <SvgText
                x={x + barWidth / 2}
                y={195}
                textAnchor="middle"
                fontSize="9"
                fill={theme.colors.textSecondary}
              >
                {item.hour}
              </SvgText>
            </View>
          );
        })}
      </Svg>
    </View>
  );
}

// LineChart Component
export function LineChart({ data }: LineChartProps) {
  const [width, setWidth] = useState(Dimensions.get('window').width - 64);
  const maxValue = Math.max(...data.map(item => item.hours)) * 1.1;
  const heightScale = 180 / maxValue;
  const progress = useSharedValue(0);
  
  useEffect(() => {
    progress.value = withTiming(1, { duration: 1500 });
  }, []);
  
  // Create the path string
  const createPath = () => {
    let path = '';
    const spaceBetween = (width - 50) / (data.length - 1);
    
    data.forEach((item, index) => {
      const x = 45 + index * spaceBetween;
      const y = 200 - (item.hours * heightScale);
      
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    
    return path;
  };
  
  const pathString = createPath();
  
  const animatedProps = useAnimatedProps(() => {
    const pathParts = pathString.split(' ');
    let animatedPath = pathParts[0]; // Start with M x y
    
    // Animate each line segment
    for (let i = 1; i < pathParts.length; i += 3) {
      if (i + 2 < pathParts.length) {
        animatedPath += ` ${pathParts[i]} ${pathParts[i+1]} ${pathParts[i+2]}`;
      }
    }
    
    return {
      d: animatedPath,
      strokeDashoffset: (1 - progress.value) * 1000,
    };
  });
  
  return (
    <View style={styles.chartContainer} onLayout={(event) => {
      setWidth(event.nativeEvent.layout.width);
    }}>
      <Svg width={width} height={220}>
        {/* Horizontal grid lines */}
        <Line x1="40" y1="200" x2={width} y2="200" stroke="#E5E5EA" strokeWidth="1" />
        <Line x1="40" y1="150" x2={width} y2="150" stroke="#E5E5EA" strokeWidth="1" />
        <Line x1="40" y1="100" x2={width} y2="100" stroke="#E5E5EA" strokeWidth="1" />
        <Line x1="40" y1="50" x2={width} y2="50" stroke="#E5E5EA" strokeWidth="1" />
        
        {/* Vertical axis */}
        <Line x1="40" y1="0" x2="40" y2="200" stroke="#E5E5EA" strokeWidth="1" />
        
        {/* Line */}
        <AnimatedPath
          d={pathString}
          fill="none"
          stroke={theme.colors.secondary}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1000"
          animatedProps={animatedProps}
        />
        
        {/* X-axis labels */}
        {data.map((item, index) => {
          const spaceBetween = (width - 50) / (data.length - 1);
          const x = 45 + index * spaceBetween;
          
          return (
            <SvgText
              key={index}
              x={x}
              y={215}
              textAnchor="middle"
              fontSize="12"
              fill={theme.colors.textSecondary}
            >
              {item.day}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    width: '100%',
    marginHorizontal: 0,
  },
});