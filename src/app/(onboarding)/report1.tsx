import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import ProgressBar from '@/components/ProgressBar'
import { theme } from '@/utils/theme'

export default function Report1Screen() {
    const router = useRouter()
    const insets = useSafeAreaInsets()

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={styles.header}>
                <ProgressBar progress={0.0} />
            </View>

            <View style={styles.content}>
                <View style={styles.emojiContainer}>
                    <LinearGradient colors={[theme.colors.primary, theme.colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.emojiBackground}>
                        <Text style={styles.emoji}>👀</Text>
                    </LinearGradient>
                </View>
                <Text style={styles.message}>Some not-so-good news, and some great news.</Text>
            </View>

            <View style={styles.footer}>
                <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={() => router.push('/(onboarding)/report2')}>
                    <Text style={styles.buttonText}>Continue</Text>
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
        alignItems: 'center',
        paddingHorizontal: 32
    },
    emojiContainer: {
        marginBottom: 32
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
    message: {
        fontFamily: 'Inter-Bold',
        fontSize: 28,
        lineHeight: 38,
        textAlign: 'center',
        color: theme.colors.text
    },
    footer: {
        paddingHorizontal: 24,
        paddingVertical: 16
    },
    button: {
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: 100,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border
    },
    buttonPressed: {
        backgroundColor: theme.colors.background,
        transform: [{ scale: 0.98 }]
    },
    buttonText: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 18,
        color: theme.colors.text
    }
})
