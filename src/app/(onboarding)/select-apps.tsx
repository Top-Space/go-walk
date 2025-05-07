import { useState } from 'react'
import { StyleSheet, View, Text, Pressable, Image, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { useAnimatedStyle, withSpring, withRepeat, withSequence, withDelay } from 'react-native-reanimated'
import { theme } from '@/utils/theme'

const APPS = [
    {
        id: 'instagram',
        name: 'Instagram',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png'
    },
    {
        id: 'tiktok',
        name: 'TikTok',
        icon: 'https://i.pinimg.com/736x/e1/0e/3f/e10e3f21d3b4e0f40b04b8fee7f40da4.jpg'
    },
    {
        id: 'youtube',
        name: 'YouTube',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png'
    },
    {
        id: 'facebook',
        name: 'Facebook',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png'
    },
    {
        id: 'x',
        name: 'X',
        icon: 'https://img.freepik.com/darmowe-wektory/nowy-projekt-ikony-x-logo-twittera-2023_1017-45418.jpg'
    },
    {
        id: 'snapchat',
        name: 'Snapchat',
        icon: 'https://animationvisarts.com/wp-content/uploads/2024/01/image.png'
    }
]

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const SelectAppsScreen = () => {
    const insets = useSafeAreaInsets()
    const [selectedApps, setSelectedApps] = useState<string[]>([])

    const handleAppSelect = (appId: string) => {
        setSelectedApps((prev) => {
            if (prev.includes(appId)) {
                return prev.filter((id) => id !== appId)
            }
            if (prev.length < 3) {
                return [...prev, appId]
            }

            return prev
        })
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.subtitle}>Now, let's start to focus.</Text>
                    <Text style={styles.title}>Select up to 3 distracting apps</Text>
                    <Text style={styles.description}>You can always change this later or create a new group of apps to block.</Text>
                </View>

                <View style={styles.appsGrid}>
                    {APPS.map((app, index) => (
                        <AppIcon key={app.id} app={app} index={index} isSelected={selectedApps.includes(app.id)} onSelect={() => handleAppSelect(app.id)} />
                    ))}
                </View>
            </ScrollView>

            <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
                <Pressable style={({ pressed }) => [styles.button, selectedApps.length === 0 && styles.buttonDisabled, pressed && styles.buttonPressed]} disabled={selectedApps.length === 0}>
                    <LinearGradient colors={selectedApps.length > 0 ? [theme.colors.primary, theme.colors.secondary] : ['#4B5563', '#6B7280']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradient}>
                        <Text style={styles.buttonText}>Select Apps</Text>
                    </LinearGradient>
                </Pressable>
            </View>
        </View>
    )
}

export default SelectAppsScreen

const AppIcon = ({ app, index, isSelected, onSelect }: { app: any; index: number; isSelected: boolean; onSelect: () => void }) => {
    const animatedStyle = useAnimatedStyle(() => {
        const delay = index * 100

        return {
            transform: [
                {
                    translateY: withSequence(withDelay(delay, withSpring(-20, { damping: 5, stiffness: 100 })), withRepeat(withSpring(0, { damping: 5, stiffness: 100 }), -1, true))
                }
            ]
        }
    }, [])

    return (
        <AnimatedPressable style={[styles.appContainer, animatedStyle]} onPress={onSelect}>
            <View style={[styles.appIconWrapper, isSelected && styles.appIconSelected]}>
                <Image source={{ uri: app.icon }} style={styles.appIcon} />
                {isSelected && (
                    <View style={styles.selectedOverlay}>
                        <LinearGradient colors={['rgba(124, 58, 237, 0.8)', 'rgba(59, 130, 246, 0.8)']} style={StyleSheet.absoluteFill} />
                    </View>
                )}
            </View>
            <Text style={styles.appName}>{app.name}</Text>
        </AnimatedPressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    scrollContent: {
        padding: 24
    },
    header: {
        marginBottom: 40
    },
    subtitle: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: theme.colors.textSecondary,
        marginBottom: 8
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: 28,
        color: theme.colors.text,
        marginBottom: 12
    },
    description: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: theme.colors.textSecondary,
        lineHeight: 24
    },
    appsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    appContainer: {
        width: '33.33%',
        alignItems: 'center',
        marginBottom: 24
    },
    appIconWrapper: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 8,
        overflow: 'hidden',
        backgroundColor: theme.colors.backgroundSecondary
    },
    appIconSelected: {
        borderWidth: 2,
        borderColor: theme.colors.primary
    },
    appIcon: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    selectedOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center'
    },
    appName: {
        fontFamily: 'Inter-Medium',
        fontSize: 14,
        color: theme.colors.text,
        textAlign: 'center'
    },
    footer: {
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border
    },
    button: {
        borderRadius: 100,
        overflow: 'hidden'
    },
    buttonDisabled: {
        opacity: 0.5
    },
    buttonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }]
    },
    gradient: {
        paddingVertical: 16,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 18,
        color: theme.colors.text
    }
})
