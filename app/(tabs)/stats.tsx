import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BarChart, LineChart } from '@/components/Charts';
import { theme } from '@/utils/theme';

export default function StatsScreen() {
  const insets = useSafeAreaInsets();
  
  // Sample data for charts
  const weeklyStepsData = [
    { day: 'Mon', steps: 5642 },
    { day: 'Tue', steps: 7851 },
    { day: 'Wed', steps: 4621 },
    { day: 'Thu', steps: 8532 },
    { day: 'Fri', steps: 6734 },
    { day: 'Sat', steps: 9823 },
    { day: 'Sun', steps: 7421 },
  ];
  
  const weeklyScreenTimeData = [
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 2.8 },
    { day: 'Wed', hours: 4.2 },
    { day: 'Thu', hours: 2.5 },
    { day: 'Fri', hours: 3.1 },
    { day: 'Sat', hours: 5.2 },
    { day: 'Sun', hours: 4.7 },
  ];

  return (
    <View 
      style={[
        styles.container, 
        { paddingTop: insets.top, paddingBottom: insets.bottom }
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Stats</Text>
      </View>
      
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Steps</Text>
          <View style={styles.chartContainer}>
            <BarChart data={weeklyStepsData} />
          </View>
          
          <View style={styles.statsHighlights}>
            <View style={styles.statsItem}>
              <Text style={styles.statsValue}>7,232</Text>
              <Text style={styles.statsLabel}>Daily Avg</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statsItem}>
              <Text style={styles.statsValue}>9,823</Text>
              <Text style={styles.statsLabel}>Best Day</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statsItem}>
              <Text style={styles.statsValue}>50,624</Text>
              <Text style={styles.statsLabel}>Total Steps</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Screen Time Reduced</Text>
          <View style={styles.chartContainer}>
            <LineChart data={weeklyScreenTimeData} />
          </View>
          
          <View style={styles.statsHighlights}>
            <View style={styles.statsItem}>
              <Text style={styles.statsValue}>3.7h</Text>
              <Text style={styles.statsLabel}>Daily Avg</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statsItem}>
              <Text style={styles.statsValue}>-32%</Text>
              <Text style={styles.statsLabel}>vs Last Week</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statsItem}>
              <Text style={styles.statsValue}>26h</Text>
              <Text style={styles.statsLabel}>Total</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.streakSection}>
          <View style={styles.streakContainer}>
            <Text style={styles.streakTitle}>Current Streak</Text>
            <Text style={styles.streakValue}>5 Days</Text>
            <Text style={styles.streakSubtitle}>Keep going! You're doing great!</Text>
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
    padding: 24,
    backgroundColor: theme.colors.backgroundSecondary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: theme.colors.text,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 16,
  },
  chartContainer: {
    marginBottom: 16,
    height: 200,
  },
  statsHighlights: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  statsItem: {
    flex: 1,
    alignItems: 'center',
  },
  statsValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: theme.colors.text,
    marginBottom: 4,
  },
  statsLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: theme.colors.border,
  },
  streakSection: {
    marginBottom: 16,
  },
  streakContainer: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  streakTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  streakValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: theme.colors.primary,
    marginBottom: 8,
  },
  streakSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});