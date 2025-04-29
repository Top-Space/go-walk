import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import ProgressBar from '@/components/ProgressBar';
import SelectionButton from '@/components/SelectionButton';
import { useQuestion } from '@/contexts/QuestionContext';
import { theme } from '@/utils/theme';

const OPTIONS = [
  'Under 18',
  '18–24',
  '25–34',
  '35–44',
  '45–55',
  '55–64',
  'Over 64',
];

export default function Question2Screen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { answers, setAnswer } = useQuestion();

  const handleSelect = (option: string) => {
    setAnswer('age', option);
    router.push('/onboarding/question3');
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
          <ProgressBar progress={0.33} />
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>How old are you?</Text>
          
          <View style={styles.optionsContainer}>
            {OPTIONS.map((option, index) => (
              <SelectionButton
                key={index}
                label={option}
                isSelected={answers.age === option}
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
    marginBottom: 32,
    color: theme.colors.text,
  },
  optionsContainer: {
    width: '100%',
  },
});