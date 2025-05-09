import { useEffect } from 'react'
import { Redirect } from 'expo-router'
import { useFonts } from 'expo-font'
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter'
import { SplashScreen } from 'expo-router'
import useUserStore from '@/shared/state/useUserStore'

SplashScreen.preventAutoHideAsync()

export default function RootScreen() {
    const user = useUserStore((state) => state.user)

    const [fontsLoaded, fontError] = useFonts({
        'Inter-Regular': Inter_400Regular,
        'Inter-Medium': Inter_500Medium,
        'Inter-SemiBold': Inter_600SemiBold,
        'Inter-Bold': Inter_700Bold
    })

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync()
        }
    }, [fontsLoaded, fontError])

    if (!fontsLoaded && !fontError) {
        return null
    }

    return <Redirect href={user ? '/(auth)' : '/(onboarding)/welcome'} />
}
