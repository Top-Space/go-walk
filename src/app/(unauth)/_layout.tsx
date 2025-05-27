import { Redirect, Stack } from 'expo-router'
import { theme } from '@/utils/theme'
import useUserStore from '@/shared/state/useUserStore'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'
export default function OnboardingLayout() {
    const router = useRouter()
    const user = useUserStore((state) => state.user)

    if (user) {
        return <Redirect href='/(auth)' />
    }

    useEffect(() => {
        router.push('/(commons)/subscription/can-help')
    }, [])

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
