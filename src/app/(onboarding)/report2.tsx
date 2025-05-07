import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ProgressBar from '@/components/ProgressBar'
import { theme } from '@/utils/theme'

export default function Report2Screen() {
    const router = useRouter()
    const insets = useSafeAreaInsets()

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={styles.header}>
                <ProgressBar progress={0.25} />
            </View>

            <View style={styles.content}>
                <Text style={styles.text}>
                    The bad news is that you'll spend <Text style={styles.bold}>114 days</Text> on your phone this year.
                </Text>
                <Text style={styles.text}>Meaning that you're on track to spend</Text>
                <Text style={styles.highlight}>22 years</Text>
                <Text style={styles.text}>of your life looking down at your phone.</Text>
                <Text style={styles.text}>Yep, you read this right.</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footnote}>Projection off your current Screen Time habits, based on an average 78 waking hours each day.</Text>
                <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={() => router.push('/(onboarding)/report3')}>
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
    text: {
        fontFamily: 'Inter-Regular',
        fontSize: 18,
        lineHeight: 28,
        textAlign: 'center',
        color: theme.colors.text,
        marginBottom: 16
    },
    bold: {
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        lineHeight: 28,
        color: theme.colors.text
    },
    highlight: {
        fontFamily: 'Inter-Bold',
        fontSize: 40,
        color: theme.colors.primary,
        marginVertical: 16,
        textAlign: 'center'
    },
    footer: {
        paddingHorizontal: 24,
        paddingVertical: 16
    },
    footnote: {
        fontFamily: 'Inter-Regular',
        fontSize: 12,
        textAlign: 'center',
        color: theme.colors.textSecondary,
        marginBottom: 24,
        paddingHorizontal: 24
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
