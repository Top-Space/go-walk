import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ban } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '@/utils/theme';

export default function BlockedAppScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View 
      style={[
        styles.container, 
        { paddingTop: insets.top, paddingBottom: insets.bottom }
      ]}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Ban size={24} color="#DC2626" />
          <Text style={styles.headerText}>The selected program is blocked</Text>
        </View>

        <View style={styles.appInfo}>
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png' }}
            style={styles.appIcon}
          />
          <Text style={styles.appName}>Instagram</Text>
        </View>

        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            You're almost halfway there - only 5,800 steps left to unlock the app!
          </Text>
          
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: '48%' }]}
              />
            </View>
            <Text style={styles.progressCount}>4 800 / 10 000 steps</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={({ pressed }) => [
            styles.closeButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.back()}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 48,
  },
  headerText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: theme.colors.text,
  },
  appInfo: {
    alignItems: 'center',
    marginBottom: 48,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 16,
  },
  appName: {
    fontFamily: 'Inter-Medium',
    fontSize: 17,
    color: theme.colors.text,
  },
  progressInfo: {
    width: '100%',
    alignItems: 'center',
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 17,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: theme.colors.textSecondary,
  },
  footer: {
    padding: 24,
    gap: 12,
  },
  closeButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  closeButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 17,
    color: theme.colors.text,
  },
});