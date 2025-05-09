import 'react-native-reanimated'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useFrameworkReady } from '@/hooks/useFrameworkReady'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { View } from 'react-native'
import ApolloProvider from '@/providers/ApolloProvider'
import UserProvider from '@/providers/UserProvider'

export default function RootLayout() {
    useFrameworkReady()

    return (
        <ThemeProvider>
            <ApolloProvider>
                <UserProvider>
                    <View style={{ flex: 1 }}>
                        <Stack
                            screenOptions={{
                                headerShown: false,
                                animation: 'fade'
                            }}
                        />
                        <StatusBar style='light' />
                    </View>
                </UserProvider>
            </ApolloProvider>
        </ThemeProvider>
    )
}
