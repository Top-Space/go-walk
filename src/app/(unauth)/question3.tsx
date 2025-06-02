import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ArrowLeft } from 'lucide-react-native'
import ProgressBar from '@/components/ProgressBar'
import SelectionButton from '@/components/SelectionButton'
import { theme } from '@/utils/theme'
import useOnboardingStore from '@/shared/state/useOnboardingStore'
import type { OnboardingOccupation } from '@/shared/types'
import { OnboardingOccupations } from '@/shared/types'

const OPTIONS = [
    { label: 'Student / Academic', value: OnboardingOccupations.STUDENT_ACADEMIC },
    { label: 'Software Development', value: OnboardingOccupations.SOFTWARE_DEVELOPMENT },
    { label: 'CEO / Founder', value: OnboardingOccupations.CEO_FOUNDER },
    { label: 'Remote Worker', value: OnboardingOccupations.REMOTE_WORKER },
    { label: 'Finance / Ops / Consulting', value: OnboardingOccupations.FINANCE_OPS_CONSULTING },
    { label: 'Art / Content', value: OnboardingOccupations.ART_CONTENT },
    { label: 'Other', value: OnboardingOccupations.OTHER }
]

export default function Question3Screen() {
    const router = useRouter()
    const insets = useSafeAreaInsets()

    const userInfo = useOnboardingStore((state) => state.userInfo)
    const setUserInfo = useOnboardingStore((state) => state.setUserInfo)

    const handleSelect = (option: OnboardingOccupation) => {
        setUserInfo({ occupation: option })
        router.push('/(unauth)/analyzing')
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Pressable style={styles.backButton} onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <ArrowLeft size={24} color={theme.colors.text} />
                </Pressable>
                <View style={styles.progressContainer}>
                    <ProgressBar progress={0.66} />
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Text style={styles.title}>What is your occupation?</Text>

                    <View style={styles.optionsContainer}>
                        {OPTIONS.map((option, index) => (
                            <SelectionButton key={index} label={option.label} isSelected={userInfo.occupation === option.value} onPress={() => handleSelect(option.value)} style={index === OPTIONS.length - 1 ? { marginBottom: 0 } : undefined} />
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
