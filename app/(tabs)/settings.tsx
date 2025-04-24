import { StyleSheet, View, Text, Switch, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell, Clock, Shield, User, ChevronRight, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { theme } from '@/utils/theme';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View 
      style={[
        styles.container, 
        { paddingTop: insets.top, paddingBottom: insets.bottom }
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileInitials}>JD</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
          </View>
          <Pressable style={styles.profileEditButton}>
            <Text style={styles.profileEditButtonText}>Edit</Text>
          </Pressable>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Bell size={20} color={theme.colors.text} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Notifications</Text>
            </View>
            <Switch
              trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
              thumbColor={theme.colors.text}
              ios_backgroundColor={theme.colors.border}
              value={true}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Clock size={20} color={theme.colors.text} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Daily Reminders</Text>
              <Text style={styles.settingSubLabel}>Set reminder time</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textSecondary} />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Shield size={20} color={theme.colors.text} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Privacy</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textSecondary} />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <User size={20} color={theme.colors.text} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Account</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textSecondary} />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <HelpCircle size={20} color={theme.colors.text} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Help & Support</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textSecondary} />
          </View>
          
          <Pressable style={styles.logoutButton}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </Pressable>
        </View>
        
        <Text style={styles.version}>Version 1.0.0</Text>
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
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.colors.backgroundSecondary,
    marginBottom: 16,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInitials: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: theme.colors.text,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  profileEditButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  profileEditButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.text,
  },
  section: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 12,
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: theme.colors.text,
    marginVertical: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: theme.colors.text,
  },
  settingSubLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginTop: 8,
  },
  logoutButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#EF4444',
    marginLeft: 8,
  },
  version: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginVertical: 24,
  },
});