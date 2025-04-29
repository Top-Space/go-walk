import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Info } from 'lucide-react-native';
import { theme } from '@/utils/theme';
import screenTimePermissionImage from '../../assets/images/ios-screentime-alert.png';

export default function AccessScreenTimeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleContinue = () => {
    router.push('/onboarding/access-screen-time-loading');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Text style={styles.title}>Connect GoWalk to Screen Time, Securely.</Text>
        <Text style={styles.subtitle}>
          To analyze your Screen Time on this iPhone, GoWalk will need your permission.
        </Text>

        <Image 
          source={screenTimePermissionImage}
          style={styles.permissionImage}
          resizeMode="contain"
        />
      </View>

      <View style={[styles.bottomContainer, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>

        <View style={styles.footer}>
          <View style={styles.securityInfo}>
            <Info size={16} color={theme.colors.textSecondary} />
            <Text style={styles.securityText}>
              Your information is protected by Apple and will stay 100% on your phone.
            </Text>
          </View>
          <Pressable onPress={() => {}}>
            <Text style={styles.learnMore}>Learn More</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  permissionImage: {
    width: '100%',
    height: 200,
    marginVertical: 24,
  },
  bottomContainer: {
    padding: 24,
    backgroundColor: theme.colors.background,
  },
  continueButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  continueButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.text,
  },
  footer: {
    alignItems: 'center',
    gap: 16,
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  securityText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  learnMore: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.primary,
  },
});