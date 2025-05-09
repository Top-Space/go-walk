import type { RegisterThrowThirdPartyInputType as RegisterThrowThirdPartyVariablesType } from '@/shared/api/auth/registerThrowThirdParty'
import { registerThrowThirdPartyMutation } from '@/shared/api/auth/registerThrowThirdParty'
import { create } from 'zustand'
import tokenService from '@/shared/services/tokenService'
import { setTempUser } from '../useOnboardingStore'
import { router } from 'expo-router'
import type { LoginThrowThirdPartyVariablesType } from '@/shared/api/auth/loginThrowThirdParty'
import { loginThrowThirdPartyMutation } from '@/shared/api/auth/loginThrowThirdParty'
import authService from '@/shared/services/authService'

interface AuthStoreType {
    registerThrowThirdParty: (variables: RegisterThrowThirdPartyVariablesType) => Promise<void>
    loginThrowThirdParty: (variables: LoginThrowThirdPartyVariablesType) => Promise<void>
}

const useAuthStore = create<AuthStoreType>(() => ({
    registerThrowThirdParty: async (variables) => {
        const { data } = await registerThrowThirdPartyMutation(variables)

        if (!data) {
            throw new Error('Failed to authenticate')
        }

        const { user, token } = data.registerThrowThirdParty

        await tokenService.set(token)
        setTempUser(user)

        router.push('/(commons)/subscription/can-help')
    },
    loginThrowThirdParty: async (variables) => {
        const { data } = await loginThrowThirdPartyMutation(variables)

        if (!data) {
            throw new Error('Failed to authenticate')
        }

        const { user, token } = data.loginThrowThirdParty

        await authService.init(user, token)
    }
}))

export default useAuthStore
