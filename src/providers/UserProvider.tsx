import ScreenLoader from '@/components/ScreenLoader'
import { getUserByTokenQuery } from '@/shared/api/user/getUserByToken'
import tokenService from '@/shared/services/tokenService'
import { setUser } from '@/shared/state/useUserStore'
import type { FC, PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)

    const initUser = async () => {
        try {
            setIsLoading(true)

            const { data } = await getUserByTokenQuery()

            if (!data) {
                throw new Error('No user data found')
            }

            const { user, token } = data.getUserByToken

            await tokenService.set(token)
            setUser(user)
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        initUser()
    }, [])

    if (isLoading) {
        return <ScreenLoader />
    }

    return children
}

export default UserProvider
