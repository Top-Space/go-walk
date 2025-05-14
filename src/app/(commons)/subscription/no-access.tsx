import { theme } from '@/utils/theme'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import FullLogo from '@/assets/images/full-logo-horizontal.png'
import { Image } from 'expo-image'
import Button from '@/components/Button'
import { router } from 'expo-router'
import { useRevenueCatStore } from '@/shared/state/useRevenueCatStore'
import errorHandler from '@/shared/lib/utils/errorHandler'

const CONTENT_LIST_ITEMS = [
    {
        icon: '🏃‍♂️',
        text: 'Track your steps'
    },
    {
        icon: '🚫',
        text: 'Unlock blocked apps'
    },
    {
        icon: '📊',
        text: 'See your personalized progress'
    }
]

const NoAccessScreen = () => {
    const insets = useSafeAreaInsets()

    const restorePurchases = useRevenueCatStore((state) => state.restorePurchases)

    const handleRenewNow = async () => {
        try {
            await restorePurchases()

            router.push('/(auth)/dashboard')
        } catch (err) {
            errorHandler(err)
        }
    }

    const handleSkip = () => {
        router.push('/(commons)/subscription/subscription-plan')
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
            <View>
                <View style={styles.header}>
                    <Image source={FullLogo} style={styles.headerLogo} contentFit='contain' />
                    <Text style={styles.headerTitle}>🚫 Your access to GoWalk is currently paused!</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.contentTitle}>Without your active subscription, you won't be able to:</Text>
                    <View style={styles.contentList}>
                        {CONTENT_LIST_ITEMS.map((item, index) => (
                            <View key={index} style={styles.contentListItem}>
                                <View style={styles.contentListItemIcon}>
                                    <Text>{item.icon}</Text>
                                </View>
                                <Text style={styles.contentListItemText}>{item.text}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={styles.banner}>
                    <Text style={styles.bannerText}>💪 We know how much you’ve achieved so far—don’t let all your hard work go to waste! Renew your subscription to keep moving forward!</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Button variant='primary' title='Renew Now' onPress={handleRenewNow} />
                <Button variant='secondary' title='Skip' onPress={handleSkip} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 24,
        justifyContent: 'space-between'
    },
    header: {
        marginBottom: 32,
        alignItems: 'center',
        gap: 32
    },
    headerLogo: {
        width: 223,
        height: 48
    },
    headerTitle: {
        fontFamily: 'Inter-Bold',
        fontSize: 24,
        color: theme.colors.text,
        textAlign: 'center'
    },
    content: {
        gap: 20,
        marginBottom: 32
    },
    contentTitle: {
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        color: theme.colors.text,
        textAlign: 'center'
    },
    contentList: {
        gap: 12
    },
    contentListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    contentListItemIcon: {
        backgroundColor: theme.colors.backgroundSecondary,
        borderWidth: 1,
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#1C1D24'
    },
    contentListItemText: {
        fontFamily: 'Inter-Medium',
        fontSize: 16,
        color: theme.colors.text
    },
    banner: {
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: 24,
        padding: 16,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.primary
    },
    bannerText: {
        fontFamily: 'Inter-Medium',
        fontSize: 16,
        color: theme.colors.text,
        fontStyle: 'italic'
    },
    footer: {
        gap: 8
    }
})

export default NoAccessScreen
