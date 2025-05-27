import { useEffect, useState } from 'react'
import * as Network from 'expo-network'
import useUserStore from '@/shared/state/useUserStore'
import initUser from '../../initUser'
import initRevenueCat from '../../initRevenueCat'

const useInitUserData = () => {
    const { isConnected, isInternetReachable } = Network.useNetworkState()
    const userData = useUserStore((state) => state.user)
    const [isLoading, setIsLoading] = useState(true)

    const initData = async () => {
        try {
            !userData && setIsLoading(true)

            if (isConnected && isInternetReachable) {
                await initUser()
            }

            await initRevenueCat()
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        initData()
    }, [isConnected, isInternetReachable])

    return { isLoading }
}

export default useInitUserData
