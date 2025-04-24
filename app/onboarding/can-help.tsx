import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Clock, Brain, TrendingUp, Calendar } from 'lucide-react-native';
import { theme } from '@/utils/theme';

export default function CanHelpScreen() {
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
        <Text style={styles.title}>
          This week, based on your data, GoWalk can help you:
        </Text>

        <View style={styles.bulletPoints}>
          <View style={styles.bulletPoint}>
            <View style={styles.iconContainer}>
              <Clock size={24} color={theme.colors.primary} />
            </View>
            <Text style={styles.bulletText}>
              Reduce your Screen Time by 30% to 3h 30m each day
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <View style={styles.iconContainer}>
              <Brain size={24} color={theme.colors.primary} />
            </View>
            <Text style={styles.bulletText}>
              Reduce work hour distraction to <Text style={styles.highlight}>&lt;20%</Text>
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <View style={styles.iconContainer}>
              <TrendingUp size={24} color={theme.colors.primary} />
            </View>
            <Text style={styles.bulletText}>
              Become 30% more focused than the average of your peers
            </Text>
          </View>

          <View style={styles.bulletPoint}>
            <View style={styles.iconContainer}>
              <Calendar size={24} color={theme.colors.primary} />
            </View>
            <Text style={styles.bulletText}>
              Develop habits to save <Text style={styles.highlight}>36d</Text> this year
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.emoji}>🤜🤛</Text>
          <Text style={styles.footerText}>Let's solidify it with a fist bump</Text>
          <Text style={styles.subtext}>Tap to continue</Text>
        </View>
      </View>

      <Pressable
        style={styles.overlay}
        onPress={() => router.push('/onboarding/subscription')}
      />
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
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: theme.colors.text,
    marginBottom: 32,
    lineHeight: 32,
  },
  bulletPoints: {
    gap: 24,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bulletText: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
  },
  highlight: {
    color: theme.colors.primary,
    fontFamily: 'Inter-Bold',
  },
  footer: {
    marginTop: 48,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  footerText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 8,
  },
  subtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});