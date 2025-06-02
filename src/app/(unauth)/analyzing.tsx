import { useEffect, useState, useRef } from 'react'
import { StyleSheet, View, Text, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { theme } from '@/utils/theme'
import useOnboardingStore from '@/shared/state/useOnboardingStore'

export default function AnalyzingScreen() {
    const router = useRouter()
    const [text, setText] = useState('Calculating')
    const scaleAnim = useRef(new Animated.Value(0)).current
    const loadingAnim = useRef(new Animated.Value(0)).current

    const calculateUserStat = useOnboardingStore((state) => state.calculateUserStat)

    useEffect(() => {
        calculateUserStat()

        const textTimer = setTimeout(() => {
            setText('Preparing report…')
        }, 2000)

        return () => clearTimeout(textTimer)
    }, [])

    useEffect(() => {
        const animateScale = () => {
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start()
        }

        animateScale()

        const animateLoading = () => {
            Animated.sequence([
                Animated.timing(loadingAnim, {
                    toValue: 1,
                    duration: 3000,
                    useNativeDriver: false
                })
            ]).start(() => {
                setTimeout(() => {
                    router.push('/(unauth)/report1')
                }, 500)
            })
        }

        animateLoading()
    }, [])

    const width = loadingAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    })

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.content,
                    {
                        transform: [
                            {
                                scale: scaleAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.9, 1]
                                })
                            }
                        ],
                        opacity: scaleAnim
                    }
                ]}
            >
                <Text style={styles.title}>{text}</Text>

                <View style={styles.progressBarContainer}>
                    <Animated.View style={[styles.progressBar, { width }]}>
                        <LinearGradient colors={[theme.colors.primary, theme.colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradient} />
                    </Animated.View>
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        padding: 24
    },
    content: {
        width: '100%',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: 28,
        color: theme.colors.text,
        marginBottom: 48,
        textAlign: 'center'
    },
    progressBarContainer: {
        width: '100%',
        height: 12,
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: 6,
        overflow: 'hidden'
    },
    progressBar: {
        height: '100%'
    },
    gradient: {
        width: '100%',
        height: '100%'
    }
})
