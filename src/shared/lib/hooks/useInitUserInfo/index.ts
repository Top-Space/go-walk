import { getUserByTokenQuery } from '@/shared/api/user/getUserByToken'
import authService from '@/shared/services/authService'
import { useEffect, useState } from 'react'
import * as Network from 'expo-network'
import useUserStore from '@/shared/state/useUserStore'

const useInitUserInfo = () => {
    const { isConnected, isInternetReachable } = Network.useNetworkState()
    const userData = useUserStore((state) => state.user)
    const [isLoading, setIsLoading] = useState(true)

    const initUser = async () => {
        try {
            !userData && setIsLoading(true)

            const { data } = await getUserByTokenQuery()

            if (!data) {
                throw new Error('No user data found')
            }

            const { user, token } = data.getUserByToken

            await authService.init(user, token)
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (!isConnected || !isInternetReachable) {
            setIsLoading(false)

            return
        }

        initUser()
    }, [isInternetReachable, isConnected])

    return { isLoading, initUser }
}

export default useInitUserInfo
