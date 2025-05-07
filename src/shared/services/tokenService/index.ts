import errorHandler from '@/shared/lib/utils/errorHandler'
import * as SecureStore from 'expo-secure-store'

const TOKEN_KEY = 'token'

class TokenService {
    async get() {
        return await SecureStore.getItemAsync(TOKEN_KEY).catch(errorHandler)
    }

    async set(token: string | null | undefined) {
        if (!token) {
            return
        }

        return await SecureStore.setItemAsync(TOKEN_KEY, token).catch(errorHandler)
    }

    async remove() {
        return await SecureStore.deleteItemAsync(TOKEN_KEY).catch(errorHandler)
    }
}

const tokenService = new TokenService()

export default tokenService
