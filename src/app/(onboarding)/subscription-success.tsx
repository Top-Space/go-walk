import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { theme } from '@/utils/theme'

export default function SubscriptionSuccessScreen() {
    const router = useRouter()
    const insets = useSafeAreaInsets()

    const handleNext = () => {
        router.push('/(onboarding)/select-apps')
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={styles.popup}>
                <Text style={styles.title}>You're all set</Text>
                <Text style={styles.description}>Your purchase was successful</Text>
                <Pressable style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>OK</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24
    },
    popup: {
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: 16,
        padding: 24,
        width: '100%',
        maxWidth: 320,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: 20,
        color: theme.colors.text,
        marginBottom: 8
    },
    description: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: theme.colors.textSecondary,
        marginBottom: 24
    },
    button: {
        backgroundColor: theme.colors.primary,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 24
    },
    buttonText: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
        color: theme.colors.text
    }
})
