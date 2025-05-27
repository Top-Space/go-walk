import { getUserByTokenQuery } from '@/shared/api/user/getUserByToken'
import authService from '@/shared/services/authService'

const initUser = async () => {
    const { data } = await getUserByTokenQuery()

    if (!data) {
        throw new Error('No user data found')
    }

    const { user, token } = data.getUserByToken

    await authService.init(user, token)
}

export default initUser
