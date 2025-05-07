import { setUser } from '@/shared/state/useUserStore'
import tokenService from '../tokenService'
import type { UserType } from '@/shared/types'

class AuthService {
    async logout() {
        await tokenService.remove()
        setUser(null)
    }

    async init(user: UserType, token: string) {
        await tokenService.set(token)
        setUser(user)
    }
}

const authService = new AuthService()

export default authService
