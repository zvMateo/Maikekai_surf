'use client'

import { createContext } from 'react'
import { useTranslations } from 'next-intl'
import { useUser, useClerk } from '@clerk/nextjs'
import type { UserResource } from '@clerk/types'

interface AuthContextType {
  user: UserResource | null
  loading: boolean
  signOut: () => Promise<void>
  profile: {
    full_name?: string
    role?: string
  }
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()
  const t = useTranslations('auth')

  const profile = {
    full_name: user?.fullName || undefined,
    role: (user?.publicMetadata?.role as string) || t('user'),
  }

  const value: AuthContextType = {
    user: user ?? null,
    loading: !isLoaded,
    signOut,
    profile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
