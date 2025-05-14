import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated'
import { theme } from '@/utils/theme'
import { ScreenTime } from 'react-native-screen-time-api'

export default function AccessScreenTimeLoadingScreen() {
    const router = useRouter()
    const insets = useSafeAreaInsets()
    const rotation = useSharedValue(0)

    const grantScreenTimeAccess = useCallback(async () => {
      try {
        await ScreenTime.requestAuthorization('individual');
        
        const status = await ScreenTime.getAuthorizationStatus();
        if (status !== 'approved') {
          throw new Error('user denied screen time access');
        }

        router.push('/(unauth)/access-health')
      } catch (error) {
        Alert.alert('To use this app, please grant access to your screen time data.', 'Please go to settings and grant access to your screen time data.', [
            {
                text: 'Grand Access',
                onPress: () => {
                    grantScreenTimeAccess()
                }
            }
        ])
    }
    }, []);
  
    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, {
                duration: 2000,
                easing: Easing.linear
            }),
            -1
        )
    }, [])

    useEffect(() => {
        grantScreenTimeAccess()
    }, [grantScreenTimeAccess])

    const spinnerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }]
        }
    })

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.content}>
                <Text style={styles.text}>Connecting to Screen Time</Text>
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
