import { Redirect, Stack } from 'expo-router'
import { theme } from '@/utils/theme'
import useUserStore from '@/shared/state/useUserStore'

export default function OnboardingLayout() {
    const user = useUserStore((state) => state.user)

    if (user) {
        return <Redirect href='/(auth)' />
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
                contentStyle: { backgroundColor: theme.colors.background }
            }}
        />
    )
}
