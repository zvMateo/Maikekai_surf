'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import type { User, Session } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  profile: any
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const supabase = createClient()

  const refreshProfile = async () => {
    if (user && supabase) {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        
        setProfile(profile)
      } catch (error) {
        console.warn('Error refreshing profile:', error)
      }
    }
  }

  useEffect(() => {
    if (!supabase) {
      console.warn('⚠️  Supabase no configurado, usando modo desarrollo');
      setLoading(false);
      return;
    }

    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      } catch (error) {
        console.warn('Error getting session:', error)
        setLoading(false)
      }
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event: any, session: any) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
      
      if (session?.user) {
        await refreshProfile()
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (user) {
      refreshProfile()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      return { error: { message: 'Supabase no configurado' } }
    }
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { error }
    } catch (error) {
      return { error }
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!supabase) {
      return { error: { message: 'Supabase no configurado' } }
    }
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })
      
      if (error) {
        return { error }
      }
      
      // Crear perfil manualmente (el trigger fue deshabilitado)
      if (data.user && data.user.id) {
        try {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              email: email,
              full_name: fullName
            })
          
          if (profileError) {
            // Si el perfil ya existe, no es un error crítico
            if (!profileError.message.includes('duplicate key')) {
              console.warn('Error creando perfil:', profileError.message);
            }
          }
        } catch (profileError) {
          console.warn('Error en creación manual de perfil:', profileError);
        }
      }
      
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const signOut = async () => {
    if (supabase) {
      try {
        await supabase.auth.signOut()
      } catch (error) {
        console.warn('Error signing out:', error)
      }
    }
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    profile,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
