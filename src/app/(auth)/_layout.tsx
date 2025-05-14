import useUserStore from '@/shared/state/useUserStore'
import { Redirect, Stack } from 'expo-router'
import React from 'react'

const AuthLayout = () => {
    const user = useUserStore((state) => state.user)

    if (!user) {
        return <Redirect href='/(unauth)/welcome' />
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'fade'
            }}
        />
    )
}

export default AuthLayout
