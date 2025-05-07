import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { theme } from '@/utils/theme'
import Button from '@/components/Button'
import { Image } from 'expo-image'
import FullLogo from '@/assets/images/full-logo.png'

const WelcomeScreen = () => {
    const insets = useSafeAreaInsets()

    return (
        <ScrollView contentContainerStyle={[styles.scrollContainer, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }]}>
            <View style={styles.container}>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Image source={FullLogo} style={{ width: 246, height: 151 }} />
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Welcome to GoWalk</Text>
                    <Text style={styles.subtitle}>Starting today, let's focus better and accomplish your dreams</Text>

                    <View style={styles.buttonContainer}>
                        <Button title='Get Started' onPress={() => router.push('/(onboarding)/question1')} style={styles.button} />
                        <Button title='Sign in' variant='secondary' onPress={() => router.push('/(onboarding)/login')} style={styles.signInButton} />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: theme.colors.background
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 24
    },
    video: {
        width: '100%',
        height: '100%',
        borderRadius: 16
    },
    contentContainer: {
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: 28,
        marginBottom: 16,
        textAlign: 'center',
        color: theme.colors.text
    },
    subtitle: {
        fontFamily: 'Inter-Regular',
        fontSize: 18,
        marginBottom: 32,
        textAlign: 'center',
        paddingHorizontal: 8,
        lineHeight: 26,
        color: theme.colors.textSecondary
    },
    buttonContainer: {
        width: '100%',
        gap: 12
    },
    button: {
        width: '100%'
    },
    signInButton: {
        width: '100%',
        backgroundColor: theme.colors.backgroundSecondary
    }
})
