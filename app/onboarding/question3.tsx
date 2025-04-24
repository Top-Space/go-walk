import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import ProgressBar from '@/components/ProgressBar';
import SelectionButton from '@/components/SelectionButton';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { theme } from '@/utils/theme';

const OPTIONS = [
  'Student / Academic',
  'Software Development',
  'CEO / Founder',
  'Remote Worker',
  'Finance / Ops / Consulting',
  'Art / Content',
  'Other',
];

export default function Question3Screen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { answers, setAnswer } = useOnboarding();

  const handleSelect = (option: string) => {
    setAnswer('occupation', option);
    router.push('/onboarding/analyzing');
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
          <ProgressBar progress={0.6} />
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>What is your occupation?</Text>
          
          <View style={styles.optionsContainer}>
            {OPTIONS.map((option, index) => (
              <SelectionButton
                key={index}
                label={option}
                isSelected={answers.occupation === option}
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
    backgroundColor: '#FFFFFF',
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
    marginBottom: 32,
    color: theme.colors.text,
  },
  optionsContainer: {
    width: '100%',
  },
});