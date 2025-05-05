import { create } from 'zustand'

interface UserStore {
    isAuthenticated: boolean
    setIsAuthenticated: (isAuthenticated: boolean) => void
}

const useUserStore = create<UserStore>((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated })
}))

export default useUserStore
