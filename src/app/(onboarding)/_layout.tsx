import { Stack } from 'expo-router'
import { QuestionProvider } from '@/contexts/QuestionContext'
import { ReportProvider } from '@/contexts/ReportContext'
import { theme } from '@/utils/theme'
import UnAuthProvider from '@/providers/UnAuthProvider'

export default function OnboardingLayout() {
    return (
        <UnAuthProvider>
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
        </UnAuthProvider>
    )
}
