import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import ProgressBar from '@/components/ProgressBar'
import { theme } from '@/utils/theme'

export default function Report4Screen() {
    const router = useRouter()
    const insets = useSafeAreaInsets()

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={styles.header}>
                <ProgressBar progress={0.75} />
            </View>

            <View style={styles.content}>
                <View style={styles.emojiContainer}>
                    <LinearGradient colors={[theme.colors.primary, theme.colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.emojiBackground}>
                        <Text style={styles.emoji}>🚀</Text>
                    </LinearGradient>
                </View>
                <Text style={styles.title}>Let's take the first step:</Text>
                <Text style={styles.text}>GoWalk will connect to your Screen Time to give you a personalized focus report.</Text>
            </View>

            <View style={styles.footer}>
                <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={() => router.push('/(unauth)/access-screen-time')}>
                    <LinearGradient colors={[theme.colors.primary, theme.colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradient}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </LinearGradient>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 16
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 32
    },
    emojiContainer: {
        marginBottom: 32,
        alignItems: 'center'
    },
    emojiBackground: {
        width: 200,
        height: 200,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emoji: {
        fontSize: 80
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: 24,
        marginBottom: 16,
        color: theme.colors.text
    },
    text: {
        fontFamily: 'Inter-Regular',
        fontSize: 18,
        lineHeight: 28,
        color: theme.colors.text
    },
    footer: {
        paddingHorizontal: 24,
        paddingVertical: 16
    },
    button: {
        borderRadius: 100,
        overflow: 'hidden'
    },
    buttonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }]
    },
    gradient: {
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 18,
        color: theme.colors.text
    }
})
