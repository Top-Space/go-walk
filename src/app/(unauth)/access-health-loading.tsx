import { useCallback, useEffect } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated'
import { theme } from '@/utils/theme'
import HealthKit, { HKQuantityTypeIdentifier, useHealthkitAuthorization } from '@kingstinct/react-native-healthkit';

export default function AccessHealthLoadingScreen() {
    const router = useRouter()
    const insets = useSafeAreaInsets()
    const rotation = useSharedValue(0)

    const [status, requestAuthorization] = useHealthkitAuthorization([HKQuantityTypeIdentifier.stepCount])

    const requestHealthkitAccess = useCallback(async () => {
        try {
            const permissionGranted = await HealthKit.requestAuthorization([HKQuantityTypeIdentifier.stepCount])
            if (permissionGranted) {
                router.push('/(unauth)/register')
            }
        } catch (error) {
            Alert.alert('To use this app, please grant access to your health data.', 'Please go to settings and grant access to your health data.', [
                {
                    text: 'Grand Access',
                    onPress: () => {
                        requestHealthkitAccess()
                    }
                }
            ])
        }
    }, [])

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, {
                duration: 2000,
                easing: Easing.linear
            }),
            -1
        )

        requestHealthkitAccess()
    }, [requestHealthkitAccess])

    const spinnerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }]
        }
    })

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.content}>
                <Text style={styles.text}>Connecting to Steps Statistic</Text>
                <Animated.View style={[styles.spinner, spinnerStyle]} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24
    },
    text: {
        fontFamily: 'Inter-Bold',
        fontSize: 24,
        color: theme.colors.text,
        marginBottom: 32
    },
    spinner: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: theme.colors.primary,
        borderTopColor: 'transparent'
    }
})
