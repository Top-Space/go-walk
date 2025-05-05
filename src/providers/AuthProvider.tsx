import useUserStore from '@/shared/state/useUserStore'
import { useRouter } from 'expo-router'
import { FC, PropsWithChildren, useEffect } from 'react'

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter()
    const isAuthenticated = useUserStore((state) => state.isAuthenticated)

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/onboarding/welcome')
        }
    }, [isAuthenticated])

    if (!isAuthenticated) {
        return null
    }

    return children
}

export default AuthProvider
