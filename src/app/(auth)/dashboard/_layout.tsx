import { theme } from '@/utils/theme'
import { Redirect, Tabs } from 'expo-router'
import { Home, Lock, User } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRevenueCatStore } from '@/shared/state/useRevenueCatStore'

const DashboardLayout = () => {
    const insets = useSafeAreaInsets()
    const subscriptions = useRevenueCatStore((state) => state.subscriptions)

    if (subscriptions.length === 0) {
        return <Redirect href='/(commons)/subscription/no-access' />
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.colors.background,
                    height: 60 + insets.bottom,
                    paddingBottom: insets.bottom,
                    paddingTop: 8,
                    borderTopColor: theme.colors.border,
                    borderTopWidth: 1
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textSecondary,
                tabBarLabelStyle: {
                    fontFamily: 'Inter-Medium',
                    fontSize: 12,
                    marginTop: 2
                }
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <Home size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name='block-list'
                options={{
                    title: 'Block List',
                    tabBarIcon: ({ color, size }) => <Lock size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <User size={size} color={color} />
                }}
            />
        </Tabs>
    )
}

export default DashboardLayout
