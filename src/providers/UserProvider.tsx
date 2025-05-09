import ScreenLoader from '@/components/ScreenLoader'
import type { FC, PropsWithChildren } from 'react'
import { useEffect } from 'react'
import useInitUserInfo from '@/shared/lib/hooks/useInitUserInfo'

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
    const { isLoading, initUser } = useInitUserInfo()

    useEffect(() => {
        initUser()
    }, [])

    if (isLoading) {
        return <ScreenLoader />
    }

    return children
}

export default UserProvider
