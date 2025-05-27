import useUserStore, { setUser } from '@/shared/state/useUserStore'
import tokenService from '../tokenService'
import type { UserType } from '@/shared/types'
import useOnboardingStore from '@/shared/state/useOnboardingStore'
import { useRevenueCatStore } from '@/shared/state/useRevenueCatStore'

class AuthService {
    async logout() {
        await tokenService.remove()
        useOnboardingStore.getState().cleanUp()
        useRevenueCatStore.getState().cleanUp()
        useUserStore.getState().cleanUp()
    }

    async init(user: UserType, token: string) {
        await tokenService.set(token)
        setUser(user)
    }
}

const authService = new AuthService()

export default authService
