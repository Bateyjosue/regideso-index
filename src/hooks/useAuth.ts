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
      // For demo purposes, we'll use Supabase auth but accept any credentials
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        // For demo, we'll allow any login
        console.log('Using mock login instead of Supabase auth')
        
        // Create a mock user
        const mockUser: User = {
          id: 'mock-user-id',
          email: email,
          user_metadata: {
            full_name: 'Admin User',
            role: 'Admin'
          },
          app_metadata: {},
          aud: 'authenticated',
          created_at: new Date().toISOString(),
          role: 'authenticated',
          updated_at: new Date().toISOString(),
          email_confirmed_at: new Date().toISOString(),
          last_sign_in_at: new Date().toISOString(),
          phone: '',
          confirmation_sent_at: '',
          confirmed_at: '',
          email_change_sent_at: '',
          new_email: '',
          invited_at: '',
          action_link: '',
          email_change: '',
          email_change_confirm_status: 0,
          banned_until: '',
          new_phone: '',
          phone_change: '',
          phone_change_token: '',
          phone_change_sent_at: '',
          phone_confirmed_at: '',
          phone_change_confirm_status: 0,
          recovery_sent_at: '',
          new_email_change_sent_at: '',
          email_change_token_new: '',
          email_change_token_current: '',
          is_anonymous: false
        }
        
        const mockSession: Session = {
          access_token: 'mock-access-token',
          refresh_token: 'mock-refresh-token',
          expires_in: 3600,
          expires_at: Date.now() + 3600000,
          token_type: 'bearer',
          user: mockUser
        }
        
        localStorage.setItem('mock_auth_logged_in', 'true')
        
        setAuthState({
          user: mockUser,
          session: mockSession,
          loading: false,
          error: null
        })
        
        return { data: { user: mockUser, session: mockSession }, error: null }
      }
      
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
      // Clear any mock auth
      localStorage.removeItem('mock_auth_logged_in')
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