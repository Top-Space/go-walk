import 'react-native-reanimated'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useFrameworkReady } from '@/hooks/useFrameworkReady'
import { View } from 'react-native'
import ApolloProvider from '@/providers/ApolloProvider'
import UserDataProvider from '@/providers/UserProvider'

export default function RootLayout() {
    useFrameworkReady()

    return (
        <ApolloProvider>
            <UserDataProvider>
                <View style={{ flex: 1 }}>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            animation: 'fade'
                        }}
                    />
                    <StatusBar style='light' />
                </View>
            </UserDataProvider>
        </ApolloProvider>
    )
}
