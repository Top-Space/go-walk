import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '@/utils/theme'
import { CountryPicker } from 'react-native-country-codes-picker'
import type { CountryItem } from 'react-native-country-codes-picker'
import { useState } from 'react'

export default function RegisterPhoneScreen() {
    const router = useRouter()
    const insets = useSafeAreaInsets()
    const [countryCode, setCountryCode] = useState('+1')
    const [showCountryPicker, setShowCountryPicker] = useState(false)

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <Text style={styles.appName}>GoWalk</Text>

            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>Let's create your account</Text>
                    <Text style={styles.subtitle}>Link your phone number to GoWalk account to connect with your friends who use GoWalk</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Pressable style={styles.countryCode} onPress={() => setShowCountryPicker(true)}>
                        <Text style={styles.countryCodeText}>{countryCode}</Text>
                    </Pressable>
                    <TextInput style={styles.input} placeholder='000 000 0000' placeholderTextColor={theme.colors.textSecondary} keyboardType='phone-pad' autoFocus />
                </View>

                <CountryPicker
                    lang='en'
                    show={showCountryPicker}
                    pickerButtonOnPress={(item: CountryItem) => {
                        setCountryCode(item.dial_code)
                        setShowCountryPicker(false)
                    }}
                    onBackdropPress={() => setShowCountryPicker(false)}
                    style={{
                        modal: {
                            backgroundColor: theme.colors.background
                        },
                        textInput: {
                            backgroundColor: theme.colors.backgroundSecondary,
                            color: theme.colors.text,
                            fontFamily: 'Inter-Medium'
                        },
                        countryButtonStyles: {
                            backgroundColor: theme.colors.backgroundSecondary
                        },
                        countryName: {
                            color: theme.colors.text,
                            fontFamily: 'Inter-Medium'
                        },
                        dialCode: {
                            color: theme.colors.textSecondary,
                            fontFamily: 'Inter-Medium'
                        }
                    }}
                />

                <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={() => router.push('/onboarding/register-phone-verify')}>
                    <LinearGradient colors={[theme.colors.primary, theme.colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradient}>
                        <Text style={styles.buttonText}>Next</Text>
                    </LinearGradient>
                </Pressable>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <Pressable onPress={() => {}}>
                        <Text style={styles.footerLink}>Sign in</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    appName: {
        fontFamily: 'Inter-Bold',
        fontSize: 20,
        color: theme.colors.text,
        textAlign: 'center',
        marginVertical: 16
    },
    content: {
        flex: 1,
        padding: 24
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: 24,
        color: theme.colors.text,
        marginBottom: 12
    },
    subtitle: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: theme.colors.textSecondary,
        lineHeight: 24,
        marginBottom: 32
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 24
    },
    countryCode: {
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: 12,
        paddingHorizontal: 16,
        justifyContent: 'center',
        marginRight: 12,
        minWidth: 80,
        height: 48
    },
    countryCodeText: {
        fontFamily: 'Inter-Medium',
        fontSize: 16,
        color: theme.colors.text
    },
    input: {
        flex: 1,
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: theme.colors.text,
        fontFamily: 'Inter-Regular'
    },
    button: {
        borderRadius: 30,
        overflow: 'hidden',
        marginBottom: 16
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
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 0
    },
    footerText: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: theme.colors.textSecondary
    },
    footerLink: {
        fontFamily: 'Inter-Medium',
        fontSize: 16,
        color: theme.colors.primary
    },
    countryPickerButton: {
        display: 'none'
    }
})
