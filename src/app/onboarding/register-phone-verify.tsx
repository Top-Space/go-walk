import { useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native'
import { useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ArrowLeft } from 'lucide-react-native'
import { theme } from '@/utils/theme'
import { Controller, useForm } from 'react-hook-form'

interface FormData {
    code: Array<string>
}

export default function RegisterPhoneVerifyScreen() {
    const router = useRouter()
    const insets = useSafeAreaInsets()
    const [timer, setTimer] = useState(53)
    const inputs = useRef<Array<TextInput | null>>([])

    const { control, handleSubmit, setValue, watch } = useForm<FormData>({
        defaultValues: {
            code: ['', '', '', '', '', '']
        }
    })

    const code = watch('code')

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)

            return () => clearInterval(interval)
        }
    }, [timer])

    const handleCodeChange = (text: string, index: number) => {
        const newCode = [...code]

        newCode[index] = text
        setValue('code', newCode)

        if (text && index < 5) {
            inputs.current[index + 1]?.focus()
        }

        if (newCode.every((digit) => digit)) {
            handleSubmit((data) => {
                router.push('/onboarding/add-name')
            })()
        }
    }

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            inputs.current[index - 1]?.focus()
        }
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Pressable style={styles.backButton} onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <ArrowLeft size={24} color={theme.colors.text} />
                </Pressable>
                <Text style={styles.appName}>GoWalk</Text>
                <View style={styles.placeholder} />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Enter the 6-digit Verification Code sent to</Text>

                <Controller
                    control={control}
                    name='code'
                    rules={{
                        required: true,
                        validate: (value) => {
                            if (value.length !== 6) {
                                return 'Code must be 6 digits long'
                            }

                            if (value.some((digit) => isNaN(Number(digit)))) {
                                return 'Code must contain only numbers'
                            }

                            return true
                        }
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <View style={{ marginBottom: 24, gap: 4 }}>
                            <View style={styles.codeContainer}>
                                {field.value.map((digit, index) => (
                                    <TextInput
                                        key={index}
                                        ref={(el) => (inputs.current[index] = el)}
                                        style={styles.codeInput}
                                        value={digit}
                                        onChangeText={(text) => handleCodeChange(text, index)}
                                        onKeyPress={(e) => handleKeyPress(e, index)}
                                        keyboardType='number-pad'
                                        maxLength={1}
                                        selectTextOnFocus
                                    />
                                ))}
                            </View>
                            {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
                        </View>
                    )}
                />

                <Text style={styles.timer}>{timer > 0 ? `Resend in ${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}` : 'Resend code'}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16
    },
    backButton: {
        width: 40
    },
    appName: {
        fontFamily: 'Inter-Bold',
        fontSize: 20,
        color: theme.colors.text
    },
    placeholder: {
        width: 40
    },
    content: {
        flex: 1,
        padding: 24
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: 24,
        color: theme.colors.text,
        marginBottom: 32
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    codeInput: {
        width: 50,
        height: 56,
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: 12,
        textAlign: 'center',
        fontSize: 24,
        fontFamily: 'Inter-Bold',
        color: theme.colors.text
    },
    timer: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        color: theme.colors.textSecondary,
        textAlign: 'center'
    }
})
