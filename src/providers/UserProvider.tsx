import ScreenLoader from '@/components/ScreenLoader'
import type { FC, PropsWithChildren } from 'react'
import useInitUserData from '@/shared/lib/hooks/useInitUserData'

const UserDataProvider: FC<PropsWithChildren> = ({ children }) => {
    const { isLoading } = useInitUserData()

    if (isLoading) {
        return <ScreenLoader />
    }

    return children
}

export default UserDataProvider
