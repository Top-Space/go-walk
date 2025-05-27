import { Image } from 'expo-image'
import { Platform, View } from 'react-native'
import FullLogo from '@/assets/images/full-logo.png'
import AppleButton from '@/components/AppleButton'
import { useState } from 'react'
import * as AppleAuthentication from 'expo-apple-authentication'
import useAuthStore from '@/shared/state/useAuthStore'

export default function RegisterScreen() {
    const [isLoading, setIsLoading] = useState(false)
    const registerThrowThirdParty = useAuthStore((state) => state.registerThrowThirdParty)

    const onAppleAuth = async () => {
        try {
            setIsLoading(true)

            let token: string

            if (__DEV__) {
                token = '41232'
            } else {
                const credential = await AppleAuthentication.signInAsync({
                    requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL]
                })

                if (!credential.identityToken) {
                    throw new Error('Failed to get apple token')
                }

                token = credential.identityToken
            }

            await registerThrowThirdParty({ appleIdToken: token })
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <View style={{ flex: 1, gap: 60, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ height: 500, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={FullLogo} style={{ width: 256, height: 151 }} contentFit='contain' />
            </View>
            <AppleButton onPress={onAppleAuth} disabled={isLoading} />
        </View>
    )
}
