import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ArrowLeft } from 'lucide-react-native'
import ProgressBar from '@/components/ProgressBar'
import SelectionButton from '@/components/SelectionButton'
import { theme } from '@/utils/theme'
import useOnboardingStore from '@/shared/state/useOnboardingStore'
import type { OnboardingAge } from '@/shared/types'
import { OnboardingAges } from '@/shared/types'

const OPTIONS = [
    { label: 'Under 18', value: OnboardingAges.UNDER_18 },
    { label: '18–24', value: OnboardingAges.EIGHTEEN_TO_TWENTY_FOUR },
    { label: '25–34', value: OnboardingAges.TWENTY_FIVE_TO_THIRTY_FOUR },
    { label: '35–44', value: OnboardingAges.THIRTY_FIVE_TO_FOURTY_FOUR },
    { label: '45–55', value: OnboardingAges.FORTY_FIVE_TO_FIFTY_FIVE }
]

export default function Question2Screen() {
    const router = useRouter()
    const insets = useSafeAreaInsets()

    const userInfo = useOnboardingStore((state) => state.userInfo)
    const setUserInfo = useOnboardingStore((state) => state.setUserInfo)

    const handleSelect = (value: OnboardingAge) => {
        setUserInfo({ age: value })
        router.push('/(onboarding)/question3')
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Pressable style={styles.backButton} onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <ArrowLeft size={24} color={theme.colors.text} />
                </Pressable>
                <View style={styles.progressContainer}>
                    <ProgressBar progress={0.33} />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Text style={styles.title}>How old are you?</Text>

                    <View style={styles.optionsContainer}>
                        {OPTIONS.map(({ label, value }, index) => (
                            <SelectionButton key={index} label={label} isSelected={userInfo.age === value} onPress={() => handleSelect(value)} style={index === OPTIONS.length - 1 ? { marginBottom: 0 } : undefined} />
                        ))}
                    </View>
                </View>
            </ScrollView>
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
    backButton: {
        marginBottom: 16
    },
    progressContainer: {
        marginBottom: 8
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 24
    },
    content: {
        flex: 1,
        paddingTop: 16
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: 24,
        marginBottom: 32,
        color: theme.colors.text
    },
    optionsContainer: {
        width: '100%'
    }
})
