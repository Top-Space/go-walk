import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { theme } from '@/utils/theme'
import { Image } from 'expo-image'
import ProgressBar from '@/components/ProgressBar'
import { LinearGradient } from 'expo-linear-gradient'

export default function BlockedAppScreen() {
    const insets = useSafeAreaInsets()

    return (
        <View style={[styles.container, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 }]}>
            <View style={styles.content}>
                <View style={{ gap: 8, alignItems: 'center', marginBottom: 24 }}>
                    <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png' }} style={styles.appIcon} />
                    <Text style={styles.title}>🚫 Instagram is blocked for now — let's get moving!</Text>
                </View>
                <View style={{ gap: 16, alignItems: 'center', marginBottom: 32 }}>
                    <Text style={styles.description}>You're doing awesome! Just 5,200 more steps to unlock Instagram. You've got this!</Text>
                    <View style={{ gap: 8, width: '100%' }}>
                        <ProgressBar progress={0.5} style={{ height: 20, borderRadius: 32, backgroundColor: theme.colors.backgroundSecondary }} />
                        <Text style={styles.progressText}>4 800 / 10 000 steps</Text>
                    </View>
                </View>
                <View style={styles.balanceCard}>
                    <View style={styles.balanceCardHeader}>
                        <Text style={styles.balanceCardTitle}>⏱ Exchange minutes for steps!</Text>
                        <Text style={styles.balanceCardDescription}>You've earned minutes by staying active. Use your accumulated time to unlock Instagram early—no need to wait!</Text>
                    </View>
                    <View style={styles.balanceCardFooter}>
                        <Text style={styles.balanceCardFooterText}>Your balance:</Text>
                        <Text style={styles.balanceCardFooterValue}>45 min</Text>
                    </View>
                </View>
                {/* <View style={styles.cardWrapper}>
                    <View style={styles.cardBackground}>
                        <Text style={styles.cardContent}>💬 The real magic happens outside — go explore it one step at a time.</Text>
                    </View>
                </View> */}
            </View>
            <View style={styles.footer}>
                <Pressable style={({ pressed }) => [styles.acceptButton, pressed && styles.buttonPressed]}>
                    <LinearGradient colors={[theme.colors.primary, theme.colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradient}>
                        <Text style={styles.acceptButtonText}>Exchange Steps</Text>
                    </LinearGradient>
                </Pressable>
                {/* <Pressable style={({ pressed }) => [styles.acceptButton, pressed && styles.buttonPressed]}>
                    <LinearGradient colors={[theme.colors.primary, theme.colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradient}>
                        <Text style={styles.acceptButtonText}>Go Explore</Text>
                    </LinearGradient>
                </Pressable> */}
                <Pressable style={({ pressed }) => [styles.closeButton, pressed && styles.buttonPressed]}>
                    <Text style={styles.closeButtonText}>Manage Blocked App</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        gap: 32
    },
    appIcon: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: 24,
        color: theme.colors.text,
        textAlign: 'center'
    },
    description: {
        fontFamily: 'Inter-Regular',
        fontSize: 18,
        color: theme.colors.text,
        textAlign: 'center'
    },
    progressText: {
        fontFamily: 'Inter-Regular',
        fontSize: 18,
        color: theme.colors.text,
        textAlign: 'center'
    },
    balanceCard: {
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: 24,
        padding: 16
    },
    balanceCardHeader: {
        gap: 12
    },
    balanceCardTitle: {
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        color: theme.colors.text,
        textAlign: 'center'
    },
    balanceCardDescription: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: theme.colors.text,
        textAlign: 'center'
    },
    balanceCardFooter: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    balanceCardFooterText: {
        fontFamily: 'Inter-Regular',
        fontSize: 20,
        color: theme.colors.textTertiary,
        textAlign: 'center'
    },
    balanceCardFooterValue: {
        fontFamily: 'Inter-ExtraBold',
        fontSize: 32,
        color: theme.colors.primary,
        textAlign: 'center'
    },
    content: {
        flex: 1
    },
    footer: {
        gap: 8
    },
    acceptButton: {
        borderRadius: 100,
        overflow: 'hidden'
    },
    closeButton: {
        borderRadius: 100,
        backgroundColor: theme.colors.backgroundSecondary,
        paddingVertical: 16,
        alignItems: 'center'
    },
    buttonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }]
    },
    gradient: {
        paddingVertical: 16,
        alignItems: 'center'
    },
    acceptButtonText: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 18,
        color: theme.colors.text
    },
    closeButtonText: {
        fontFamily: 'Inter-Medium',
        fontSize: 18,
        color: theme.colors.primary
    },
    cardWrapper: {
        backgroundColor: theme.colors.primary,
        borderRadius: 24,
        paddingLeft: 4
    },
    cardBackground: {
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: 20,
        padding: 16
    },
    cardContent: {
        fontFamily: 'Inter-Regular',
        fontStyle: 'italic',
        fontSize: 16,
        color: theme.colors.text
    }
})
