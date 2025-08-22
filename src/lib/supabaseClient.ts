// src/lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js'

// IMPORTANT: These are public keys and are safe to expose in the browser.
const supabaseUrl = 'oaqnimzgbqienditpsxi'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hcW5pbXpnYnFpZW5kaXRwc3hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NDczMjksImV4cCI6MjA3MTQyMzMyOX0._z0hnLMh9Q48T4T9dH7l1ewhFty6aAG_LDxtAb7yxj0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)