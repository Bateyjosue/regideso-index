import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvdWRqZ3JmZ3N4a3F1dmZxaWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgyMDExMzcsImV4cCI6MjA0Mzc3NzEzN30.lIo0h1FBxMcWiYP7coETu6_3U8kDlNrjwdiUW9b7G7M";

const supabaseUrl = 'https://doudjgrfgsxkquvfqikg.supabase.co';
const supabase: SupabaseClient = createClient(supabaseUrl, SUPABASE_KEY);

export default supabase;