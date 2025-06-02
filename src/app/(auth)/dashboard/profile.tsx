import { StyleSheet, View, Text, Pressable, ScrollView, Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import type { Video as LucideIcon } from 'lucide-react-native'
import { ChevronRight, Crown } from 'lucide-react-native'
import { theme } from '@/utils/theme'
import authService from '@/shared/services/authService'
import { deleteAccount } from '@/shared/api/auth/deleteAccount'

interface SectionItem {
    label: string
    value: string
    icon?: typeof LucideIcon
    isPro?: boolean
    hasArrow?: boolean
}

interface Section {
    title: string
    items: SectionItem[]
}

const SECTIONS: Section[] = [
    {
        title: 'Account',
        items: [{ label: 'Subscription', value: 'Pro', icon: Crown, isPro: true }]
    },
    {
        title: 'Help',
        items: [
            { label: 'FAQs', value: '', hasArrow: true },
            { label: 'Report an Error', value: '', hasArrow: true },
            { label: 'Terms', value: '', hasArrow: true },
            { label: 'Privacy', value: '', hasArrow: true }
        ]
    }
]

export default function ProfileScreen() {
    const insets = useSafeAreaInsets()

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: () => {
                    authService.logout()
                }
            }
        ])
    }

    const handleDeleteProfile = () => {
        Alert.alert('Delete Profile', 'Are you sure you want to delete your profile? This action cannot be undone.', [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    const { data } = await deleteAccount()

                    if (!data) {
                        throw new Error('Failed to delete account')
                    }

                    data.deleteAccount && authService.logout()
                }
            }
        ])
    }

    return (
        <ScrollView style={[styles.container, { paddingTop: insets.top }]} showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>

            <View style={{ flex: 1, justifyContent: 'space-between', padding: 20 }}>
                <View style={styles.content}>
                    {SECTIONS.map((section, sectionIndex) => (
                        <View key={section.title} style={[styles.section, sectionIndex < SECTIONS.length - 1 && styles.sectionMargin]}>
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                            {section.items.map((item, index) => (
                                <Pressable key={item.label} style={({ pressed }) => [styles.item, index < section.items.length - 1 && styles.itemBorder, pressed && styles.itemPressed]}>
                                    <Text style={styles.itemLabel}>{item.label}</Text>
                                    <View style={styles.itemValue}>
                                        {item.icon && <item.icon size={20} color={theme.colors.primary} style={styles.itemIcon} />}
                                        <Text style={[styles.itemValueText, item.isPro && styles.itemValueTextPro]}>{item.value}</Text>
                                        {item.hasArrow && <ChevronRight size={20} color={theme.colors.textSecondary} />}
                                    </View>
                                </Pressable>
                            ))}
                        </View>
                    ))}
                </View>

                <View style={[styles.section, styles.dangerSection]}>
                    <Pressable style={({ pressed }) => [styles.dangerButton, pressed && styles.buttonPressed]} onPress={handleLogout}>
                        <Text style={styles.dangerButtonText}>Logout</Text>
                    </Pressable>
                    <Pressable style={({ pressed }) => [styles.deleteButton, pressed && styles.buttonPressed]} onPress={handleDeleteProfile}>
                        <Text style={[styles.dangerButtonText, styles.deleteButtonText]}>Delete Profile</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    header: {
        padding: 20,
        backgroundColor: theme.colors.backgroundSecondary,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border
    },
    headerTitle: {
        fontFamily: 'Inter-Bold',
        fontSize: 34,
        color: theme.colors.text
    },
    content: {
        gap: 24
    },
    section: {
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: 16,
        overflow: 'hidden'
    },
    sectionMargin: {
        marginBottom: 20
    },
    sectionTitle: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 14,
        color: theme.colors.textSecondary,
        padding: 16,
        textTransform: 'uppercase'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: theme.colors.background,
        marginHorizontal: 8,
        borderRadius: 16,
        marginBottom: 8
    },
    itemPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }]
    },
    itemBorder: {
        borderBottomWidth: 0
    },
    itemLabel: {
        fontFamily: 'Inter-Medium',
        fontSize: 17,
        color: theme.colors.text
    },
    itemValue: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    itemIcon: {
        marginRight: 4
    },
    itemValueText: {
        fontFamily: 'Inter-Regular',
        fontSize: 17,
        color: theme.colors.textSecondary
    },
    itemValueTextPro: {
        color: theme.colors.primary,
        fontFamily: 'Inter-Medium'
    },
    dangerSection: {
        marginTop: 20,
        backgroundColor: 'transparent',
        gap: 12
    },
    dangerButton: {
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
    deleteButton: {
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
    buttonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }]
    },
    dangerButtonText: {
        fontFamily: 'Inter-Medium',
        fontSize: 17,
        textAlign: 'center',
        color: theme.colors.text
    },
    deleteButtonText: {
        color: theme.colors.error
    }
})
