import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ChevronRight,
  Crown,
  CircleHelp as HelpCircle,
  LucideIcon,
} from "lucide-react-native";
import { theme } from "@/utils/theme";

interface SectionItem {
  label: string;
  value: string;
  icon?: LucideIcon;
  isPro?: boolean;
  hasArrow?: boolean;
}

interface Section {
  title: string;
  items: SectionItem[];
}

const SECTIONS: Section[] = [
  {
    title: "You",
    items: [
      { label: "Your Goal", value: "Connect with people" },
      { label: "Age Range", value: "55+" },
      { label: "Your Starting Screentime", value: "8h" },
    ],
  },
  {
    title: "Account",
    items: [{ label: "Subscription", value: "Pro", icon: Crown, isPro: true }],
  },
  {
    title: "Help",
    items: [
      { label: "FAQs", value: "", hasArrow: true },
      { label: "Report an Error", value: "", hasArrow: true },
      { label: "Terms", value: "", hasArrow: true },
      { label: "Privacy", value: "", hasArrow: true },
    ],
  },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          // TODO: Implement logout logic
        },
      },
    ]);
  };

  const handleDeleteProfile = () => {
    Alert.alert(
      "Delete Profile",
      "Are you sure you want to delete your profile? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // TODO: Implement delete profile logic
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.content}>
        {SECTIONS.map((section, sectionIndex) => (
          <View
            key={section.title}
            style={[
              styles.section,
              sectionIndex < SECTIONS.length - 1 && styles.sectionMargin,
            ]}
          >
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, index) => (
              <Pressable
                key={item.label}
                style={[
                  styles.item,
                  index < section.items.length - 1 && styles.itemBorder,
                ]}
              >
                <Text style={styles.itemLabel}>{item.label}</Text>
                <View style={styles.itemValue}>
                  {item.icon && (
                    <item.icon
                      size={20}
                      color={theme.colors.primary}
                      style={styles.itemIcon}
                    />
                  )}
                  <Text
                    style={[
                      styles.itemValueText,
                      item.isPro && styles.itemValueTextPro,
                    ]}
                  >
                    {item.value}
                  </Text>
                  {item.hasArrow && (
                    <ChevronRight
                      size={20}
                      color={theme.colors.textSecondary}
                    />
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        ))}

        <View style={[styles.section, styles.dangerSection]}>
          <Pressable
            style={[styles.dangerButton, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={styles.dangerButtonText}>Logout</Text>
          </Pressable>
          <Pressable
            style={[styles.dangerButton, styles.deleteButton]}
            onPress={handleDeleteProfile}
          >
            <Text style={[styles.dangerButtonText, styles.deleteButtonText]}>
              Delete Profile
            </Text>
          </Pressable>
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
  header: {
    padding: 20,
    backgroundColor: theme.colors.backgroundSecondary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: theme.colors.text,
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 16,
    overflow: "hidden",
  },
  sectionMargin: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: theme.colors.text,
    padding: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  itemLabel: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: theme.colors.text,
  },
  itemValue: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemIcon: {
    marginRight: 8,
  },
  itemValueText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginRight: 8,
  },
  itemValueTextPro: {
    color: theme.colors.primary,
    fontFamily: "Inter-Medium",
  },
  dangerSection: {
    marginTop: 20,
    backgroundColor: "transparent",
  },
  dangerButton: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: theme.colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  logoutButton: {
    backgroundColor: theme.colors.backgroundSecondary,
  },
  deleteButton: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderColor: theme.colors.error,
  },
  dangerButtonText: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    textAlign: "center",
    color: theme.colors.text,
  },
  deleteButtonText: {
    color: theme.colors.error,
  },
});
