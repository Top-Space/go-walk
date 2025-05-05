import { Stack } from 'expo-router'
import { QuestionProvider } from '@/contexts/QuestionContext'
import { ReportProvider } from '@/contexts/ReportContext'
import { theme } from '@/utils/theme'

export default function OnboardingLayout() {
    return (
        <QuestionProvider>
            <ReportProvider>
                <Stack
                    screenOptions={{
                        headerShown: false,
                        animation: 'slide_from_right',
                        contentStyle: { backgroundColor: theme.colors.background }
                    }}
                />
            </ReportProvider>
        </QuestionProvider>
    )
}
