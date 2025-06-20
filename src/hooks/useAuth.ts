import { useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: AuthError | null
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    // Get current session
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          throw error
        }
        
        if (session) {
          const { data: { user } } = await supabase.auth.getUser()
          setAuthState({
            user,
            session,
            loading: false,
            error: null
          })
        } else {
          setAuthState({
            user: null,
            session: null,
            loading: false,
            error: null
          })
        }
      } catch (error) {
        console.error('Error getting session:', error)
        setAuthState(prev => ({ ...prev, loading: false, error: error as AuthError }))
      }
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const { data: { user } } = await supabase.auth.getUser()
          setAuthState({
            user,
            session,
            loading: false,
            error: null
          })
        } else {
          setAuthState({
            user: null,
            session: null,
            loading: false,
            error: null
          })
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      
      setAuthState({
        user: data.user,
        session: data.session,
        loading: false,
        error: null
      })
      
      return { data, error: null }
    } catch (error) {
      console.error('Error signing in:', error)
      setAuthState(prev => ({ ...prev, loading: false, error: error as AuthError }))
      return { data: null, error: error as AuthError }
    }
  }

  const signOut = async () => {
    setAuthState(prev => ({ ...prev, loading: true }))
    
    try {
      // Clear any agent login states
      localStorage.removeItem('field_agent_logged_in')
      localStorage.removeItem('agent_logged_in')
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        throw error
      }
      
      setAuthState({
        user: null,
        session: null,
        loading: false,
        error: null
      })
      
      return { error: null }
    } catch (error) {
      console.error('Error signing out:', error)
      setAuthState(prev => ({ ...prev, loading: false, error: error as AuthError }))
      return { error: error as AuthError }
    }
  }

  return {
    ...authState,
    signIn,
    signOut
  }
}