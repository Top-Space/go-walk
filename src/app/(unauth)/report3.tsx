import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ProgressBar from '@/components/ProgressBar'
import { theme } from '@/utils/theme'
import useOnboardingStore from '@/shared/state/useOnboardingStore'

export default function Report3Screen() {
    const router = useRouter()
    const insets = useSafeAreaInsets()

    const userStat = useOnboardingStore((state) => state.userStat)

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={styles.header}>
                <ProgressBar progress={0.5} />
            </View>

            <View style={styles.content}>
                <Text style={styles.text}>The good news is that GoWalk can help you get back</Text>
                <Text style={styles.highlight}>{userStat.getBackYearsOfLife} years+</Text>
                <Text style={styles.text}>of your life free from distractions, and help you achieve your dreams.</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footnote}>According to your profile combined with GoWalk program</Text>
                <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={() => router.push('/(unauth)/report4')}>
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
    highlight: {
        fontFamily: 'Inter-Bold',
        fontSize: 40,
        color: theme.colors.secondary,
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
