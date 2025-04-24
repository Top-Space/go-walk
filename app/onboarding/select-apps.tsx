import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { theme } from '@/utils/theme';

const APPS = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'https://images.pexels.com/photos/1547726/pexels-photo-1547726.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: 'https://images.pexels.com/photos/3628700/pexels-photo-3628700.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'https://images.pexels.com/photos/1339844/pexels-photo-1339844.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'https://images.pexels.com/photos/3654809/pexels-photo-3654809.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: 'https://images.pexels.com/photos/3654897/pexels-photo-3654897.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    icon: 'https://images.pexels.com/photos/3654898/pexels-photo-3654898.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SelectAppsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

  const handleAppSelect = (appId: string) => {
    setSelectedApps(prev => {
      if (prev.includes(appId)) {
        return prev.filter(id => id !== appId);
      }
      if (prev.length < 3) {
        return [...prev, appId];
      }
      return prev;
    });
  };

  const handleContinue = () => {
    if (selectedApps.length > 0) {
      router.push('/auth');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.subtitle}>Now, let's start to focus.</Text>
          <Text style={styles.title}>Select up to 3 distracting apps</Text>
          <Text style={styles.description}>
            You can always change this later or create a new group of apps to block.
          </Text>
        </View>

        <View style={styles.appsGrid}>
          {APPS.map((app, index) => (
            <AppIcon
              key={app.id}
              app={app}
              index={index}
              isSelected={selectedApps.includes(app.id)}
              onSelect={() => handleAppSelect(app.id)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            selectedApps.length === 0 && styles.buttonDisabled,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleContinue}
          disabled={selectedApps.length === 0}
        >
          <LinearGradient
            colors={selectedApps.length > 0 
              ? [theme.colors.primary, theme.colors.secondary]
              : ['#4B5563', '#6B7280']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Select Apps</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

function AppIcon({ app, index, isSelected, onSelect }: { app: any, index: number, isSelected: boolean, onSelect: () => void }) {
  const animatedStyle = useAnimatedStyle(() => {
    const delay = index * 100;
    return {
      transform: [
        {
          translateY: withSequence(
            withDelay(
              delay,
              withSpring(-20, { damping: 5, stiffness: 100 })
            ),
            withRepeat(
              withSpring(0, { damping: 5, stiffness: 100 }),
              -1,
              true
            )
          ),
        },
      ],
    };
  }, []);

  return (
    <AnimatedPressable
      style={[styles.appContainer, animatedStyle]}
      onPress={onSelect}
    >
      <View style={[styles.appIconWrapper, isSelected && styles.appIconSelected]}>
        <Image source={{ uri: app.icon }} style={styles.appIcon} />
        {isSelected && (
          <View style={styles.selectedOverlay}>
            <LinearGradient
              colors={['rgba(124, 58, 237, 0.8)', 'rgba(59, 130, 246, 0.8)']}
              style={StyleSheet.absoluteFill}
            />
          </View>
        )}
      </View>
      <Text style={styles.appName}>{app.name}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    marginBottom: 40,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: theme.colors.text,
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  appsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  appContainer: {
    width: '33.33%',
    alignItems: 'center',
    marginBottom: 24,
  },
  appIconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 8,
    overflow: 'hidden',
    backgroundColor: theme.colors.backgroundSecondary,
  },
  appIconSelected: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  appIcon: {
    width: '100%',
    height: '100%',
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.text,
    textAlign: 'center',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  button: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  gradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: theme.colors.text,
  },
});