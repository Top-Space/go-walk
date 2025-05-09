import React, { useState } from 'react'
import { StyleSheet, View, Text, Pressable, Image, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Plus } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { theme } from '@/utils/theme'
import AddAppModal from '@/components/AddAppModal'

const BLOCKED_APPS = [
    {
        id: 'instagram',
        name: 'Instagram',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png'
    },
    {
        id: 'tiktok',
        name: 'TikTok',
        icon: 'https://i.pinimg.com/736x/e1/0e/3f/e10e3f21d3b4e0f40b04b8fee7f40da4.jpg'
    }
]

export default function BlockListScreen() {
    const insets = useSafeAreaInsets()
    const router = useRouter()
    const [apps, setApps] = useState(BLOCKED_APPS)
    const [showAddModal, setShowAddModal] = useState(false)

    const handleAddApp = (app: (typeof BLOCKED_APPS)[0]) => {
        setApps((current) => [...current, app])
    }

    return (
        <>
            <ScrollView style={[styles.container, { paddingTop: insets.top }]} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Block List</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Your Distracting Apps</Text>
                        <Text style={styles.blockedCount}>
                            blocked {apps.length}/{apps.length}
                        </Text>

                        <View style={styles.appsGrid}>
                            {apps.map((app) => (
                                <Pressable key={app.id} style={({ pressed }) => [styles.appItem, pressed && styles.appItemPressed]} onPress={() => app.id === 'instagram' && router.push('/(auth)/dashboard/blocked-app')}>
                                    <Image source={{ uri: app.icon }} style={styles.appIcon} />
                                    <Text style={styles.appName}>{app.name}</Text>
                                </Pressable>
                            ))}
                            <Pressable style={({ pressed }) => [styles.addAppButton, pressed && styles.appItemPressed]} onPress={() => setShowAddModal(true)}>
                                <View style={styles.addAppIconContainer}>
                                    <Plus size={24} color={theme.colors.primary} />
                                </View>
                                <Text style={styles.addAppText}>Add App</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <AddAppModal visible={showAddModal} onClose={() => setShowAddModal(false)} onAdd={handleAddApp} />
        </>
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
        padding: 20,
        gap: 24
    },
    section: {
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: 24,
        padding: 20
    },
    sectionTitle: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginBottom: 4,
        textTransform: 'uppercase'
    },
    blockedCount: {
        fontFamily: 'Inter-Medium',
        fontSize: 17,
        color: theme.colors.textSecondary,
        marginBottom: 20
    },
    appsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16
    },
    appItem: {
        width: 80,
        alignItems: 'center'
    },
    appItemPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }]
    },
    appIcon: {
        width: 60,
        height: 60,
        borderRadius: 16,
        marginBottom: 8,
        resizeMode: 'cover'
    },
    appName: {
        fontFamily: 'Inter-Medium',
        fontSize: 13,
        color: theme.colors.text,
        textAlign: 'center'
    },
    addAppButton: {
        width: 80,
        alignItems: 'center'
    },
    addAppIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: theme.colors.border,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
    },
    addAppText: {
        fontFamily: 'Inter-Medium',
        fontSize: 13,
        color: theme.colors.primary,
        textAlign: 'center'
    }
})
