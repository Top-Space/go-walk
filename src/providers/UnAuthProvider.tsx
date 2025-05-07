import useUserStore from '@/shared/state/useUserStore'
import { useRouter } from 'expo-router'
import type { FC, PropsWithChildren } from 'react'
import { useEffect } from 'react'

const UnAuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter()
    const user = useUserStore((state) => state.user)

    useEffect(() => {
        if (user) {
            router.replace('/(auth)')
        }
    }, [user])

    if (user) {
        return null
    }

    return children
}

export default UnAuthProvider
