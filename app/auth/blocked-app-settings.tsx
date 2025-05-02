import React from 'react';
import { StyleSheet, View, Text, Pressable, Image, Switch, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Clock, Calendar, Bell, Lock, Settings2, History, ChevronRight } from 'lucide-react-native';
import { theme } from '@/utils/theme';

interface SettingItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  hasToggle?: boolean;
  onPress?: () => void;
}

function SettingItem({ icon, label, value, hasToggle, onPress }: SettingItemProps) {
  const [isEnabled, setIsEnabled] = React.useState(true);

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.settingItem,
        pressed && styles.settingItemPressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.settingIcon}>
        {icon}
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingLabel}>{label}</Text>
        {value && <Text style={styles.settingValue}>{value}</Text>}
      </View>
      {hasToggle ? (
        <Switch
          value={isEnabled}
          onValueChange={setIsEnabled}
          trackColor={{ false: theme.colors.backgroundSecondary, true: theme.colors.primary }}
          thumbColor={theme.colors.text}
        />
      ) : (
        <ChevronRight size={20} color={theme.colors.textSecondary} />
      )}
    </Pressable>
  );
}

export default function BlockedAppSettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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
        <Text style={styles.headerTitle}>Block Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.appInfo}>
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png' }}
            style={styles.appIcon}
          />
          <Text style={styles.appName}>Instagram</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Active</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lock Time</Text>
          <SettingItem
            icon={<Clock size={20} color={theme.colors.primary} />}
            label="Total Lock Time"
            value="14h 30m"
          />
          <SettingItem
            icon={<History size={20} color={theme.colors.primary} />}
            label="Last Lock"
            value="2h ago"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Schedule</Text>
          <SettingItem
            icon={<Calendar size={20} color={theme.colors.primary} />}
            label="Lock Schedule"
            value="Daily"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lock Settings</Text>
          <SettingItem
            icon={<Bell size={20} color={theme.colors.primary} />}
            label="Lock Notifications"
            hasToggle
          />
          <SettingItem
            icon={<Lock size={20} color={theme.colors.primary} />}
            label="Block App Launch"
            hasToggle
          />
          <SettingItem
            icon={<Settings2 size={20} color={theme.colors.primary} />}
            label="Block Built-in Functions"
            hasToggle
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lock History</Text>
          <View style={styles.historyItem}>
            <Text style={styles.historyDate}>Today, 14:30</Text>
            <Text style={styles.historyDuration}>2h 15m</Text>
          </View>
          <View style={styles.historyItem}>
            <Text style={styles.historyDate}>Yesterday, 09:15</Text>
            <Text style={styles.historyDuration}>4h 45m</Text>
          </View>
          <View style={styles.historyItem}>
            <Text style={styles.historyDate}>Mar 15, 11:20</Text>
            <Text style={styles.historyDuration}>1h 30m</Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable
          style={({ pressed }) => [
            styles.removeButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.removeButtonText}>Remove from Block List</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: theme.colors.backgroundSecondary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 17,
    color: theme.colors.text,
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  appInfo: {
    alignItems: 'center',
    padding: 24,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 16,
  },
  appName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: theme.colors.text,
    marginBottom: 8,
  },
  statusBadge: {
    backgroundColor: theme.colors.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.text,
  },
  section: {
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundSecondary,
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
  },
  settingItemPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  settingIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(13, 86, 236, 0.1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: 2,
  },
  settingValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  historyDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: theme.colors.text,
  },
  historyDuration: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: theme.colors.primary,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  removeButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  removeButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 17,
    color: theme.colors.text,
  },
});