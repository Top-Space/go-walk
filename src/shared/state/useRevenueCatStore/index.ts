import { create } from 'zustand'
import type { PurchasesPackage, PACKAGE_TYPE } from 'react-native-purchases'
import Purchases from 'react-native-purchases'

interface RevenueCatStore {
    packages: Array<PurchasesPackage>
    subscriptions: Array<string>
    purchasePackage: (packageType: PACKAGE_TYPE) => Promise<void>
    restorePurchases: () => Promise<void>
    cleanUp: () => void
}

export const useRevenueCatStore = create<RevenueCatStore>((set, get) => ({
    packages: [],
    subscriptions: [],
    purchasePackage: async (packageType) => {
        const { packages } = get()

        const pack = packages.find((p) => p.packageType === packageType)

        if (!pack) {
            throw new Error(`Package with type ${packageType} not found`)
        }

        try {
            const { customerInfo } = await Purchases.purchasePackage(pack)

            set({ subscriptions: customerInfo.activeSubscriptions })
        } catch (e: any) {
            if (!e.userCancelled) {
                // eslint-disable-next-line no-console
                console.error(e)
            }
            throw e
        }
    },
    restorePurchases: async () => {
        try {
            const customerInfo = await Purchases.restorePurchases()

            set({ subscriptions: customerInfo.activeSubscriptions })
        } catch (e: any) {
            if (!e.userCancelled) {
                // eslint-disable-next-line no-console
                console.error(e)
            }
            throw e
        }
    },
    cleanUp: () => set({ packages: [], subscriptions: [] })
}))

export const setPackages = (packages: Array<PurchasesPackage>) => useRevenueCatStore.setState({ packages })
export const setSubscriptions = (subscriptions: Array<string>) => useRevenueCatStore.setState({ subscriptions })
