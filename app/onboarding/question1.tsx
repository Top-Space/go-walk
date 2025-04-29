import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import ProgressBar from '@/components/ProgressBar';
import SelectionButton from '@/components/SelectionButton';
import { useQuestion } from '@/contexts/QuestionContext';
import { theme } from '@/utils/theme';

const OPTIONS = [
  'Under 1 hour',
  '1–3 hours',
  '3–4 hours',
  '4–5 hours',
  '5–7 hours',
  'More than 7 hours',
];

export default function Question1Screen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { answers, setAnswer } = useQuestion();

  const handleSelect = (option: string) => {
    setAnswer('screenTime', option);
    router.push('/onboarding/question2');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable 
          style={styles.backButton} 
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={24} color={theme.colors.text} />
        </Pressable>
        <View style={styles.progressContainer}>
          <ProgressBar progress={0.0} />
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>What is your daily average Screen Time?</Text>
          <Text style={styles.subtitle}>On your phone only. Your best guess is ok.</Text>
          
          <View style={styles.optionsContainer}>
            {OPTIONS.map((option, index) => (
              <SelectionButton
                key={index}
                label={option}
                isSelected={answers.screenTime === option}
                onPress={() => handleSelect(option)}
                style={index === OPTIONS.length - 1 ? { marginBottom: 0 } : undefined}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 8,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 12,
    color: theme.colors.text,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 32,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  optionsContainer: {
    width: '100%',
  },
});