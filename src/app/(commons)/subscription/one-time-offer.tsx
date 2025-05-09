import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '@/utils/theme'
import useUserStore from '@/shared/state/useUserStore'
import { useRevenueCatStore } from '@/shared/state/useRevenueCatStore'
import { PACKAGE_TYPE } from 'react-native-purchases'
import errorHandler from '@/shared/lib/utils/errorHandler'

export default function OneTimeOfferScreen() {
    const router = useRouter()
    const insets = useSafeAreaInsets()

    const user = useUserStore((state) => state.user)
    const purchasePackage = useRevenueCatStore((state) => state.purchasePackage)

    const [time, setTime] = useState(30 * 60)

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(time - 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [time])

    const handleAcceptOffer = async () => {
        try {
            await purchasePackage(PACKAGE_TYPE.CUSTOM)

            if (user) {
                router.push('/(auth)/dashboard')
            } else {
                router.push('/(commons)/subscription/select-apps')
            }
        } catch (err) {
            errorHandler(err)
        }
    }

    const handleCancel = () => {
        router.push('/(commons)/subscription/subscription-plan')
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60

        return `${minutes}:${seconds.toString().padStart(2, '0')}`
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

                <LinearGradient colors={['#2953E9', '#21348D']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={styles.discountBox}>
                    <Text style={styles.discountText}>60%</Text>
                    <Text style={styles.discountLabel}>DISCOUNT</Text>
                </LinearGradient>

                <View style={{ alignItems: 'center', gap: 12, marginBottom: 32 }}>
                    <Text
                        style={{
                            fontFamily: 'Inter-Bold',
                            fontSize: 18,
                            lineHeight: 23,
                            color: theme.colors.text
                        }}
                    >
                        This offer will expire in
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'Inter-SemiBold',
                            fontSize: 30,
                            lineHeight: 37,
                            color: theme.colors.text
                        }}
                    >
                        {formatTime(time)}
                    </Text>
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

                <Pressable style={({ pressed }) => [styles.closeButton, pressed && styles.buttonPressed]} onPress={handleCancel}>
                    <Text style={styles.closeButtonText}>Cancel</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 16
    },
    content: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: 28,
        color: theme.colors.text,
        textAlign: 'center'
    },
    subtitle: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: 20
    },
    discountBox: {
        backgroundColor: theme.colors.primary,
        borderRadius: 32,
        padding: 20,
        alignItems: 'center',
        marginBottom: 32,
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
        fontSize: 106,
        color: theme.colors.text,
        lineHeight: 120
    },
    discountLabel: {
        fontFamily: 'Inter-Regular',
        fontSize: 18,
        color: theme.colors.text
    },
    planContainer: {
        width: '100%'
    },
    lowestPrice: {
        fontFamily: 'Inter-Regular',
        fontSize: 20,
        color: theme.colors.text,
        textAlign: 'center',
        backgroundColor: theme.colors.primary,
        paddingVertical: 8,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24
    },
    planBox: {
        backgroundColor: theme.colors.backgroundSecondary,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        paddingVertical: 32,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.primary
    },
    planName: {
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        color: theme.colors.text
    },
    priceContainer: {
        alignItems: 'flex-end'
    },
    monthlyPrice: {
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        color: theme.colors.text,
        marginBottom: 8
    },
    yearlyPrice: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: theme.colors.textTertiary
    },
    footer: {
        gap: 12
    },
    acceptButton: {
        borderRadius: 100,
        overflow: 'hidden'
    },
    closeButton: {
        borderRadius: 100,
        backgroundColor: theme.colors.backgroundSecondary,
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
