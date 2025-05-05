import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '@/utils/theme'
import { Controller, useForm } from 'react-hook-form'

interface FormData {
    name: string
}

export default function AddNameScreen() {
    const router = useRouter()
    const insets = useSafeAreaInsets()

    const { control, handleSubmit } = useForm<FormData>()

    const onSubmit = handleSubmit((data) => {
        router.push('/onboarding/can-help')
    })

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>What should we call you?</Text>
                    <Text style={styles.subtitle}>Choose a unique gem name</Text>
                </View>

                <Controller
                    control={control}
                    name='name'
                    rules={{
                        required: true,
                        minLength: {
                            value: 3,
                            message: 'Name must be at least 3 characters long'
                        },
                        maxLength: {
                            value: 20,
                            message: 'Name must be less than 20 characters long'
                        }
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <View style={{ marginBottom: 24, gap: 4 }}>
                            <TextInput style={styles.input} placeholder='e.g., AquaRubellite8945' placeholderTextColor={theme.colors.textSecondary} value={field.value} onChangeText={field.onChange} autoFocus />
                            {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
                        </View>
                    )}
                />

                <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={onSubmit}>
                    <LinearGradient colors={[theme.colors.primary, theme.colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.gradient}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </LinearGradient>
                </Pressable>
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
        marginBottom: 32
    },
    input: {
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
        overflow: 'hidden'
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
    }
})
