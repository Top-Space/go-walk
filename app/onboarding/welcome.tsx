import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';
import { ArrowRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@/utils/theme';

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView 
      contentContainerStyle={[
        styles.scrollContainer, 
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }
      ]}
    >
      <View style={styles.container}>
        <View style={styles.videoContainer}>
          <View style={styles.videoPlaceholder}>
            <Text style={styles.videoPlaceholderText}>App Demo Video</Text>
          </View>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Welcome to GoWalk</Text>
          <Text style={styles.subtitle}>
            Starting today, let's focus better and accomplish your dreams
          </Text>
          
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push('/onboarding/question1')}
          >
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <ArrowRight size={20} color="white" style={styles.buttonIcon} />
            </LinearGradient>
          </Pressable>
          
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Pressable onPress={() => router.push('/onboarding/login')}>
              <Text style={styles.loginLink}>Sign in</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 32,
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 16,
  },
  videoPlaceholderText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  contentContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    marginBottom: 16,
    textAlign: 'center',
    color: theme.colors.text,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 26,
    color: theme.colors.textSecondary,
  },
  button: {
    width: '100%',
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: theme.colors.text,
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  buttonIcon: {
    marginLeft: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  loginText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  loginLink: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.primary,
  },
});