import { useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'

export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  error: AuthError | null
}

// Mock user data for bypassing authentication
const mockUser: User = {
  id: 'mock-user-id',
  email: 'admin@regideso.com',
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

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null
  })

  useEffect(() => {
    // Check if user is already "logged in" (stored in localStorage)
    const isLoggedIn = localStorage.getItem('mock_auth_logged_in')
    
    if (isLoggedIn === 'true') {
      setAuthState({
        user: mockUser,
        session: mockSession,
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
  }, [])

  const signIn = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }))
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Accept any email/password combination for demo purposes
    if (email && password) {
      localStorage.setItem('mock_auth_logged_in', 'true')
      
      setAuthState({
        user: mockUser,
        session: mockSession,
        loading: false,
        error: null
      })
      
      return { data: { user: mockUser, session: mockSession }, error: null }
    } else {
      const error = {
        message: 'Please enter both email and password',
        name: 'AuthError',
        status: 400
      } as AuthError
      
      setAuthState(prev => ({ ...prev, loading: false, error }))
      return { data: null, error }
    }
  }

  const signOut = async () => {
    setAuthState(prev => ({ ...prev, loading: true }))
    
    // Remove from localStorage
    localStorage.removeItem('mock_auth_logged_in')
    
    setAuthState({
      user: null,
      session: null,
      loading: false,
      error: null
    })
    
    return { error: null }
  }

  return {
    ...authState,
    signIn,
    signOut
  }
}