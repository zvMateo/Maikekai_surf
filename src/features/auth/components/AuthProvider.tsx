'use client'

import { createContext, useEffect, useState } from 'react'
import { createClient } from '@/services/supabase/client'
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

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(false) // ✅ Iniciar en false
  const [profile, setProfile] = useState(null)
  const [mounted, setMounted] = useState(false) // ✅ Control de hidratación
  const supabase = typeof window !== 'undefined' ? createClient() : null

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
        console.log('Error actualizando perfil:', error)
      }
    }
  }

  useEffect(() => {
    setMounted(true) // ✅ Marcar como montado
    
    if (!supabase) {
      console.log('🏄‍♂️ Supabase no configurado, usando modo desarrollo')
      return
    }

    const getSession = async () => {
      setLoading(true)
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await refreshProfile()
        }
      } catch (error) {
        console.log('🏄‍♂️ Error obteniendo sesión:', error)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event: any, session: any) => {
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await refreshProfile()
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  useEffect(() => {
    if (user && mounted) {
      refreshProfile()
    }
  }, [user, mounted])

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

      // Si el registro es exitoso, crear perfil manualmente
      if (data.user && !error) {
        try {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: data.user.id,
                email: data.user.email,
                full_name: fullName,
                created_at: new Date().toISOString(),
              },
            ])

          if (profileError) {
            console.log('Perfil ya existe o error creando perfil:', profileError)
          }
        } catch (profileError) {
          console.log('Error creando perfil:', profileError)
        }
      }

      return { error }
    } catch (error) {
      return { error }
    }
  }

  const signOut = async () => {
    if (supabase) {
      try {
        await supabase.auth.signOut()
        setProfile(null)
      } catch (error) {
        console.log('Error cerrando sesión:', error)
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
