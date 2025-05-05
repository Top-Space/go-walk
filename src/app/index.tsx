import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Redirect } from 'expo-router'
import { useFonts } from 'expo-font'
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter'
import { SplashScreen } from 'expo-router'

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync()

export default function RootScreen() {
    // Load fonts
    const [fontsLoaded, fontError] = useFonts({
        'Inter-Regular': Inter_400Regular,
        'Inter-Medium': Inter_500Medium,
        'Inter-SemiBold': Inter_600SemiBold,
        'Inter-Bold': Inter_700Bold
    })

    useEffect(() => {
        if (fontsLoaded || fontError) {
            // Hide the splash screen once fonts are loaded
            SplashScreen.hideAsync()
        }
    }, [fontsLoaded, fontError])

    // Return null while fonts are loading
    if (!fontsLoaded && !fontError) {
        return null
    }

    // Redirect directly to the welcome screen
    return <Redirect href='/onboarding/welcome' />
}
