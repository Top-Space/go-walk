import { setPackages, setSubscriptions } from '@/shared/state/useRevenueCatStore'
import { Alert } from 'react-native'
import Purchases from 'react-native-purchases'
import Superwall from '@superwall/react-native-superwall'

const initRevenueCat = async () => {
    try {
        Superwall.configure({
            apiKey: process.env.EXPO_PUBLIC_SUPERWALL_API_KEY!,
        })
    } catch (error: any) {
        Alert.alert('Something went wrong', error.message)
    }
}

export default initRevenueCat
