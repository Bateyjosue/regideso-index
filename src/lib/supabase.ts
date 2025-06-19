import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://doudjgrfgsxkquvfqikg.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvdWRqZ3JmZ3N4a3F1dmZxaWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyMDExMzcsImV4cCI6MjA0Mzc3NzEzN30.lIo0h1FBxMcWiYP7coETu6_3U8kDlNrjwdiUW9b7G7M'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})