import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowDown, MessageCircle, BookOpen, Palette } from 'lucide-react-native';
import { theme } from '@/utils/theme';
import { BarChart } from '@/components/Charts';

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const USAGE_DATA = [
  { hour: '06', minutes: 15 },
  { hour: '07', minutes: 20 },
  { hour: '08', minutes: 25 },
  { hour: '09', minutes: 35 },
  { hour: '10', minutes: 30 },
  { hour: '11', minutes: 15 },
  { hour: '12', minutes: 10 },
];

const APPS = [
  { 
    id: 'telegram',
    name: 'Telegram',
    category: 'Social',
    duration: '31m',
    icon: MessageCircle,
    color: '#2AABEE'
  },
  {
    id: 'elevenreader',
    name: 'ElevenReader',
    category: 'Information & Reading',
    duration: '20m',
    icon: BookOpen,
    color: '#9333EA'
  },
  {
    id: 'vn',
    name: 'VN',
    category: 'Creativity',
    duration: '20m',
    icon: Palette,
    color: '#F59E0B'
  }
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [selectedDay, setSelectedDay] = useState(3); // Thursday

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.monthYear}>apr 2025</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daysContainer}
        >
          {DAYS.map((day, index) => (
            <Pressable
              key={day}
              style={[
                styles.dayButton,
                selectedDay === index && styles.selectedDay
              ]}
              onPress={() => setSelectedDay(index)}
            >
              <Text style={[
                styles.dayText,
                selectedDay === index && styles.selectedDayText
              ]}>
                {day}
              </Text>
              <Text style={[
                styles.dateText,
                selectedDay === index && styles.selectedDayText
              ]}>
                {21 + index}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={styles.stepsSection}>
        <Text style={styles.sectionLabel}>your steps statistic</Text>
        <Text style={styles.stepsTitle}>
          You walked <Text style={styles.highlight}>2,000 steps</Text> — that's equal to{' '}
          <Text style={styles.highlight}>20 minutes</Text> on social media.
        </Text>
      </View>

      <View style={styles.screenTimeSection}>
        <Text style={styles.sectionLabel}>your screen time</Text>
        <Text style={styles.screenTimeValue}>1h 49m</Text>
        <View style={styles.comparisonContainer}>
          <View style={styles.comparison}>
            <ArrowDown size={20} color="#22C55E" style={styles.comparisonIcon} />
            <Text style={styles.comparisonText}>
              20% vs this point yesterday
            </Text>
          </View>
          <Text style={styles.comparisonSubtext}>
            28m less – you're doing amazing
          </Text>
        </View>

        <View style={styles.chartContainer}>
          <BarChart data={USAGE_DATA} />
        </View>
      </View>

      <View style={styles.usageSection}>
        <Text style={styles.sectionLabel}>your usage</Text>
        {APPS.map((app) => (
          <View key={app.id} style={styles.appItem}>
            <View style={[styles.appIcon, { backgroundColor: app.color }]}>
              <app.icon size={24} color="#FFFFFF" />
            </View>
            <View style={styles.appInfo}>
              <Text style={styles.appName}>{app.name}</Text>
              <Text style={styles.appCategory}>{app.category}</Text>
            </View>
            <Text style={styles.appDuration}>{app.duration}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 20,
  },
  monthYear: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 16,
  },
  daysContainer: {
    paddingVertical: 8,
  },
  dayButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.backgroundSecondary,
    alignItems: 'center',
  },
  selectedDay: {
    backgroundColor: theme.colors.primary,
  },
  dayText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  dateText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: theme.colors.text,
  },
  selectedDayText: {
    color: theme.colors.text,
  },
  stepsSection: {
    padding: 20,
  },
  sectionLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 12,
  },
  stepsTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 24,
    lineHeight: 32,
    color: theme.colors.text,
  },
  highlight: {
    fontFamily: 'Inter-Bold',
    color: theme.colors.primary,
  },
  screenTimeSection: {
    padding: 20,
  },
  screenTimeValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 48,
    color: theme.colors.text,
    marginBottom: 8,
  },
  comparisonContainer: {
    marginBottom: 24,
  },
  comparison: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  comparisonIcon: {
    marginRight: 8,
    transform: [{ rotate: '45deg' }],
  },
  comparisonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#22C55E',
  },
  comparisonSubtext: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  chartContainer: {
    height: 200,
    marginTop: 20,
  },
  usageSection: {
    padding: 20,
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  appIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  appInfo: {
    flex: 1,
  },
  appName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 4,
  },
  appCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  appDuration: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: theme.colors.text,
  },
});