import useUserStore from '@/shared/state/useUserStore'
import { useRouter } from 'expo-router'
import type { FC, PropsWithChildren } from 'react'
import { useEffect } from 'react'

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter()
    const user = useUserStore((state) => state.user)

    useEffect(() => {
        if (!user) {
            router.replace('/(onboarding)/welcome')
        }
    }, [user])

    if (!user) {
        return null
    }

    return children
}

export default AuthProvider
