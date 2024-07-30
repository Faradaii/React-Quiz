import { User, UserState } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: ({ name = `user-${Date.now()}`, email }: Partial<User>) => set({ user: { name, email } }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);


export default useUserStore