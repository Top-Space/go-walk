import { StyleSheet, Text, Pressable } from 'react-native'
import Svg, { Path } from 'react-native-svg'

interface ButtonProps {
    onPress: () => void
    disabled: boolean
}

export default function AppleButton({ onPress, disabled }: ButtonProps) {
    const handlePress = () => {
        !disabled && onPress()
    }

    return (
        <Pressable style={({ pressed }) => [styles.button, disabled && styles.buttonDisabled, pressed && styles.buttonPressed]} onPress={handlePress}>
            <Svg width={25} height={24} viewBox='0 0 25 24' fill='none'>
                <Path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M15.432 4.569c.815-.945 1.364-2.26 1.214-3.569-1.174.045-2.595.75-3.437 1.693-.756.837-1.416 2.175-1.239 3.458 1.31.097 2.647-.637 3.462-1.582zm2.937 8.306c.033 3.383 3.097 4.508 3.131 4.523-.025.08-.49 1.604-1.614 3.18-.973 1.36-1.982 2.716-3.572 2.745-1.562.028-2.065-.887-3.852-.887-1.785 0-2.344.858-3.822.915-1.535.055-2.705-1.473-3.684-2.83C2.95 17.748 1.419 12.68 3.476 9.26c1.022-1.698 2.847-2.775 4.83-2.802 1.506-.028 2.929.972 3.85.972.92 0 2.65-1.202 4.467-1.025.761.03 2.897.294 4.268 2.217-.11.066-2.549 1.425-2.521 4.253z'
                    fill='#000'
                />
            </Svg>
            <Text style={[styles.text]}>Sign up with Apple</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 12,
        overflow: 'hidden',
        height: 56,
        maxWidth: 358,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 12,
        backgroundColor: '#FFFFFF'
    },
    buttonDisabled: {
        opacity: 0.5
    },
    buttonPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }]
    },
    text: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 16,
        color: '#101012'
    }
})
