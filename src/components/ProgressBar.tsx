import type { StyleProp, ViewStyle } from 'react-native'
import { StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '@/utils/theme'

interface ProgressBarProps {
    progress: number // 0 to 1
    style?: StyleProp<ViewStyle>
}

export default function ProgressBar({ progress, style }: ProgressBarProps) {
    // Ensure progress is between 0 and 1
    const safeProgress = Math.min(Math.max(progress, 0), 1)

    return (
        <View style={[styles.container, style]}>
            <View style={[styles.progressBar, { width: `${safeProgress * 100}%` }]}>
                <LinearGradient colors={[theme.colors.primary, theme.colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradient} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 8,
        backgroundColor: '#F0F0F5',
        borderRadius: 4,
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
