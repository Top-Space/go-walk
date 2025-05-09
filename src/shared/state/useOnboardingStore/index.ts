import { changeUserInfo } from '@/shared/api/user/changeUserInfo'
import { getUserInfoBaseStatistic } from '@/shared/lib/utils/onboardingStat'
import type { UserInfoBaseStatistic, UserOnboardingInfo, UserType } from '@/shared/types'
import { create } from 'zustand'

interface OnboardingStoreType {
    userInfo: UserOnboardingInfo
    userStat: UserInfoBaseStatistic
    tempUser: UserType | null
    pushOnboardingInfo: () => Promise<void>
    setUserInfo: (userInfo: Partial<UserOnboardingInfo>) => void
    calculateUserStat: () => void
    setTempUser: (user: UserType | null) => void
}

const useOnboardingStore = create<OnboardingStoreType>((set, get) => ({
    userInfo: {} as UserOnboardingInfo,
    userStat: {} as UserInfoBaseStatistic,
    tempUser: null,
    pushOnboardingInfo: async () => {
        const { userInfo } = get()

        await changeUserInfo({
            input: userInfo
        })
    },
    setUserInfo: (userInfo: Partial<UserOnboardingInfo>) =>
        set((state) => ({
            userInfo: {
                ...state.userInfo,
                ...userInfo
            }
        })),
    calculateUserStat: () =>
        set((state) => ({
            userStat: getUserInfoBaseStatistic(state.userInfo)
        })),
    setTempUser: (user: UserType | null) => set({ tempUser: user })
}))

export const setTempUser = useOnboardingStore.getState().setTempUser

export default useOnboardingStore
