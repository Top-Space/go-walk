import { StyleSheet, Text, Pressable, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/utils/theme';

interface SelectionButtonProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export default function SelectionButton({ 
  label, 
  isSelected, 
  onPress,
  style
}: SelectionButtonProps) {
  return (
    <Pressable
      style={[styles.button, style]}
      onPress={onPress}
    >
      {isSelected ? (
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBackground}
        >
          <Text style={styles.selectedLabel}>{label}</Text>
        </LinearGradient>
      ) : (
        <View style={styles.unselectedBackground}>
          <Text style={styles.unselectedLabel}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    marginBottom: 12,
    overflow: 'hidden',
  },
  gradientBackground: {
    padding: 16,
    alignItems: 'center',
  },
  unselectedBackground: {
    padding: 16,
    backgroundColor: theme.colors.backgroundSecondary,
    alignItems: 'center',
  },
  selectedLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.text,
  },
  unselectedLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
});