import { setPackages, setSubscriptions } from '@/shared/state/useRevenueCatStore'
import { Alert } from 'react-native'
import Purchases from 'react-native-purchases'

const initRevenueCat = async () => {
    try {
        Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_REVENUE_APPLE_API_KEY! })

        Purchases.addCustomerInfoUpdateListener(async (info) => {
            setSubscriptions(info.activeSubscriptions)
        })

        setTimeout(async () => {
            const offerings = await Purchases.getOfferings()

            offerings.current && setPackages(offerings.current.availablePackages)
        }, 0)
    } catch (error: any) {
        Alert.alert('Something went wrong', error.message)
    }
}

export default initRevenueCat
