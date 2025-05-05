import React from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '@/utils/theme'

export default function OneTimeOfferScreen() {
    const router = useRouter()
    const insets = useSafeAreaInsets()

    const handleAcceptOffer = () => {
        router.push('/onboarding/subscription-success')
    }

    const handleClose = () => {
        router.push('/onboarding/select-apps')
    }

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: insets.top + 24,
                    paddingBottom: insets.bottom + 24
                }
            ]}
        >
            <View style={styles.content}>
                <Text style={styles.title}>ONE TIME OFFER</Text>
                <Text style={styles.subtitle}>You will never see this again</Text>

                <View style={styles.discountBox}>
                    <Text style={styles.discountText}>60%</Text>
                    <Text style={styles.discountLabel}>DISCOUNT</Text>
                </View>

                <View style={styles.planContainer}>
                    <Text style={styles.lowestPrice}>LOWEST PRICE EVER</Text>
                    <View style={styles.planBox}>
                        <Text style={styles.planName}>Yearly</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.monthlyPrice}>$2.49 /per month</Text>
                            <Text style={styles.yearlyPrice}>$29.99 /per year</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <Pressable style={({ pressed }) => [styles.acceptButton, pressed && styles.buttonPressed]} onPress={handleAcceptOffer}>
                    <LinearGradient colors={[theme.colors.primary, theme.colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradient}>
                        <Text style={styles.acceptButtonText}>Start Your Free Trial & Save 60%</Text>
                    </LinearGradient>
                </Pressable>

                <Pressable style={({ pressed }) => [styles.closeButton, pressed && styles.buttonPressed]} onPress={handleClose}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 24
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: 28,
        color: theme.colors.text,
        textAlign: 'center',
        marginBottom: 8
    },
    subtitle: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: 40
    },
    discountBox: {
        backgroundColor: theme.colors.primary,
        borderRadius: 20,
        paddingVertical: 24,
        paddingHorizontal: 48,
        alignItems: 'center',
        marginBottom: 48,
        shadowColor: theme.colors.primary,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowOpacity: 0.6,
        shadowRadius: 24,
        elevation: 10
    },
    discountText: {
        fontFamily: 'Inter-Bold',
        fontSize: 72,
        color: theme.colors.text
    },
    discountLabel: {
        fontFamily: 'Inter-Medium',
        fontSize: 20,
        color: theme.colors.text,
        marginTop: 4
    },
    planContainer: {
        width: '100%'
    },
    lowestPrice: {
        fontFamily: 'Inter-Bold',
        fontSize: 16,
        color: theme.colors.text,
        textAlign: 'center',
        backgroundColor: theme.colors.primary,
        paddingVertical: 12,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    planBox: {
        backgroundColor: theme.colors.backgroundSecondary,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.primary
    },
    planName: {
        fontFamily: 'Inter-Bold',
        fontSize: 24,
        color: theme.colors.text
    },
    priceContainer: {
        alignItems: 'flex-end'
    },
    monthlyPrice: {
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        color: theme.colors.text,
        marginBottom: 4
    },
    yearlyPrice: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        color: theme.colors.textSecondary
    },
    footer: {
        gap: 12
    },
    acceptButton: {
        borderRadius: 100,
        overflow: 'hidden'
    },
    closeButton: {
        paddingVertical: 16,
        alignItems: 'center'
    },
    buttonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }]
    },
    gradient: {
        paddingVertical: 16,
        alignItems: 'center'
    },
    acceptButtonText: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 18,
        color: theme.colors.text
    },
    closeButtonText: {
        fontFamily: 'Inter-Medium',
        fontSize: 18,
        color: theme.colors.primary
    }
})
