import { StyleSheet, View, Text, Image, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';
import { theme } from '@/utils/theme';

const BLOCKED_APPS = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'https://images.pexels.com/photos/1547726/pexels-photo-1547726.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: 'https://images.pexels.com/photos/3628700/pexels-photo-3628700.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
];

export default function BlockListScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Distracting Apps</Text>
            <Text style={styles.blockedCount}>
              blocked {BLOCKED_APPS.length}/{BLOCKED_APPS.length}
            </Text>
          </View>

          <View style={styles.appsGrid}>
            {BLOCKED_APPS.map(app => (
              <View key={app.id} style={styles.appItem}>
                <Image source={{ uri: app.icon }} style={styles.appIcon} />
                <Text style={styles.appName}>{app.name}</Text>
              </View>
            ))}
            <Pressable style={styles.addAppButton}>
              <View style={styles.addAppIconContainer}>
                <Plus size={24} color={theme.colors.primary} />
              </View>
              <Text style={styles.addAppText}>Add App</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 16,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: theme.colors.text,
  },
  blockedCount: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  appsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  appItem: {
    width: 80,
    alignItems: 'center',
  },
  appIcon: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginBottom: 8,
  },
  appName: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: theme.colors.text,
    textAlign: 'center',
  },
  addAppButton: {
    width: 80,
    alignItems: 'center',
  },
  addAppIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  addAppText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: theme.colors.primary,
    textAlign: 'center',
  },
});