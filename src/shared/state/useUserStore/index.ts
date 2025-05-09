import type { UserType } from '@/shared/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface UserStore {
    user: UserType | null
    setUser: (user: UserType | null) => void
    clearUser: () => void
}

const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null })
        }),
        {
            name: 'user-store',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
)

export const setUser = useUserStore.getState().setUser
export const clearUser = useUserStore.getState().clearUser

export default useUserStore
