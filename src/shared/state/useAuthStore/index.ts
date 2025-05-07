import type { AuthThrowThirdPartyInputType } from '@/shared/api/auth/authThrowThirdParty.ts'
import { authThrowThirdPartyMutation } from '@/shared/api/auth/authThrowThirdParty.ts'
import { create } from 'zustand'
import { setUser } from '../useUserStore'
import tokenService from '@/shared/services/tokenService'

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

        await tokenService.set(token)
        setUser(user)
    }
}))

export default useAuthStore
