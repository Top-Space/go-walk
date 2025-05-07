import type { UserType } from '@/shared/types'
import { create } from 'zustand'

interface UserStore {
    user: UserType | null
    setUser: (user: UserType) => void
}

const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user })
}))

export const setUser = useUserStore.getState().setUser

export default useUserStore
