import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowUp, Info } from 'lucide-react-native';
import { theme } from '@/utils/theme';

export default function AccessHealthScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleContinue = () => {
    router.push('/onboarding/access-health-loading');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Text style={styles.title}>Connect GoWalk to Health</Text>
        <Text style={styles.subtitle}>
          To track your steps on this iPhone, GoWalk will need your permission.
        </Text>

        <View style={styles.popupIndicator}>
          <ArrowUp size={32} color={theme.colors.primary} />
        </View>

        <View style={styles.systemPopup}>
          <Text style={styles.popupTitle}>"GoWalk" Would Like to Access Your Health Data</Text>
          <Text style={styles.popupDescription}>
            Providing GoWalk access will allow it to read your step count and help you 
            exchange movement for time on distracting apps.
          </Text>
          <View style={styles.popupButtons}>
            <Pressable
              style={[styles.popupButton, styles.popupButtonPrimary]}
              onPress={handleContinue}
            >
              <Text style={styles.popupButtonTextPrimary}>Continue</Text>
            </Pressable>
            <Pressable
              style={[styles.popupButton, styles.popupButtonSecondary]}
              onPress={() => {}}
            >
              <Text style={styles.popupButtonTextSecondary}>Don't Allow</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.securityInfo}>
            <Info size={16} color={theme.colors.textSecondary} />
            <Text style={styles.securityText}>
              Your information is protected by Apple and stays 100% on your phone.
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
  popupIndicator: {
    marginBottom: 16,
  },
  systemPopup: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  popupTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 12,
  },
  popupDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: 20,
  },
  popupButtons: {
    gap: 12,
  },
  popupButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  popupButtonPrimary: {
    backgroundColor: theme.colors.primary,
  },
  popupButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  popupButtonTextPrimary: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.text,
  },
  popupButtonTextSecondary: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  footer: {
    marginTop: 40,
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