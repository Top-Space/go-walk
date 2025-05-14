import React from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '@/utils/theme'
import useUserStore from '@/shared/state/useUserStore'
import { useRevenueCatStore } from '@/shared/state/useRevenueCatStore'
import { PACKAGE_TYPE } from 'react-native-purchases'
import errorHandler from '@/shared/lib/utils/errorHandler'

interface PlanOption {
    id: string
    name: string
    price?: number
    period?: string
    savings?: number
    perMonth: number
    packageType: PACKAGE_TYPE
}

const PLAN_OPTIONS: PlanOption[] = [
    {
        id: 'yearly',
        name: 'Yearly',
        price: 49.99,
        period: 'per year',
        savings: 72,
        perMonth: 4.16,
        packageType: PACKAGE_TYPE.LIFETIME
    },
    {
        id: 'monthly',
        name: 'Monthly',
        price: 14.99,
        perMonth: 14.99,
        packageType: PACKAGE_TYPE.MONTHLY
    },
    {
        id: 'weekly',
        name: 'Week',
        price: 9.99,
        period: 'per week',
        perMonth: 39.96,
        packageType: PACKAGE_TYPE.WEEKLY
    }
]

export default function SubscriptionPlanScreen() {
    const router = useRouter()
    const insets = useSafeAreaInsets()

    const user = useUserStore((state) => state.user)
    const purchasePackage = useRevenueCatStore((state) => state.purchasePackage)

    const [selectedPlan, setSelectedPlan] = React.useState<PlanOption>(PLAN_OPTIONS[0])

    const handleContinue = async () => {
        try {
            await purchasePackage(selectedPlan.packageType)
            
            if (user) {
                router.push('/(auth)/dashboard')
            } else {
                router.push('/(commons)/subscription/one-time-offer')
            }
        } catch (err) {
            errorHandler(err)
        }
    }

    const handleSkip = () => {
        router.push('/(commons)/subscription/one-time-offer')
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
            <View style={styles.header}>
                <Text style={styles.title}>Choose a tariff plan</Text>
                <Text style={styles.subtitle}>Choose the plan that suits you and get full access to GoWalk for free for 3 days</Text>
            </View>

            <View style={styles.plans}>
                {PLAN_OPTIONS.map((plan) => (
                    <Pressable key={plan.id} style={[styles.planOption, selectedPlan.id === plan.id && styles.planSelected]} onPress={() => setSelectedPlan(plan)}>
                        <View style={styles.planHeader}>
                            <View style={styles.planNameContainer}>
                                <View style={[styles.radioButton, selectedPlan.id === plan.id && styles.radioButtonSelected]}>{selectedPlan.id === plan.id && <View style={styles.radioButtonInner} />}</View>
                                <View>
                                    <Text style={styles.planPrice}>${plan.perMonth} /per month</Text>
                                    {plan.period && (
                                        <Text style={styles.planPeriod}>
                                            ${plan.price} {plan.period}
                                        </Text>
                                    )}
                                </View>
                            </View>
                            <Text style={styles.planName}>{plan.name}</Text>
                        </View>
                        {plan.savings && (
                            <View style={styles.savingsBadge}>
                                <Text style={styles.savingsText}>save {plan.savings}%</Text>
                            </View>
                        )}
                    </Pressable>
                ))}
            </View>

            <View style={styles.footer}>
                <Pressable style={({ pressed }) => [styles.continueButton, pressed && styles.buttonPressed]} onPress={handleContinue}>
                    <LinearGradient colors={[theme.colors.primary, theme.colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradient}>
                        <Text style={styles.continueButtonText}>{user ? 'Activate Subscription' : 'Start Your Free Trial'}</Text>
                    </LinearGradient>
                </Pressable>

                <Pressable style={({ pressed }) => [styles.skipButton, pressed && styles.buttonPressed]} onPress={handleSkip}>
                    <Text style={styles.skipButtonText}>Skip</Text>
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
    header: {
        marginBottom: 40
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: 28,
        color: theme.colors.text,
        marginBottom: 12,
        textAlign: 'center'
    },
    subtitle: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 24
    },
    plans: {
        gap: 16,
        justifyContent: 'center',
        flex: 1
    },
    planOption: {
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: 16,
        paddingVertical: 32,
        paddingHorizontal: 16,
        position: 'relative'
    },
    planSelected: {
        borderColor: theme.colors.primary,
        borderWidth: 2
    },
    planHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    planNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: theme.colors.textSecondary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    radioButtonSelected: {
        borderColor: theme.colors.primary
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: theme.colors.primary
    },
    planName: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: theme.colors.textTertiary
    },
    planPrice: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 18,
        color: theme.colors.text
    },
    planPeriod: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: theme.colors.textTertiary
    },
    savingsBadge: {
        position: 'absolute',
        top: -14,
        right: 10,
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8
    },
    savingsText: {
        fontFamily: 'Inter-Medium',
        fontSize: 14,
        color: theme.colors.text
    },
    footer: {
        marginTop: 'auto',
        gap: 12
    },
    continueButton: {
        borderRadius: 100,
        overflow: 'hidden'
    },
    skipButton: {
        paddingVertical: 16,
        alignItems: 'center',
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: 100
    },
    buttonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }]
    },
    gradient: {
        paddingVertical: 16,
        alignItems: 'center'
    },
    continueButtonText: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 18,
        color: theme.colors.text
    },
    skipButtonText: {
        fontFamily: 'Inter-Medium',
        fontSize: 18,
        color: theme.colors.primary
    }
})
