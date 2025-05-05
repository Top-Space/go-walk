import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Check } from 'lucide-react-native'
import { theme } from '@/utils/theme'

export default function SubscriptionScreen() {
    const router = useRouter()
    const insets = useSafeAreaInsets()

    const handleSubscribe = () => {
        router.push('/onboarding/subscription-plan')
    }

    return (
        <ScrollView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]} contentContainerStyle={styles.scrollContent}>
            <Pressable style={styles.restoreButton}>
                <Text style={styles.restoreText}>Restore</Text>
            </Pressable>

            <View style={styles.content}>
                <Text style={styles.title}>Start your Free Trial and gain 2+ hours back</Text>

                <View style={styles.steps}>
                    <View style={styles.step}>
                        <View style={[styles.stepIcon, styles.stepCompleted]}>
                            <Check size={16} color={theme.colors.text} />
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Get your Focus Diagnosis</Text>
                            <Text style={styles.stepDescription}>You successfully started your journey</Text>
                        </View>
                    </View>

                    <View style={styles.step}>
                        <View style={styles.stepIcon}>
                            <Text style={styles.stepNumber}>2</Text>
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Today: Improve Your Focus</Text>
                            <Text style={styles.stepDescription}>Block apps automatically, get your detailed stats and stay on track</Text>
                        </View>
                    </View>

                    <View style={styles.step}>
                        <View style={styles.stepIcon}>
                            <Text style={styles.stepNumber}>3</Text>
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Day 3: See first results</Text>
                            <Text style={styles.stepDescription}>We'll send you a notification with a report to see how you improved so far</Text>
                        </View>
                    </View>

                    <View style={styles.step}>
                        <View style={styles.stepIcon}>
                            <Text style={styles.stepNumber}>4</Text>
                        </View>
                        <View style={styles.stepContent}>
                            <Text style={styles.stepTitle}>Day 4: Trial Ends</Text>
                            <Text style={styles.stepDescription}>Your subscription will start on day 4. Cancel anytime during the 3-day trial</Text>
                        </View>
                    </View>
                </View>

                <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={handleSubscribe}>
                    <LinearGradient colors={[theme.colors.primary, theme.colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradient}>
                        <Text style={styles.buttonText}>Start Your Free Trial</Text>
                    </LinearGradient>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24
    },
    restoreButton: {
        alignSelf: 'flex-end',
        padding: 16
    },
    restoreText: {
        fontFamily: 'Inter-Medium',
        fontSize: 14,
        color: theme.colors.primary
    },
    content: {
        flex: 1,
        padding: 24
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: 24,
        color: theme.colors.text,
        marginBottom: 32,
        textAlign: 'center',
        lineHeight: 32
    },
    steps: {
        gap: 24,
        marginBottom: 32
    },
    step: {
        flexDirection: 'row',
        gap: 16
    },
    stepIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.backgroundSecondary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    stepCompleted: {
        backgroundColor: theme.colors.primary
    },
    stepNumber: {
        fontFamily: 'Inter-Bold',
        fontSize: 14,
        color: theme.colors.text
    },
    stepContent: {
        flex: 1
    },
    stepTitle: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
        color: theme.colors.text,
        marginBottom: 4
    },
    stepDescription: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: theme.colors.textSecondary,
        lineHeight: 20
    },
    button: {
        borderRadius: 100,
        overflow: 'hidden',
        marginTop: 32
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
