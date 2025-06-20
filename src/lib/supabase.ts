import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database'

// Use the environment variables or fallback to the provided values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dqbmcppmwmiddqzboruy.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxYm1jcHBtd21pZGRxemJvcnV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNTQyMTksImV4cCI6MjA2NTkzMDIxOX0.NSGpJb5PNyU7dJpvQuXpXEmDRpBZ8AGWjk2PtVGW0Gg'

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)