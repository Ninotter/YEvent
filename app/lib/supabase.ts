import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_PUBLIC_URL
const supabaseAnonKey = process.env.SUPABASE_PUBLIC_API_KEY

export const supabase = createClient("https://ububssvaelywzysaieer.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVidWJzc3ZhZWx5d3p5c2FpZWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NzM3MTYsImV4cCI6MjA1MzE0OTcxNn0.Su9mlMAsHNwi6MSH4YKkX2WVd-6MmyPyM1jKKbyReSQ", {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})