import type { AuthThrowThirdPartyInputType } from '@/shared/api/auth/authThrowThirdParty.ts'
import { authThrowThirdPartyMutation } from '@/shared/api/auth/authThrowThirdParty.ts'
import { create } from 'zustand'
import authService from '@/shared/services/authService'

interface AuthStoreType {
    authThrowThirdParty: (variables: AuthThrowThirdPartyInputType) => Promise<void>
}

const useAuthStore = create<AuthStoreType>(() => ({
    authThrowThirdParty: async (variables) => {
        const { data } = await authThrowThirdPartyMutation(variables)

        if (!data) {
            throw new Error('Failed to authenticate')
        }

        const { user, token } = data.authThrowThirdParty

        await authService.init(user, token)
    }
}))

export default useAuthStore
